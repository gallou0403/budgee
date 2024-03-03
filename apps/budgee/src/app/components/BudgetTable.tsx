import {Budget} from "../domain/budget.interface";
import {BudgetRow} from "./BudgetRow";
import {Transaction} from "../domain/transaction.interface";

export const BudgetTable = ({budget}: BudgetTableProps) => {
    const Rows = budget.transactions.map((transaction: Transaction) => {
        return (
            <BudgetRow transaction={transaction} key={transaction.id}/>
        )
    });

    const {actual, projected} = calculateRemainingBudgetAmount(budget.amount, budget.transactions);


    return (
        <>
            <h2>{budget.name}</h2>
            <h3>{formatBudgetDateRange(budget)}</h3>
            <h3>${budget.amount}</h3>
            <table>
                <tbody>
                {Rows}
                </tbody>
                <tfoot>
                <tr>
                    <td>Projected Remaining</td>
                    <td>${projected}</td>
                </tr>
                <tr>
                    <td>Actual Remaining</td>
                    <td>${actual}</td>
                </tr>
                </tfoot>
            </table>
        </>
    );
}

// Domain

interface BudgetTableProps {
    budget: Budget;
}

// Utils

const calculateRemainingBudgetAmount = (
    budgetAmount: number,
    transactions: Transaction[]
): {actual: number, projected: number} => {
    return transactions.reduce((acc, transaction) => {
        // If the transaction has been paid, subtract the amount from the actual
        if (transaction.paid) {
            acc.actual -= transaction.amount;
        }

        // always subtract the amount from the projected
        acc.projected -= transaction.amount;

        return acc;
    }, {actual: budgetAmount, projected: budgetAmount});
};

const formatBudgetDateRange = (budget: Budget): string => {
    const startDate = new Date(budget.startDate).toLocaleDateString();
    const endDate = new Date(budget.endDate).toLocaleDateString();
    return `${startDate} - ${endDate}`;
}
