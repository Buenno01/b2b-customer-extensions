import { Text } from "@shopify/ui-extensions-react/customer-account";

export const Title = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    return (
        <Text size="extraLarge" emphasis="bold">
            {children}
        </Text>
    )
}