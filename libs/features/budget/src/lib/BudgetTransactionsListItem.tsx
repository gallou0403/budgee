import {Transaction} from "@budgee/domain";

interface BudgetTransactionsListItemProps {
  onClick: (transaction: Transaction) => void;
  transaction: Transaction;
  isSelected: boolean;
}

export const BudgetTransactionsListItem = ({onClick, transaction, isSelected}: BudgetTransactionsListItemProps) => {
    return (
      <div className="flex flex-wrap p-2 align-items-center gap-3" onClick={() => onClick(transaction)}>
        <div className="flex-1 flex flex-column gap-2 xl:mr-8">
          <span className="font-bold">{transaction.description}</span>
          {isSelected && <span>{transaction.comment}</span>}
        </div>
        <span className="font-bold text-900">${transaction.amount}</span>
      </div>
    );
}
