import {Dispatch, useState} from "react";
import {OrderList} from "primereact/orderlist";
import {Budget, Transaction} from "@budgee/domain";
import {BudgetTransactionsListItem} from "./BudgetTransactionsListItem";
import {BudgetTransactionsListFooter} from "./BudgetTransactionsListFooter";

export interface BudgetTransactionsListProps {
  budget: Budget;
  onUpdate: Dispatch<Budget>
}

export const BudgetTransactionsList = ({budget, onUpdate}: BudgetTransactionsListProps) => {
  const [editing, setEditing] = useState<string | null>(null);

  const onTransactionUpdated = (transaction: Transaction): void => {
    const transactions = budget.transactions.map((t) => {
      return t.id === transaction.id ? transaction : t;
    });

    onUpdate({...budget, transactions});
  }

  const onTransactionDeleted = (transaction: Transaction): void => {
    const transactions = budget.transactions.filter((t) => t.id !== transaction.id);
    onUpdate({...budget, transactions});
  };

  return (
    <div className="p-4">
      <h2 className="p-3 text-xl">{budget.name}</h2>
      {/*<h3>{formatBudgetDateRange(budget)}</h3>*/}
      <OrderList dataKey="id"
                 dragdrop
                 value={budget.transactions}
                 onChange={(e) => onUpdate({...budget, transactions: e.value})}
                 header={`$${budget.amount}`}
                 itemTemplate={(transaction: Transaction) => (
                   <BudgetTransactionsListItem
                     transaction={transaction}
                     isExpanded={editing === transaction.id}
                     onExpand={(isEditing: boolean) => {
                       setEditing(isEditing ? transaction.id : null);
                     }}
                     onUpdate={onTransactionUpdated}
                     onDelete={onTransactionDeleted}
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
