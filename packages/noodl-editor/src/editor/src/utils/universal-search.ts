import type { ComponentModel } from '@noodl-models/componentmodel';
import type { NodeGraphNode } from '@noodl-models/nodegraphmodel';

import { ProjectModel } from '../models/projectmodel';

function matchStrings(string1: string, string2: string) {
  return string1.toLowerCase().indexOf(string2.toLowerCase()) !== -1;
}

function searchInNodeRecursive(node: NodeGraphNode, searchTerms: string, component: ComponentModel) {
  let results = [];
  let matchLabel = null;
  let i = 0;

  if (node._label !== undefined && matchStrings(node._label, searchTerms)) {
    matchLabel = node.label;
  } else if (matchStrings(node.id, searchTerms)) {
    matchLabel = node.id;
  } else if (matchStrings(node.type.displayName || node.type.name, searchTerms)) {
    matchLabel = node.label;
  } else {
    const parameterNames = Object.keys(node.parameters);
    for (const parameterNameIndex in parameterNames) {
      const parameterName = parameterNames[parameterNameIndex];

      if (
        typeof node.parameters[parameterName] === 'string' &&
        matchStrings(node.parameters[parameterName], searchTerms)
      ) {
        let displayLabel = parameterName;
        const connectionPort = node.type.ports?.find((port) => port.name === parameterName);
        if (connectionPort) {
          displayLabel = connectionPort.displayName;
        }

        if (node.type.name === 'Javascript2' && parameterName === 'code') {
          matchLabel = 'In the code';
        } else if (node.type.name === 'Expression' && parameterName === 'expression') {
          matchLabel = 'In the expression';
        } else if (node.type.name === 'For Each' && parameterName === 'templateScript') {
          matchLabel = 'In the template script';
        } else if (node.type.name === 'REST' && parameterName === 'code') {
          matchLabel = 'In the script';
        } else if (node.type.name === 'Model' && parameterName === 'properties') {
          matchLabel = displayLabel;
        } else if (node.type.name === 'States' && parameterName === 'states') {
          matchLabel = displayLabel;
        } else {
          matchLabel = displayLabel + ': ' + node.parameters[parameterName];
        }

        break;
      }
    }

    if (matchLabel === null) {
      const ports = node.dynamicports;
      for (i = 0; i < ports.length; ++i) {
        const port = ports[i];
        if (matchStrings(port.name, searchTerms)) {
          matchLabel = node.label + ' : ' + port.name;
          break;
        }
      }
    }

    if (matchLabel === null) {
      const ports = node.ports;
      for (i = 0; i < ports.length; ++i) {
        const port = ports[i];
        if (matchStrings(port.name, searchTerms)) {
          matchLabel = node.label + ' : ' + port.name;
          break;
        }
      }
    }
  }

  if (matchLabel !== null) {
    results.push({
      componentTarget: component,
      nodeTarget: node,
      type: node.type.displayName || node.type.name,
      userLabel: node._label,
      label: matchLabel
    });
  }

  for (i = 0; i < node.children.length; ++i) {
    const child = node.children[i];
    const childResults = searchInNodeRecursive(child, searchTerms, component);
    results = results.concat(childResults);
  }

  return results;
}

function searchInComponent(component: ComponentModel, searchTerms: string) {
  let results = [];
  if (matchStrings(component.displayName, searchTerms)) {
    results.push({
      componentTarget: component,
      type: 'Component',
      label: component.displayName
    });
  }

  for (let i = 0; i < component.graph.roots.length; ++i) {
    const node = component.graph.roots[i];
    const nodeResults = searchInNodeRecursive(node, searchTerms, component);
    results = results.concat(nodeResults);
  }

  if (component.graph.commentsModel.comments) {
    for (let i = 0; i < component.graph.commentsModel.comments.length; ++i) {
      const comment = component.graph.commentsModel.comments[i];
      if (matchStrings(comment.text, searchTerms)) {
        results.push({
          componentTarget: component,
          type: 'Comment',
          label: comment.text
        });
      }
    }
  }

  if (results.length > 0) {
    return {
      componentName: component.displayName,
      componentId: component.id,
      results: results
    };
  } else {
    return null;
  }
}

export function performSearch(searchTerms: string) {
  const results = [];
  const root = ProjectModel.instance.getRootNode();
  if (root === undefined) return;

  const components = ProjectModel.instance.components;

  for (let i = 0; i < components.length; ++i) {
    const component = components[i];

    const componentResults = searchInComponent(component, searchTerms);
    if (componentResults !== null) {
      //limit the label length (it can search in markdown, css, etc)
      for (const result of componentResults.results) {
        if (result.label?.length > 100) {
          result.label = result.label.substring(0, 100) + '...';
        }
      }

      results.push(componentResults);
    }
  }

  return results;
}
