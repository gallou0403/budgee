import {Transaction} from "./transaction.interface";

export interface Budget {
    id: string;
    name: string;
    amount: number;
    startDate: string;
    endDate: string;
    transactions: Transaction[];
}
