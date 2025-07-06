import { Card, BlockSpacer, BlockStack, BlockStackProps } from "@shopify/ui-extensions-react/customer-account";

export const Wrapper = ({ children, ...props }: Readonly<{ children: React.ReactNode } & BlockStackProps>) => {
    return (
        <Card padding>
            <BlockSpacer spacing={"base"} />
            <BlockStack {...props}>
                {children}
            </BlockStack>
        </Card>
    )
}