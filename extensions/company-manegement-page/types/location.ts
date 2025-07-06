import { Address } from "./address";
import { CompanyContact } from "./companyContact";
import { Connection } from "./connection";

export interface Location {
    id: string;
    name: string;
    shippingAddress: Address;
    billingAddress: Address;
    contacts: Connection<CompanyContact>;
}