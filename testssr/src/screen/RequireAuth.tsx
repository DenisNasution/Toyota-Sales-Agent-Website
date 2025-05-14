import { useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/store";
import { checkAuth } from "../features/userAction";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
  const dispatch = useAppDispatch();
  const { dataLogin } = useAppSelector((state) => state.user);
  // const [log, setLog] = useState(false);
  const location = useLocation();
  useLayoutEffect(() => {
    dispatch(checkAuth());
    // setLog(true);
  }, [dispatch]);
  return Object.values(dataLogin).length !== 0 ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }}></Navigate>
  );
};

export default RequireAuth;
