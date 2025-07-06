import { useEffect, useState } from "react";
import { Company } from "../types/company";

export const useCompany = () => {
    const [companyId, setCompanyId] = useState<string | null>(null);
    const [companyData, setCompanyData] = useState<Company | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchCompanyId = async () => {
            try {
                const companyId = await getCompanyId();

                if (!companyId) {
                    throw new Error('No company id found');
                }

                setCompanyId(companyId);
                setLoading(false);
            } catch (error) {
                setError(error as Error);
            }
        };

        fetchCompanyId();
    }, []);

    useEffect(() => {
        const fetchCompanyData = async () => {
            if (companyId) {
                const companyData = await getCompanyData(companyId);
                setCompanyData(companyData);
            }
        };

        fetchCompanyData();
    }, [companyId]);

    return { companyId, companyData, loading, error };
}

async function getCompanyData(companyId: string) {
    const COMPANY_DATA_QUERY = `#graphql
        query CompanyData($companyId: ID!) {
            company(id: $companyId) {
                id
                name
                locations(first: 10) {
                    nodes {
                        id
                        name
                        shippingAddress {
                            address1
                            address2
                            city
                            country
                            province
                            zip
                        }
                        billingAddress {
                            address1
                            address2
                            city
                            country
                            province
                            zip
                        }
                        contacts(first: 10) {
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
                    }
                }
            }
        }
    `;

    try {
        const response = await fetch("shopify://customer-account/api/unstable/graphql.json", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: COMPANY_DATA_QUERY, variables: { companyId } }),
        });

        const data = await response.json();

        const hasErrors = data.errors && data.errors.length > 0;
        const hasCompany = data.data.company;

        if (hasErrors || !hasCompany) {
            throw new Error(hasErrors ? data.errors[0].message : 'No company found');
        }

        return data.data.company;
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function getCompanyId() {
    const COMPANY_ID_QUERY = `#graphql
        query CompanyId {
            customer {
                companyContacts(first: 1) {
                    nodes {
                        company {
                            id
                        }
                    }
                }
            }
        }
    `;

    try {
        const response = await fetch("shopify://customer-account/api/unstable/graphql.json", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: COMPANY_ID_QUERY }),
        });

        const data = await response.json();

        const hasErrors = data.errors && data.errors.length > 0;
        const hasCompanyContacts = data.data.customer.companyContacts.nodes.length > 0;

        if (hasErrors || !hasCompanyContacts) {
            throw new Error(hasErrors ? data.errors[0].message : 'No company contacts found');
        }

        const companyId = data.data.customer.companyContacts.nodes[0].company.id;

        return companyId;
    } catch (error) {
        console.error(error);
        return null;
    }
}