import { BlockStack, Text } from "@shopify/ui-extensions-react/customer-account";

export const LabeledValue = ({
    title,
    value,
}: Readonly<{
    title: string,
    value: string,
}>) => {
    return (
        <BlockStack spacing={"none"}>
            <Text size="small" emphasis="bold">{title}</Text>
            <Text size="small">{value}</Text>
        </BlockStack>
    )
}