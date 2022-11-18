import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { _showAppError } from "../../store/setting/settingActions";

export default function ShowErrorComponent() {
  const { setting } = useSelector((state) => state);
  const { serverError, library } = setting;
  const dispatch = useDispatch();

  useEffect(() => {
    if (serverError) {
      toast.error(
        library[serverError.title]
          ? library[serverError.title]
          : `${library.SOMETHING_WRONG} ${
              serverError.detail ? serverError.detail : serverError?.title
            } `
      );
      dispatch(_showAppError(null));
    }
  }, [dispatch, library, serverError]);

  return <div />;
}
