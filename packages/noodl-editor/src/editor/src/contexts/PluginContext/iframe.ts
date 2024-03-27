import { ToastLayer } from '../../views/ToastLayer';

export function commandEventHandler(event: MessageEvent) {
  try {
    commandHandler(event.data, event);
  } catch (error) {
    console.error(error);
  }
}

type IFrameCommand =
  | {
      kind: 'notify';
      messageType: 'info' | 'success' | 'error';
      message: string;
    }
  | {
      kind: 'upload-aws-s3';
    };

function commandHandler(command: IFrameCommand, _event: MessageEvent) {
  switch (command.kind) {
    case 'notify': {
      switch (command.messageType || 'info') {
        case 'info': {
          ToastLayer.showInteraction(String(command.message));
          break;
        }
        case 'success': {
          ToastLayer.showSuccess(String(command.message));
          break;
        }
        case 'error': {
          ToastLayer.showError(String(command.message));
          break;
        }
      }
      break;
    }
  }
}
