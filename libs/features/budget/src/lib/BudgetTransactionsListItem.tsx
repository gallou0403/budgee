import {Dispatch, MutableRefObject, useRef} from "react";
import {Transaction} from "@budgee/domain";
import {MultiStateCheckbox} from "primereact/multistatecheckbox";
import {Tag} from "primereact/tag";
import {DateTime} from "luxon";
import {Tooltip} from 'primereact/tooltip';
import {BudgetTransactionsListItemForm} from "./BudgetTransactionsListItemForm";
import {Menu} from "primereact/menu";
import {Button} from "primereact/button";

export interface BudgetTransactionsListItemProps {
  transaction: Transaction;
  isExpanded: boolean;
  onExpand: Dispatch<boolean>;
  onUpdate: Dispatch<Transaction>;
  onDelete: Dispatch<Transaction>;
}

export const BudgetTransactionsListItem = (
  {transaction, onUpdate, isExpanded, onExpand, onDelete}: BudgetTransactionsListItemProps
) => {
  const menuLeft = useRef<Menu>();

  return (
    <div className="p-2">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          <MultiStateCheckbox
            value={transaction.paid}
            onChange={(e) => {
              onUpdate({...transaction, paid: e.value});
            }}
            options={[{value: true, icon: 'pi pi-dollar'}]}
            optionValue="value"
          />

          <span className="tooltip-target">{transaction.description}</span>

          {transaction.comment &&
            <i className="pi pi-info-circle text-xs -ml-2 pb-2" data-pr-tooltip={transaction.comment}>
              <Tooltip target=".pi-info-circle"/>
            </i>
          }
        </div>
        <div className="flex items-center gap-3 ml-auto">
          {/*DUE DATE*/}
          {transaction.dueDate &&
            <Tag value={DateTime.fromISO(transaction.dueDate).toFormat('LLL d')} severity="info"/>
          }

          {/*AMOUNT DUE*/}
          <span>${transaction.amount}</span>

          {/*ACTIONS MENU*/}
          <Button icon="pi pi-ellipsis-v" className="bg-transparent text-white -mr-4"
                  onClick={(event) => menuLeft?.current?.toggle(event)}
                  aria-controls="popup_menu_left" aria-haspopup/>
          <Menu popup id="popup_menu_left"
                model={[
                  {
                    label: 'Actions',
                    items: [
                      {
                        label: 'Edit',
                        icon: 'pi pi-pencil',
                        command: () => {
                          onExpand(!isExpanded);
                        }
                      },
                      {
                        label: 'Delete',
                        icon: 'pi pi-trash',
                        command: () => {
                          onDelete(transaction);
                        }
                      }
                    ]
                  }
                ]}
                ref={menuLeft as MutableRefObject<Menu>}
          />

        </div>
      </div>
      {isExpanded && (
        <BudgetTransactionsListItemForm/>
      )}
    </div>
  );
};
