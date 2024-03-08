import {Dispatch} from "react";
import {OrderList} from "primereact/orderlist";
import {Budget, Transaction} from "@budgee/domain";
import {BudgetTransactionsListItem} from "./BudgetTransactionsListItem";
import {BudgetTransactionsListFooter} from "./BudgetTransactionsListFooter";

export interface BudgetTransactionsListProps {
  budget: Budget;
  onChange: Dispatch<Budget>
}

export const BudgetTransactionsList = ({budget, onChange}: BudgetTransactionsListProps) => {
  const onTransactionUpdated = (transaction: Transaction): void => {
    const transactions = budget.transactions.map((t) => {
      return t.id === transaction.id ? transaction : t;
    });

    onChange({...budget, transactions});
  }

  return (
    <div className="p-4">
      <h2 className="p-3 text-xl">{budget.name}</h2>
      {/*<h3>{formatBudgetDateRange(budget)}</h3>*/}
      <OrderList dataKey="id"
                 dragdrop
                 value={budget.transactions}
                 onChange={(e) => onChange({...budget, transactions: e.value})}
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
