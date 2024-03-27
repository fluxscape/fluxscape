import React, { createContext, useContext, useState, useEffect } from 'react';

import { Slot } from '@noodl-core-ui/types/global';

import { commandEventHandler } from './iframe';

export interface PluginContext {
  frames: Record<string, HTMLIFrameElement>;

  createFrame(id: string, url: string): boolean;
  moveFrame(id: string, destination: HTMLDivElement): void;
  clearFrame(id: string): void;
}

const PluginContext = createContext<PluginContext>({
  frames: {},
  createFrame: null,
  moveFrame: null,
  clearFrame: null
});

export interface PluginContextProps {
  children: Slot;
}

export function PluginContextProvider({ children }: PluginContextProps) {
  const [frames, setFrames] = useState({});

  const createFrame = (id: string, url: string) => {
    if (frames[id]) {
      return false;
    }

    const newIframe = document.createElement('iframe');
    newIframe.src = url;
    newIframe.style.width = '100%';
    newIframe.style.height = '50vh';
    newIframe.style.borderStyle = 'none';
    setFrames((prevState) => ({
      ...prevState,
      [id]: newIframe
    }));

    return true;
  };

  const moveFrame = (id: string, destination: HTMLDivElement) => {
    if (destination && frames[id]) {
      destination.appendChild(frames[id]);
    }
  };

  const clearFrame = (id: string) => {
    setFrames((prevState) => {
      const updatedIframes = { ...prevState };
      delete updatedIframes[id];
      return updatedIframes;
    });
  };

  useEffect(() => {
    window.addEventListener('message', commandEventHandler, false);
    return function () {
      window.removeEventListener('message', commandEventHandler, false);
    };
  }, []);

  return (
    <PluginContext.Provider
      value={{
        frames,
        createFrame,
        moveFrame,
        clearFrame
      }}
    >
      {children}
    </PluginContext.Provider>
  );
}

export function usePluginContext() {
  const context = useContext(PluginContext);

  if (context === undefined) {
    throw new Error('usePluginContext must be a child of PluginContextProvider');
  }

  return context;
}
