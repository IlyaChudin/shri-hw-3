import { Action } from "redux";

export interface FailureAction<T> extends Action<T> {
  error: string;
}
