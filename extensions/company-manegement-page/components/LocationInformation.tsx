import { Grid, GridItem } from "@shopify/ui-extensions-react/customer-account";
import { Location } from "../types/location";
import { LocationAddress } from "./LocationAddress";

export const LocationInformation = ({ location }: { location: Location }) => {
    const {
      shippingAddress,
      billingAddress,
    } = location;
    return (
      <Grid columns={['auto', 'auto']} spacing={"loose"}>
        <GridItem>
          <LocationAddress address={shippingAddress} title="Shipping Address" />
        </GridItem>
        <GridItem>
          <LocationAddress address={billingAddress} title="Billing Address" />
        </GridItem>
      </Grid>
    );
  }