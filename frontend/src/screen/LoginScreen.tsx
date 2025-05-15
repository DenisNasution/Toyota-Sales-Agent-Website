import { useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";
import { useAppDispatch, useAppSelector } from "../app/store";
import { loginAction } from "../features/userAction";
import { useGoogleLogin } from "@react-oauth/google";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { resetStatus } from "../features/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import SEO from "../component/SEO";
// import axios from "axios";
library.add(faGoogle);

const LoginScreen = () => {
  const dispatch = useAppDispatch();
  const { status, message, dataLogin } = useAppSelector((state) => state.user);
  // const { dataLogin } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  // const [user, setUser] = useState("");
  // const handleLogin = () => {
  //   // dispatch(loginAction());
  //   window.open(`http://localhost:3000/api/user/google`, "_self");
  // };
  // const googleAuth = () => {
  //   window.open(
  //     `${process.env.REACT_APP_API_URL}/auth/google/callback`,
  //     "_self"
  //   );
  // };
  const [warnText, setWarnText] = useState("");
  const [successText, setSuccessText] = useState("");
  const { state } = useLocation();
  // console.log(status);
  // console.log(message);
  // useLayoutEffect(() => {
  //   if (Object.values(dataLogin).length !== 0) {
  //     navigate(from, { replace: true });
  //   }
  // }, [dataLogin, navigate, from]);
  useEffect(() => {
    setLoading(false);
    if (status === 200 && Object.values(dataLogin).length !== 0) {
      setLoading(false);
      navigate(from, { replace: true });
    }
    // if (state) {
    //   setSuccessText(state.message);
    //   window.history.replaceState({}, "");
    // }
    if (status === 200) {
      setSuccessText(message);
      dispatch(resetStatus());
    }
    if (status === 500) {
      setWarnText(message);
      dispatch(resetStatus());
    }
    if (status === 401) {
      setWarnText(message);
      dispatch(resetStatus());
    }
  }, [dispatch, status, message, state]);
  // console.log(status);
  // console.log(warnText);

  const handleGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      dispatch(loginAction({ token: response.access_token }));
    },
  });

  return (
    <>
      <SEO
        title='Login'
        description='Login pada halaman admin Dealer Toyota Deltamas Medan'
        name='Dealer Toyota Deltamas Medan Kota'
        link='https://zf9ji8kavinesia.my.id/login'
        type='form'
        keyword='toyota, deltamas,toyota delatamas, toyota delatamas medan, toyota delatamas medan kota, dealer medan kota, toyota medan, deltamas medan, toyota medan Kota, deltamas medan kota, toyota zenix, zenix, toyota alphard, alphard, toyota fortuner, fortuner, toyota veloz, veloz, toyota avanza, avanza, toyota rush, rush, toyota voxy, voxy, toyota altis, altis, toyota corolla, corolla, toyota innova, innova,toyota calya, calya,toyota sigra, sigra,toyota yaris, yaris, toyota raize, raize,vehicle, login, login admin toyota'
      />
      <main className='headerMain'>
        <section className='vehiclePage'>
          <div className='spinLoader'>
            {loading ? (
              <div className='spinLoader'>
                <div className='loaderPage'></div>
              </div>
            ) : (
              <>
                {warnText ? (
                  <div className='textWarnInput warnInputLogin'>
                    <h5>{warnText}</h5>
                  </div>
                ) : successText ? (
                  <div className='textSuccessText warnInputLogin'>
                    <h5>{successText}</h5>
                  </div>
                ) : (
                  ""
                )}

                {/* </div> */}
                <div className='otherButton'>
                  <button
                    onClick={() => handleGoogle()}
                    className='loginButton'
                    disabled={loading}
                  >
                    <FontAwesomeIcon className='iconUtil' icon={faGoogle} />
                    Login dengan Google
                    {loading && <div className='loader'></div>}
                  </button>
                </div>
              </>
            )}
            {/* <div className='formInput formPict'> */}
          </div>
        </section>
      </main>
    </>
  );
};

export default LoginScreen;
