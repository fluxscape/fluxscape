import {
  CloudServiceEvent,
  CloudServiceEvents,
  CreateEnvironment,
  CreateEnvironmentRequest,
  Environment,
  ICloudBackendService,
  ICloudService,
  UpdateEnvironmentRequest
} from '@noodl-models/CloudServices/type';
import { ProjectModel } from '@noodl-models/projectmodel';
import { getCloudServices } from '@noodl-models/projectmodel.editor';
import { Model } from '@noodl-utils/model';

import { GlobalCloudService } from './providers/GlobalCloudService';
import { ProjectCloudService } from './providers/ProjectCloudService';

export type CloudQueueItem = {
  frontendId: string;
  environmentId: string;
};

class CloudBackendService implements ICloudBackendService {
  private _isLoading = false;
  private _collection?: Environment[];

  private _globalProvider = new GlobalCloudService();
  private _projectProvider = new ProjectCloudService();

  get isLoading(): boolean {
    return this._isLoading;
  }

  get items(): Environment[] {
    return this._collection || [];
  }

  constructor(private readonly service: CloudService) {}

  async fetch(project: ProjectModel): Promise<Environment[]> {
    this._isLoading = true;
    try {
      const projectResults = await this._projectProvider.list(project);
      this._collection = projectResults.map((x) => new Environment("project", x));

      const globalResults = await this._globalProvider.list(project);
      this._collection = this._collection.concat(globalResults.map((x) => new Environment("global", x)));
    } finally {
      this._isLoading = false;
      this.service.notifyListeners(CloudServiceEvent.BackendUpdated);
    }
    return this._collection;
  }

  async fromProject(project: ProjectModel): Promise<Environment> {
    const activeCloudServices = getCloudServices(project);
    if (!this._collection) {
      await this.fetch(project);
    }

    return this.items.find((b) => {
      return b.url === activeCloudServices.endpoint && b.appId === activeCloudServices.appId;
    });
  }

  async create(project: ProjectModel, options: CreateEnvironmentRequest): Promise<CreateEnvironment> {
    return await this._projectProvider.create(project, options);
  }

  async update(project: ProjectModel, options: UpdateEnvironmentRequest): Promise<boolean> {
    return await this._projectProvider.update(project, options);
  }

  async delete(project: ProjectModel, id: string): Promise<boolean> {
    return await this._projectProvider.delete(project, id);
  }
}

export class CloudService extends Model<CloudServiceEvent, CloudServiceEvents> implements ICloudService {
  public static instance: CloudService = new CloudService();

  private _backend: ICloudBackendService;

  public get backend(): ICloudBackendService {
    return this._backend;
  }

  public updateQueue: CloudQueueItem[];

  constructor() {
    super();
    this._backend = new CloudBackendService(this);
  }

  public reset() {
    this._backend = new CloudBackendService(this);
    this.notifyListeners(CloudServiceEvent.BackendUpdated);
  }

  /**
   * this should only be called when going between projects
   */
  public async prefetch() {
    this.reset();
    await this.backend.fetch(ProjectModel.instance);
  }

  public async getActiveEnvironment(project: ProjectModel): Promise<Environment> {
    await this.backend.fetch(project);
    return this.backend.fromProject(project);
  }
}
