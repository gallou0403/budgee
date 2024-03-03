export interface Transaction {
    id: string;
    description: string;
    comment: string;
    amount: number;
    dueDate?: string;
    paid: boolean;
    category?: number;
}
