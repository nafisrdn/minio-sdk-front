import { MinIOActions } from "./MinIOSlice";

export const setError = (data, status) => {
  return (dispatch) => {
    dispatch(MinIOActions.setError({data, status}));
  };
};
