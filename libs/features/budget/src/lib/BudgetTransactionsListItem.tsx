import {Dispatch, useState} from "react";
import {Transaction} from "@budgee/domain";
import {MultiStateCheckbox} from "primereact/multistatecheckbox";
import {Tag} from "primereact/tag";
import {DateTime} from "luxon";
import { Tooltip } from 'primereact/tooltip';

export interface BudgetTransactionsListItemProps {
  transaction: Transaction;
  onUpdate: Dispatch<Transaction>;
}

export const BudgetTransactionsListItem = (
  {transaction, onUpdate}: BudgetTransactionsListItemProps
) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="p-2">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          <MultiStateCheckbox
            value={transaction.paid}
            onChange={(e) => {
              onUpdate({...transaction, paid: e.value});
            }}
            options={[{ value: true, icon: 'pi pi-dollar' }]}
            optionValue="value"
          />

          <span className="tooltip-target">{transaction.description}</span>

          {transaction.comment &&
            <i className="pi pi-info-circle text-xs -ml-2 pb-2" data-pr-tooltip={transaction.comment}>
              <Tooltip target=".pi-info-circle" />
            </i>
          }
        </div>
        <div className="flex items-center gap-3 ml-auto">
          {transaction.dueDate &&
            <Tag value={DateTime.fromISO(transaction.dueDate).toFormat('LLL d')} severity="info" />
          }
          <span>${transaction.amount}</span>
        </div>
      </div>
    </div>
  );
};
