import {Budget} from "@budgee/domain";
import {BudgetTransactionsList} from "./BudgetTransactionsList";
import {updateBudget, useBudgeeStore} from "@budgee/state";

export const BudgetContainer = () => {
  const {budgets} = useBudgeeStore();

  const Budgets = (budgets || []).map((budget: Budget) => {
    return (
      <div className="grid grid-cols-3" key={budget.id}>
        <BudgetTransactionsList budget={budget} onChange={updateBudget}/>
      </div>
    );
  });

  return (
    <>
      {Budgets}
    </>
  );
}
