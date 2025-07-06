import {
  reactExtension,
  Page,
  Grid,
  GridItem,
  Divider,
  Banner,
  Spinner,
  BlockStack,
  Text,
} from "@shopify/ui-extensions-react/customer-account";
import { RenderCustomerAccountFullPageExtensionTarget } from "@shopify/ui-extensions/customer-account";
import {
  LabeledValue,
  Title,
  Wrapper,
  LocationInformation,
  LocationList,
} from "../components";
import { Fragment, useEffect, useState } from "react";
import { useCompany } from "../hooks/useCompany";
import { Location } from "../types/location";
import { getCustomerName } from "../utils";

export default reactExtension<RenderCustomerAccountFullPageExtensionTarget>(
  "customer-account.page.render",
  () => <CompanyManagementPage />
);

const COMPANY_MOCK = {
  name: "ToyMania LTDA",
  mainContact: {
    name: "John Doe",
    role: "CEO",
    email: "john.doe@toymania.com",
    phone: "+55 11 99999-9999",
  },
  locations: [
    {
      name: "ToyMania Store",
      address: "Av. das Flores, 123, São Paulo, SP, Brazil",
      phone: "+55 11 99999-9999",
      email: "contact@toymania.com"
    },
  ],
}

function CompanyManagementPage() {
  const { companyData, loading, error } = useCompany();
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

  const handleLocationChange = (locationId: string) => {
    if (!companyData) return;

    const location = companyData.locations.nodes.find((location) => location.id === locationId);

    if (location) {
      setSelectedLocation(location);
    } else {
      setSelectedLocation(null);
    }
  }

  useEffect(() => {
    if (!companyData) return;
    handleLocationChange(companyData.locations.nodes[0].id);
  }, [companyData]);


  if (error) {
    return <Banner title="Error" status="critical">
      {error.message}
    </Banner>;
  }

  if (loading || !companyData) {
    return <Spinner />;
  }

  const {
    name,
    id,
    locations,
  } = companyData;

  const contacts = locations.nodes.map((location) => location.contacts.nodes);

  const contactSet = new Set(contacts.flat());


  return (
    <Page
      title="Company Management"
      loading={loading}
    >
      <Grid columns={ ['2fr','1fr'] } spacing={"loose"}>
        <GridItem>
          <Wrapper>
            <Title>{selectedLocation?.name}</Title>
            {selectedLocation && (
              <>
                <LocationInformation location={selectedLocation} />
                <Divider />
              </>
            )}
            <Title>Contacts</Title>
            {Array.from(contactSet).map((contact) => (
              <LabeledValue key={contact.customer.emailAddress.emailAddress}
                title={getCustomerName(contact.customer)}
                value={contact.customer.emailAddress.emailAddress}
              />
            ))}
          </Wrapper>
        </GridItem>
        <GridItem>
          <Wrapper>
            <Title>Company information</Title>
            <LabeledValue title="Name" value={name} />
            <LabeledValue title="ID" value={id} />
            <Divider />
            <Title>Locations</Title>
            <LocationList locations={locations.nodes} selectedLocationId={selectedLocation?.id} onChange={handleLocationChange} />
          </Wrapper>
        </GridItem>
      </Grid>
    </Page>
  );
}
