import { CloudService } from '@noodl-models/CloudServices';
import { ProjectModel } from '@noodl-models/projectmodel';
import { setCloudServices } from '@noodl-models/projectmodel.editor';

import { ToastLayer } from '../../../views/ToastLayer';

export type Command = {
  kind: 'cloud-service';
  use?: boolean;

  name: string;
  description?: string;
  endpoint: string;
  appId: string;
  masterKey: string;
};

export async function execute(command: Command, _event: MessageEvent) {
  const environment = await getOrCreate(command);

  if (command.use) {
    setCloudServices(ProjectModel.instance, environment);
  }
}

async function getOrCreate(command: Command) {
  const cloudServices = await CloudService.instance.backend.fetch();
  const environment = cloudServices.find((c) => c.url === command.endpoint);
  if (environment) {
    if (
      environment.name !== command.name ||
      environment.description !== command.description ||
      environment.appId !== command.appId ||
      environment.masterKey !== command.masterKey
    ) {
      await CloudService.instance.backend.update({
        id: environment.id,
        url: environment.url,

        // Update the existing environment
        name: command.name,
        description: command.description,
        appId: command.appId,
        masterKey: command.masterKey
      });

      ToastLayer.showSuccess(`Cloud service "${command.name}" updated.`);
    }

    return {
      id: environment.id,
      endpoint: environment.url,
      appId: command.appId
    };
  } else {
    const create = await CloudService.instance.backend.create({
      name: command.name,
      description: command.description,
      appId: command.appId,
      url: command.endpoint,
      masterKey: command.masterKey
    });

    ToastLayer.showSuccess(`Cloud service "${command.name}" added successfully.`);

    return {
      id: create.id,
      endpoint: create.url,
      appId: create.appId
    };
  }
}
