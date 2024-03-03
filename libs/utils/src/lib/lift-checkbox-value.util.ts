import React, {Dispatch, SetStateAction} from "react";

export function liftCheckboxValue(lift: Dispatch<SetStateAction<boolean>>) {
    return (e: React.ChangeEvent<HTMLInputElement>): void => lift(e.target.checked);
}
