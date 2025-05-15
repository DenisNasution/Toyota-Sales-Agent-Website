import { useEffect, useState } from "react";
// import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from "../app/store";
import { checkUserAction, registerAction } from "../features/userAction";
import { useGoogleLogin } from "@react-oauth/google";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { resetStatus } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
library.add(faGoogle);

const RegisterScreen = () => {
  const dispatch = useAppDispatch();
  const { status, message } = useAppSelector((state) => state.user);
  const [warnText, setWarnText] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (status === 401) {
      navigate(`/login`, {
        replace: true,
        // state: { message: message },
      });
      // dispatch(resetStatus());
    }
    if (status === 200) {
      setLoading(false);
      navigate(`/login`, {
        replace: true,
        // state: { message: message },
      });
      // dispatch(resetStatus());
    }
    if (status === 201) {
      // setLoading(false);
      // navigate(`/login`, {
      //   replace: true,
      //   // state: { message: message },
      // });
      dispatch(resetStatus());
    }
    if (status === 500) {
      setWarnText(message);
      setLoading(false);
      dispatch(resetStatus());
    }
  }, [dispatch, status, message, navigate]);
  useEffect(() => {
    dispatch(checkUserAction());
  }, [dispatch]);

  const handleGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      setLoading(true);
      dispatch(registerAction({ token: response.access_token }));
    },
  });
  // console.log(status);
  // const handleGoogle = () => {
  //   dispatch(loginAction());
  //   // console.log(response.access_token);
  //   // setUser(response.access_token);
  // };
  // useEffect(() => {
  //   if (user) {
  //     axios
  //       .get("https://www.googleapis.com/oauth2/v3/userinfo", {
  //         headers: { authorization: `Bearer ${user}` },
  //       })
  //       .then((res) => {
  //         console.log(res);
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // }, [user]);

  return (
    <main className='headerMain'>
      <section className='vehiclePage'>
        <div className='spinLoader'>
          {/* <div className='formInput formPict'> */}
          {warnText ? (
            <div className='textWarnInput warnInputLogin'>
              <h5>{warnText}</h5>
            </div>
          ) : (
            ""
          )}
          {/* </div> */}
          <div className='otherButton'>
            <button
              onClick={() => {
                handleGoogle();
              }}
              className='loginButton'
              disabled={loading}
            >
              <FontAwesomeIcon className='iconUtil' icon={faGoogle} />
              Daftar dengan Google
              {loading && <div className='loader'></div>}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RegisterScreen;
