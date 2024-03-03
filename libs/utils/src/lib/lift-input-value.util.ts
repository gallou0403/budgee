import React, {Dispatch, SetStateAction} from "react";

export function liftInputValue(lift: Dispatch<SetStateAction<string>>) {
    return (e: React.ChangeEvent<HTMLInputElement>): void => lift(e.target.value as string);
}
