import {Budget, TransactionCategory} from "@budgee/domain";
import {BudgetTransactionsList} from "./BudgetTransactionsList";

export const BudgetContainer = () => {
    const BUDGETS: Budget[] = [
        {
            id: '1',
            name: 'Spend',
            startDate: '2024-02-09T00:00:00',
            endDate: '2024-02-22T23:59:59',
            amount: 3350.00,
            transactions: [
                {
                    id: 'transaction-1',
                    description: 'Groceries',
                    comment: 'Weekly groceries',
                    amount: 200.00,
                    dueDate: '',
                    paid: false,
                    category: TransactionCategory.Groceries
                },
                {
                    id: 'transaction-2',
                    description: 'Gas',
                    comment: 'Fill up the tank',
                    amount: 50.00,
                    dueDate: '',
                    paid: false,
                    category: TransactionCategory.Transportation
                },
                {
                    id: 'transaction-3',
                    description: 'Dinner',
                    comment: 'Date night',
                    amount: 100.00,
                    dueDate: '2024-02-14',
                    paid: false,
                    category: TransactionCategory.Entertainment
                }
            ]
        }
    ];

    const Budgets = BUDGETS.map((budget: Budget) => {
        return (
          <div className="grid grid-cols-3" key={budget.id}>
            <BudgetTransactionsList budget={budget}/>
          </div>
        );
    });

    return (
        <>
            {Budgets}
        </>
    );
}
