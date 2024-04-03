import { usePluginContext } from '@noodl-contexts/PluginContext';
import React, { RefObject, useEffect, useRef } from 'react';

import { ActivityIndicator } from '@noodl-core-ui/components/common/ActivityIndicator';
import { BaseDialog } from '@noodl-core-ui/components/layout/BaseDialog';
import { Tabs } from '@noodl-core-ui/components/layout/Tabs';
import { PopupSection } from '@noodl-core-ui/components/popups/PopupSection';

import { DeployContextProvider, useDeployContext } from './DeployPopup.context';
import { DeployToFolderTab } from './tabs/DeployToFolderTab';

function DeployPopupChild() {
  const { hasActivity } = useDeployContext();

  return (
    <div style={{ width: 400 }}>
      <div
        style={{
          backgroundColor: '#444444',
          position: 'relative',
          maxHeight: `calc(90vh - 40px)`,
          // @ts-expect-error https://github.com/frenic/csstype/issues/62
          overflowY: 'overlay',
          overflowX: 'hidden'
        }}
      >
        <PopupSection title="Deploy options" />

        <Tabs
          tabs={[
            { label: 'Fluxscape', content: <FluxscapeDeployTab />, testId: 'fluxscape-tab-button' },
            { label: 'Self Hosting', content: <DeployToFolderTab />, testId: 'self-hosting-tab-button' }
          ]}
        />

        {hasActivity && <ActivityIndicator isOverlay />}
      </div>
    </div>
  );
}

export interface DeployPopupProps {
  triggerRef: RefObject<HTMLElement>;
  isVisible: boolean;
  onClose: () => void;
}

export function DeployPopup(props: DeployPopupProps) {
  return (
    <DeployContextProvider>
      <BaseDialog
        triggerRef={props.triggerRef}
        isVisible={props.isVisible}
        onClose={props.onClose}
        hasArrow
        isLockingScroll
      >
        <DeployPopupChild />
      </BaseDialog>
    </DeployContextProvider>
  );
}

function FluxscapeDeployTab() {
  // Preview URL:  'http://192.168.0.33:8574/'
  return <iframe src="https://portal.fluxscape.io" style={{ width: "100%", height: "50vh", borderStyle: "none" }} />;
}
