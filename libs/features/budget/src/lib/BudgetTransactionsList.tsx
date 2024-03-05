import {Budget, Transaction} from "@budgee/domain";
import {BudgetTransactionsListItem} from "./BudgetTransactionsListItem";
import {OrderList} from "primereact/orderlist";
import React, {useState} from "react";

export const BudgetTransactionsList = ({budget}: BudgetTableProps) => {
  const [selected, setSelected] = useState<Transaction | null>(null);
  const {actual, projected} = calculateRemainingBudgetAmount(budget.amount, budget.transactions);

  const listItemTemplate = (transaction: Transaction) => {
    return (
      <BudgetTransactionsListItem
        onClick={setSelected}
        transaction={transaction}
        isSelected={selected?.id === transaction.id}
      />
    );
  }

  const pt = {
    controls: {className: 'hidden'},
    item: {className: 'p-0'},
  };

  return (
    <div>
      <h2>{budget.name}</h2>
      {/*<h3>{formatBudgetDateRange(budget)}</h3>*/}
      <OrderList dataKey="id"
                 value={budget.transactions}
                 onChange={(e) => console.log(e)}
                 itemTemplate={listItemTemplate}
                 header={`$${budget.amount}`}
                 dragdrop
                 pt={pt}>
      </OrderList>

      <h3 className="m-4 text-right">Actual: ${actual}</h3>
      <h3 className="m-4 text-right">Projected: ${projected}</h3>
      <h3 className="m-4 text-right">Selected: {selected?.id}</h3>
    </div>
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

const formatBudgetDateRange = (budget: Budget): string => {
  const startDate = new Date(budget.startDate).toLocaleDateString();
  const endDate = new Date(budget.endDate).toLocaleDateString();
  return `${startDate} - ${endDate}`;
}
