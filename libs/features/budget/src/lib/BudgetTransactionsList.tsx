import {useState} from "react";
import {OrderList} from "primereact/orderlist";
import {Budget, Transaction} from "@budgee/domain";
import {BudgetTransactionsListItem} from "./BudgetTransactionsListItem";
import {BudgetTransactionsListFooter} from "./BudgetTransactionsListFooter";

export interface BudgetTransactionsListProps {
  budget: Budget;
}

export const BudgetTransactionsList = ({budget}: BudgetTransactionsListProps) => {

  // todo: update the budget transactions
  //  this probably means creating an onUpdate function that updates the budget??
  //  probably depends on if we go Mongo vs. Postgres.. If we go Postgress we would
  //  probably update the transaction directly

  // todo: if we use Recoil... would we need to update the budget state here?
  //  or would we update state from the list item component?
  const onTransactionUpdated = (transaction: Transaction): void => {
    const updatedTransactions = budget.transactions.map((t) => {
      return t.id === transaction.id ? transaction : t;
    });

    console.log(updatedTransactions);
  }

  return (
    <div className="p-4">
      <h2 className="p-3 text-xl">{budget.name}</h2>
      {/*<h3>{formatBudgetDateRange(budget)}</h3>*/}
      <OrderList dataKey="id"
                 dragdrop
                 value={budget.transactions}
                 onChange={(e) => console.log(e)}
                 header={`$${budget.amount}`}
                 itemTemplate={(transaction: Transaction) => (
                   <BudgetTransactionsListItem
                     transaction={transaction}
                     onUpdate={onTransactionUpdated}
                   />
                 )}
                 pt={{
                   controls: {className: 'hidden'},
                   item: {className: 'py-0'},
                 }}>
      </OrderList>
      <BudgetTransactionsListFooter budgetAmount={budget.amount} transactions={budget.transactions}/>
    </div>
  );
};
