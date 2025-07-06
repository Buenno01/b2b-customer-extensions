import {
    BlockStack,
    Text,
    ToggleButton,
    ToggleButtonGroup,
    View,
} from '@shopify/ui-extensions-react/checkout';
import { Location } from '../types/location';

export const LocationList = ({ locations, selectedLocationId, onChange }: { locations: Location[], selectedLocationId: string, onChange: (locationId: string) => void }) => {
    return (
      <ToggleButtonGroup
        value={selectedLocationId}
        onChange={onChange}
      >
        <BlockStack spacing="base">
            {locations.map((location) => (
                <ToggleButton id={location.id}>
                    <View
                        blockAlignment="start"
                        inlineAlignment="start"
                        minBlockSize="fill"
                    >
                        <Text size="small" emphasis="bold">{location.name}</Text>
                        <Text size="small" appearance="subdued">
                            {location.shippingAddress.address1} {location.shippingAddress.address2} -
                            {location.shippingAddress.city}, {location.shippingAddress.province}, {location.shippingAddress.zip} -
                            {location.shippingAddress.country}
                        </Text>
                    </View>
                </ToggleButton>
            ))}
        </BlockStack>
      </ToggleButtonGroup>
    );
  }
  