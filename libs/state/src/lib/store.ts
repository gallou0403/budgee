import { create } from 'zustand'
import {BudgeeState} from "./state.interface";

const initialState: BudgeeState = {
  budgets: []
}

export const useStore = create<BudgeeState>(() => ({
  ...initialState
}));
