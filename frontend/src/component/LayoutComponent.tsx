import { useEffect, useState } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, Outlet } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { HelmetProvider } from "react-helmet-async";
import {
  faArrowRight,
  faPhone,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faWhatsapp,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { useAppDispatch, useAppSelector } from "../app/store";
import { checkAuth, logoutAction } from "../features/userAction";
library.add(
  faArrowRight,
  faWhatsapp,
  faFacebook,
  faPhone,
  faInstagram,
  faBars,
  faXmark
);
const LayoutComponent = () => {
  const [openNav, setOpenNav] = useState(false);
  const [openNav1, setOpenNav1] = useState(false);
  const [width, setWidth] = useState(0);
  const dispatch = useAppDispatch();
  const { dataLogin } = useAppSelector((state) => state.user);
  // console.log(width);
  useEffect(() => {
    dispatch(checkAuth());
    const updateWindowDimensions = () => {
      const newWidtht = window.innerWidth;
      setWidth(newWidtht);
      setOpenNav(false);
      setOpenNav1(false);
    };
    window.addEventListener("resize", updateWindowDimensions);
    return () => window.removeEventListener("resize", updateWindowDimensions);
  }, [dispatch, width]);
  // console.log(openNav);
  const helmetContext = {};
  return (
    <HelmetProvider context={helmetContext}>
      <div className='Wrapper'>
        <header className='headerContainer'>
          <div className='headerLogo'>
            <Link to='/'>
              <img src={"./assets/headerLogo.png"} alt='' />
            </Link>
          </div>
          <div className='headerMenu'>
            <ul className={`menuList ${openNav1 ? "showHeader" : ""}`}>
              {/* <ul className={`menuList showHeader`}> */}
              <li onClick={() => setOpenNav1(false)}>
                <Link to='/'>Beranda</Link>
              </li>
              {/* <li onClick={() => setOpenNav1(false)}>
                <Link to='/testimoni'>Galeri</Link>
              </li> */}
              <li onClick={() => setOpenNav1(false)}>
                {/* <a href=''>Pricelist</a> */}
                <HashLink to='/#produkList'>Pricelist</HashLink>
              </li>
              <li onClick={() => setOpenNav1(false)}>
                {/* <a href=''>Contact</a> */}
                <HashLink to='/#contact'>Kontak</HashLink>
              </li>
              {Object.values(dataLogin).length !== 0 ? (
                <li
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenNav(!openNav);
                  }}
                >
                  <a href='#test'>Admin</a>
                  <div
                    id='myDropdown'
                    className={`dropdown-content ${openNav ? "show" : ""}`}
                  >
                    <Link onClick={() => setOpenNav1(false)} to='/vehicle'>
                      Kendaraan
                    </Link>
                    {/* <Link
                      onClick={() => setOpenNav1(false)}
                      to='/testimoniList'
                    >
                      Testimoni
                    </Link> */}
                    <Link onClick={() => setOpenNav1(false)} to='/banner'>
                      Banner
                    </Link>
                    <Link
                      onClick={() => {
                        dispatch(logoutAction());
                        setOpenNav1(false);
                      }}
                      to='/'
                    >
                      Logout
                    </Link>
                  </div>
                </li>
              ) : (
                ""
              )}
            </ul>
            <FontAwesomeIcon
              onClick={() => setOpenNav1(!openNav1)}
              className={`iconUtil xmark ${openNav1 ? "showxmark" : ""}`}
              // className={`iconUtil xmark `}
              icon={faXmark}
            />{" "}
            <FontAwesomeIcon
              onClick={() => setOpenNav1(!openNav1)}
              className='iconUtil burger'
              icon={faBars}
            />{" "}
          </div>
        </header>
        <Outlet></Outlet>
        <footer className='footerContainer'>
          <div className='headerLogo'>
            <Link to='/'>
              <img src={"./assets/headerLogo.png"} alt='' />
            </Link>
          </div>
          <div className='profile'>
            <div style={{ marginRight: "1rem" }}>
              <h2>
                <FontAwesomeIcon className='iconUtil' icon={faFacebook} />{" "}
              </h2>
              <h2>Mustafa Kamal</h2>
            </div>
            <div>
              <h2>
                <FontAwesomeIcon className='iconUtil' icon={faInstagram} />{" "}
              </h2>
              <h2>@musta_fakamal2706</h2>
            </div>
            <div>
              <h2>
                <FontAwesomeIcon className='iconUtil' icon={faWhatsapp} />{" "}
              </h2>
              <h2>
                <a
                  href='https://wa.me/6285297129607'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  0852 9712 9607
                </a>
              </h2>
            </div>
            <div>
              <h2>
                <FontAwesomeIcon className='iconUtil' icon={faPhone} />
                {"        "}
              </h2>
              <h2>
                <a
                  href='https://wa.me/6285297129607'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  0852 9712 9607
                </a>
              </h2>
            </div>
          </div>
          <div className='footerMenu'>
            {/* <ul className='menuList'>
              <li>
                <a href='#test'>Showroom</a>
              </li>
              <li>
                <a href='#test'>Gallery</a>
              </li>
              <li>
                <a href='#test'>Pricelist</a>
              </li>
              <li>
                <a href='#test'>Contact</a>
              </li>
            </ul> */}
          </div>
        </footer>
      </div>
    </HelmetProvider>
  );
};

export default LayoutComponent;
