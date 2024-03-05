import {Transaction} from "@budgee/domain";

export interface BudgetTransactionsListFooterProps {
  budgetAmount: number,
  transactions: Transaction[]
}
