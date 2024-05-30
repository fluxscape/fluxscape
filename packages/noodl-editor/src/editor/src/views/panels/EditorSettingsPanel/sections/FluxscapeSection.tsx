import React, { useState } from 'react';

import { Box } from '@noodl-core-ui/components/layout/Box';
import { VStack } from '@noodl-core-ui/components/layout/Stack';
import { PropertyPanelCheckbox } from '@noodl-core-ui/components/property-panel/PropertyPanelCheckbox';
import { PropertyPanelRow } from '@noodl-core-ui/components/property-panel/PropertyPanelInput';
import { CollapsableSection } from '@noodl-core-ui/components/sidebar/CollapsableSection';
import { Text } from '@noodl-core-ui/components/typography/Text';

export function FluxscapeSection() {
  const [enabledState, setEnabledState] = useState<boolean>(false);
  return (
    <CollapsableSection title="Fluxscape" isClosed>
      <Box hasXSpacing>
        <VStack>
          <Text hasBottomSpacing>Internal Fluxscape development settings</Text>
          <PropertyPanelRow label="Dev Mode" isChanged={false}>
            <PropertyPanelCheckbox
              value={enabledState}
              onChange={(value) => {
                setEnabledState(value);
              }}
            />
          </PropertyPanelRow>
        </VStack>
      </Box>
    </CollapsableSection>
  );
}
