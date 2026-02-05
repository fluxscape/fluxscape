import { ProjectModel } from '@noodl-models/projectmodel';
import { IModel } from '@noodl-utils/model';

export type CreateEnvironmentRequest = {
  name: string | undefined;
  description?: string | undefined;
  appId: string;
  url: string;
  masterKey: string;
};

export type UpdateEnvironmentRequest = {
  id: string;
  name: string | undefined;
  description: string | undefined;
  appId: string | undefined;
  masterKey: string | undefined;
  url: string | undefined;
};

export type CreateEnvironment = {
  id: string;
  masterKey: string;
  appId: string;
  url: string;
};

export interface ICloudBackendService {
  get isLoading(): boolean;
  get items(): Environment[];

  fetch(project: ProjectModel): Promise<Environment[]>;
  fromProject(project: ProjectModel): Promise<Environment> | undefined;
  create(project: ProjectModel, options: CreateEnvironmentRequest): Promise<CreateEnvironment>;
  update(project: ProjectModel, options: UpdateEnvironmentRequest): Promise<boolean>;
  delete(project: ProjectModel, id: string): Promise<boolean>;
}

export enum CloudServiceEvent {
  ConfigUpdated,
  BackendUpdated
}

export type CloudServiceEvents = {
  [CloudServiceEvent.ConfigUpdated]: () => void;
  [CloudServiceEvent.BackendUpdated]: () => void;
};

export interface ICloudService extends IModel<CloudServiceEvent, CloudServiceEvents> {
  /** Reset the current session token. */
  reset(): void;

  getActiveEnvironment(project: ProjectModel): Promise<Environment>;

  get backend(): ICloudBackendService;
}

/** The data format is separated from our internal model. */
export type EnvironmentDataFormat = {
  enabled: boolean;
  id: string;
  name: string;
  description: string;
  masterKey: string;
  appId: string;
  endpoint: string;
};

export class Environment {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  masterKeyUpdatedAt: string;
  masterKey: string;
  appId: string;
  url: string;

  provider: string;

  get typeDisplayName() {
    switch (this.provider) {
      case "project": return "Self hosted";
      default: return "Global Self hosted"
    }
  }

  constructor(provider: string, item: EnvironmentDataFormat) {
    this.provider = provider;

    this.id = item.id;
    this.name = item.name;
    this.description = item.description;
    this.createdAt = '';
    this.masterKeyUpdatedAt = '';
    this.masterKey = item.masterKey;
    this.appId = item.appId;
    this.url = item.endpoint;
  }
}

export interface ICloudServiceProvider {
  list(project: ProjectModel | undefined): Promise<EnvironmentDataFormat[]>;
  create(project: ProjectModel | undefined, options: CreateEnvironmentRequest): Promise<CreateEnvironment>;
  update(project: ProjectModel | undefined, options: UpdateEnvironmentRequest): Promise<boolean>;
  delete(project: ProjectModel | undefined, id: string): Promise<boolean>;
}
