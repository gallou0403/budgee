import {Dispatch} from "react";
import {Transaction} from "@budgee/domain";

export interface BudgetTransactionsListItemProps {
  transaction: Transaction;
  onSelect: Dispatch<Transaction>;
  isSelected: boolean;
  onUpdate: Dispatch<Transaction>;
}

export const BudgetTransactionsListItem = (
  {transaction, onSelect, isSelected}: BudgetTransactionsListItemProps
) => {
  return (
    <div className="flex flex-wrap p-2 align-items-center gap-3" onClick={() => onSelect(transaction)}>
      <div className="flex-1 flex flex-column gap-2 xl:mr-8">
        <span className="font-bold">{transaction.description}</span>
        {isSelected && <span>{transaction.comment}</span>}
      </div>
      <span className="font-bold text-900">${transaction.amount}</span>
    </div>
  );
};
