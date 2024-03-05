import {Transaction} from "@budgee/domain";
import {Dispatch} from "react";

export interface BudgetTransactionsListItemProps {
  transaction: Transaction;
  onSelect: Dispatch<Transaction>;
  isSelected: boolean;
}
