import {Transaction} from "@budgee/domain";
import {BudgetTransactionsListItem} from "./BudgetTransactionsListItem";
import {OrderList} from "primereact/orderlist";
import {useState} from "react";
import {BudgetTransactionsListProps} from "./interfaces/budget-transactions-list-props.interface";
import {BudgetTransactionsListFooter} from "./BudgetTransactionsListFooter";

export const BudgetTransactionsList = ({budget}: BudgetTransactionsListProps) => {
  const [selected, setSelected] = useState<Transaction | null>(null);

  return (
    <div className="p-4">
      <h2 className="p-3 text-xl">{budget.name}</h2>
      {/*<h3>{formatBudgetDateRange(budget)}</h3>*/}
      <OrderList dataKey="id"
                 value={budget.transactions}
                 onChange={(e) => console.log(e)}
                 itemTemplate={(transaction: Transaction) => (
                   <BudgetTransactionsListItem
                     transaction={transaction}
                     onSelect={setSelected}
                     isSelected={selected?.id === transaction.id}
                   />
                 )}
                 header={`$${budget.amount}`}
                 dragdrop
                 pt={{
                   controls: {className: 'hidden'},
                   item: {className: 'py-0'},
                 }}>
      </OrderList>
      <BudgetTransactionsListFooter budgetAmount={budget.amount} transactions={budget.transactions}/>
    </div>
  );
};
