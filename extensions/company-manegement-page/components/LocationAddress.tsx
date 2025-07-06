import { BlockStack, Text } from "@shopify/ui-extensions-react/customer-account";
import { Address } from "../types/address";

export const LocationAddress = ({ address, title }: { address: Address, title: string }) => {
    const {
      address1,
      address2,
      city,
      country,
      province,
      zip,
    } = address
    return (
      <BlockStack spacing={"none"}>
        <Text appearance="subdued" size="small">{title}</Text>
        <Text size="small">{address1} {address2}</Text>
        <Text size="small">{city} - {province} - {zip}</Text>
        <Text size="small">{country}</Text>
      </BlockStack>
    );
  }