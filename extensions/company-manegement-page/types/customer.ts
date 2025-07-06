import { CompanyContact } from "./companyContact";
import { Connection } from "./connection";

export interface Customer {
    id: string;
    firstName?: string;
    lastName?: string;
    emailAddress: {
        emailAddress: string;
    };
    companyContacts: Connection<CompanyContact>;
}