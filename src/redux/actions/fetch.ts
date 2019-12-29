import { Dispatch } from "redux";
import { fetchData } from "../services/user";

export const DATA_FETCHED = "DATA_FETCHED";
export const DATA_LOADING = "DATA_LOADING";

export function fetchPackageData() {
  return (dispatch: Dispatch) => {
    dispatch(loading(true));
    fetchData()
      .then((res: any) => {
        dispatch(DataFetched(res));
        dispatch(loading(false));
      })
      .catch(err => {
        dispatch(loading(false));
      });
  };
}

const DataFetched = (data: any[]) => ({
  type: DATA_FETCHED,
  payload: data
});

export const loading = (loader: boolean) => ({
  type: DATA_LOADING,
  payload: loader
});
