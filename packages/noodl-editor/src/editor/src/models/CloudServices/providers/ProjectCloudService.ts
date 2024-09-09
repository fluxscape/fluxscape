import { filesystem } from '@noodl/platform';

import {
  CreateEnvironment,
  CreateEnvironmentRequest,
  EnvironmentDataFormat,
  ICloudServiceProvider,
  UpdateEnvironmentRequest
} from '@noodl-models/CloudServices';
import { ProjectModel } from '@noodl-models/projectmodel';

/**
 * Store the Cloud Service relative to the project folder.
 */
export class ProjectCloudService implements ICloudServiceProvider {
  private async load(project: ProjectModel) {
    const dirpath = filesystem.resolve(project._retainedProjectDirectory, ".noodl");
    const filepath = filesystem.resolve(dirpath, "cloudservices.json");
    if (!filesystem.exists(filepath)) {
      return []
    }

    // TODO: Validate file content
    return filesystem.readJson(filepath);
  }

  private async save(project: ProjectModel, items: EnvironmentDataFormat[]) {
    const dirpath = filesystem.resolve(project._retainedProjectDirectory, ".noodl");
    const filepath = filesystem.resolve(dirpath, "cloudservices.json");
    if (!filesystem.exists(filepath)) {
      await filesystem.makeDirectory(dirpath);
    }

    await filesystem.writeJson(filepath, items);
  }
  
  async list(project: ProjectModel): Promise<EnvironmentDataFormat[]> {
    if (!project || !project._retainedProjectDirectory) {
      return []
    }

    return await this.load(project);
  }

  async create(project: ProjectModel, options: CreateEnvironmentRequest): Promise<CreateEnvironment> {
    const id = `${options.url}-${options.appId}`;

    const newBroker: EnvironmentDataFormat = {
      enabled: true,
      id,
      name: options.name,
      description: options.description,
      masterKey: options.masterKey,
      appId: options.appId,
      endpoint: options.url
    };

    const current = await this.load(project);
    await this.save(project, [...current, newBroker]);

    return {
      id: newBroker.id,
      appId: newBroker.appId,
      url: newBroker.endpoint,
      masterKey: newBroker.masterKey
    };
  }

  async update(project: ProjectModel, options: UpdateEnvironmentRequest): Promise<boolean> {
    const current = await this.load(project);

    // Find and update
    const broker = current.find((x) => x.id === options.id);
    if (!broker) return false;

    if (typeof options.name !== undefined) broker.name = options.name;
    if (typeof options.description !== undefined) broker.description = options.description;
    if (typeof options.appId !== undefined) broker.appId = options.appId;
    if (typeof options.masterKey !== undefined) broker.masterKey = options.masterKey;
    if (typeof options.url !== undefined) broker.endpoint = options.url;

    await this.save(project, current);

    return true;
  }

  async delete(project: ProjectModel, id: string): Promise<boolean> {
    const current = await this.load(project);

    // Find the environment
    const found = current.find((b) => b.id === id);
    if (found) {
      // Delete the environment
      current.splice(current.indexOf(found), 1);
    }

    // Save the list
    await this.save(project, current);
    return true;
  }
}
