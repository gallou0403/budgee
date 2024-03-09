import {Dispatch, useState} from "react";
import {OrderList} from "primereact/orderlist";
import {Budget, createTransaction, Transaction} from "@budgee/domain";
import {BudgetTransactionsListItem} from "./BudgetTransactionsListItem";
import {BudgetTransactionsListFooter} from "./BudgetTransactionsListFooter";
import {Button} from "primereact/button";

export interface BudgetTransactionsListProps {
  budget: Budget;
  onUpdate: Dispatch<Budget>
}

export const BudgetTransactionsList = ({budget, onUpdate}: BudgetTransactionsListProps) => {
  const [editing, setEditing] = useState<string | null>(null);

  const onTransactionAdded = (): void => {
    const newTransaction = createTransaction();
    onUpdate({...budget, transactions: [...budget.transactions, newTransaction]});
    setEditing(newTransaction.id);
  }

  const onTransactionUpdated = (transaction: Transaction): void => {
    const transactions = budget.transactions.map((t) => {
      return t.id === transaction.id ? transaction : t;
    });

    onUpdate({...budget, transactions});
  }

  const onTransactionDeleted = (transaction: Transaction): void => {
    const transactions = budget.transactions.filter((t) => t.id !== transaction.id);
    onUpdate({...budget, transactions});
    setEditing(null);
  };

  return (
    <div className="p-4">
      <h2 className="p-3 text-xl">{budget.name}</h2>
      {/*<h3>{formatBudgetDateRange(budget)}</h3>*/}
      <OrderList dataKey="id"
                 dragdrop
                 value={budget.transactions}
                 onChange={(e) => onUpdate({...budget, transactions: e.value})}
                 header={(
                   <div className="flex justify-between">
                     <div className="flex items-center">
                       ${budget.amount}
                     </div>
                     <div className="flex items-center">
                       <Button disabled={!!editing || editing === ''} icon="pi pi-plus" className="bg-transparent text-white" onClick={onTransactionAdded}/>
                     </div>
                   </div>
                 )}
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
