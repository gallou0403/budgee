import {BudgeeActions} from "./actions.interface";
import {Budget} from "@budgee/domain";
import {produce} from "immer"
import {BudgeeState} from "./state.interface";
import {useStore} from "./store";

export const updateBudget = (budget: Budget) => {
  useStore.setState((state: BudgeeState) => {
    return produce(state, (draft: BudgeeState) => {
      const index = draft.budgets.findIndex((b) => b.id === budget.id);

      if (index === -1) {
        draft.budgets[index] = budget;
      }
    });
  })
}
