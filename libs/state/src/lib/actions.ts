import {Budget} from "@budgee/domain";
import {produce} from "immer"
import {BudgeeState} from "./state.interface";
import {useBudgeeStore} from "./store";

export const updateBudget = (budget: Budget) => {
  useBudgeeStore.setState((state: BudgeeState) => {
    return produce(state, (draft: BudgeeState) => {
      const index = draft.budgets.findIndex((b) => b.id === budget.id);

      if (index > -1) {
        draft.budgets[index] = budget;
      }
    });
  })
}
