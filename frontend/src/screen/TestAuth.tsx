import { useLayoutEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/store";
import { checkAuth } from "../features/userAction";

const TestAuth = () => {
  const dispatch = useAppDispatch();
  const { dataLogin } = useAppSelector((state) => state.user);
  // const [log, setLog] = useState(false);
  useLayoutEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  return Object.values(dataLogin).length !== 0 ? (
    <div>berhasil</div>
  ) : (
    <div>gagal</div>
  );
};

export default TestAuth;
