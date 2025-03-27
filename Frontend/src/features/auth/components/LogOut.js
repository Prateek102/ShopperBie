import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOutAsync, selectLoggedInUser } from "../authSlice";
import { Navigate } from "react-router-dom";

function LogOut() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  console.log(user);
  useEffect(() => {
    dispatch(signOutAsync());
  });
  // since user has become null
  return <>{!user && <Navigate to="/login" replace={true}></Navigate>}</>;
}

export default LogOut;
