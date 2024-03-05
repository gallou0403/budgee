import {BudgetTransactionsListFooterProps} from "./interfaces/budget-transactions-list-footer-props.interface";
import {Transaction} from "@budgee/domain";

export const BudgetTransactionsListFooter = ({budgetAmount, transactions}: BudgetTransactionsListFooterProps) => {
  const {actual, projected} = getRemainingBudget(budgetAmount, transactions);

  return (
    <>
      <h3 className="m-4 text-right">Actual: ${actual}</h3>
      <h3 className="m-4 text-right">Projected: ${projected}</h3>
    </>
  );
}

const getRemainingBudget = (
  budgetAmount: number,
  transactions: Transaction[]
): { actual: number, projected: number } => {
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
