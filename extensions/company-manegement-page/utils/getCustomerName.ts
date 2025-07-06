import { Customer } from "../types/customer";

export const getCustomerName = (customer: Customer) => { 
    const {
      firstName,
      lastName,
    } = customer;
  
    if (!firstName && !lastName) {
      return 'Unknown';
    }
  
    const name = firstName + ' ' + lastName;
  
    return name.trim();
}