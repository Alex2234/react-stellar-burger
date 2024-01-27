import {  useSelector } from "react-redux";
import { RootState } from "../services/reducers";

export function useTypedSelector<TSelected>(
    selector: (state: RootState) => TSelected
  ): TSelected {
    return useSelector(selector);
  }