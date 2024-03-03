import {Transaction} from "../domain/transaction.interface";

interface BudgetRowProps {
    transaction: Transaction;
}
export const BudgetRow = ({transaction}: BudgetRowProps) => {
    return (
        <tr>
            <td>{transaction.description}</td>
            <td>${transaction.amount}</td>
        </tr>
    );
}
