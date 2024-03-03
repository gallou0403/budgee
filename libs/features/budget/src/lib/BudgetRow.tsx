import {Transaction} from "@budgee/domain";

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
