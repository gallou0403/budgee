export interface Transaction {
    id: string;
    description: string;
    comment: string;
    amount: number;
    dueDate?: string;
    paid: boolean;
    category?: number;
}

export const createTransaction = (props: Partial<Transaction> = {}): Transaction => {
    return {
        id: '',
        description: '',
        comment: '',
        amount: 0,
        paid: false,
        ...props
    }
};
