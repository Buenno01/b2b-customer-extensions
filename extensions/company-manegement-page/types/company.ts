
import { Connection } from "./connection";
import { Location } from "./location";

export interface Company {
    id: string;
    name: string;
    locations: Connection<Location>;
}