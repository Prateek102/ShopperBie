import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../authSlice";
import { Navigate } from "react-router-dom";

function ProtectedAdmin({ children }) {
  const user = useSelector(selectLoggedInUser);
  if (user && user.role === "user") {
    return <Navigate to="/" required={true}></Navigate>;
  }

  return children;
}

export default ProtectedAdmin;
