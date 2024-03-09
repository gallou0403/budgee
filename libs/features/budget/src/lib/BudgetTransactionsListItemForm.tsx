import {Transaction} from "@budgee/domain";
import {Button} from "primereact/button";
import {MultiStateCheckbox} from "primereact/multistatecheckbox";
import {FormEvent, LegacyRef, useRef} from "react";

interface BudgetTransactionsListItemFormProps {
  transaction: Transaction;
  onCancel: () => void;
  onSubmit: (transaction: Transaction) => void;
}

export const BudgetTransactionsListItemForm = (
  {transaction, onCancel, onSubmit}: BudgetTransactionsListItemFormProps
) => {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);

    const updatedTransaction = {
      ...transaction,
      description: formData.get('description') as string,
      comment: formData.get('comment') as string,
      dueDate: formData.get('dueDate') as string,
      amount: parseFloat(formData.get('amount') as string)
    };
    onSubmit(updatedTransaction);
  }

  return (
    <form onSubmit={submit}>
      <div className="flex items-center gap-3">
        {/*TRANSACTION DESCRIPTION*/}
        <input
          type="text"
          name="description"
          defaultValue={transaction.description}
          placeholder="Description"
          className="w-full invalid:border invalid:border-pink-500"
          required
        />

        {/*COMMENT TOOLTIP*/}
        <input
          type="text"
          name="comment"
          defaultValue={transaction.comment}
          placeholder="Comment"
          className="w-full"
        />
      </div>
      <div className="flex items-center gap-3">
        {/*DUE DATE*/}
        <input
          type="date"
          name="dueDate"
          placeholder="Due Date"
          defaultValue={transaction.dueDate as string}
        />

        {/*AMOUNT DUE*/}
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          className="invalid:border invalid:border-pink-500"
          required
          defaultValue={transaction.amount}
        />

        {/*ACTIONS CANCEL*/}
        <Button icon="pi pi-times" className="bg-transparent text-white -mr-4" onClick={onCancel}/>
        {/* ACTIONS SUBMIT */}
        <Button icon="pi pi-check" className="bg-transparent text-white -mr-4" type="submit"/>
      </div>
    </form>
  );
};
