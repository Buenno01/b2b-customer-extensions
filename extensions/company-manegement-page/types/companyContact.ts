import { Company } from "./company";
import { Customer } from "./customer";

export interface CompanyContact {
  id: string;
  customer: Customer;
  company: Company;
}
