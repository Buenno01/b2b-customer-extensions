import { Customer } from "../types/customer";

export const COMPANY_INFORMATION_QUERY = `#graphql
    query CompanyInformation {
        customer {
            firstName
            lastName
            emailAddress {
                emailAddress
            }
            companyContacts(first: 1) {
                nodes {
                    company {
                        name
                        id
                        locations (first: 10) {
                            nodes {
                                name
                                id
                                contacts(first:10) {
                                    nodes {
                                        customer {
                                            firstName
                                            lastName
                                            emailAddress {
                                                emailAddress
                                            }
                                        }
                                    }
                                }
                                shippingAddress {
                                    address1
                                    address2
                                    city
                                    country
                                    province
                                    zip
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;

export type CompanyInformationQuery = {
    customer: Customer
}