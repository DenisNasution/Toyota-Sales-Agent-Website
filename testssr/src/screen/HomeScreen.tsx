// import React, { useEffect } from "react";
// import { Helmet } from "react-helmet-async";
import { LeftArrow, RightArrow } from "../component/arrows";
import { Card } from "../component/card";
// import "./globalStyles.css";
import { DragDealer } from "../component/DragDealer";
import { useAppDispatch, useAppSelector } from "../app/store";
import { homeAction } from "../features/homeActions";
import { Link } from "react-router-dom";
import SEO from "../component/SEO";
import React, { useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPhone } from "@fortawesome/free-solid-svg-icons";
import {
  faWhatsapp,
  faFacebook,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
library.add(faArrowRight, faWhatsapp, faFacebook, faPhone, faInstagram);

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

const category = ["mpv", "suv", "hatchback", "sedan", "commercial"];
// const cars = [
//   { id: 1, idCategory: 1, carName: "Zenix", harga: "Rp.250.0000.0000" },
//   { id: 2, idCategory: 1, carName: "Zenix", harga: "Rp.250.0000.0000" },
//   // { id: 3, idCategory: 1, carName: "Zenix", harga: "Rp.250.0000.0000" },
//   { id: 4, idCategory: 2, carName: "Zenix", harga: "Rp.250.0000.0000" },
//   { id: 5, idCategory: 2, carName: "Zenix", harga: "Rp.250.0000.0000" },
//   { id: 6, idCategory: 2, carName: "Zenix", harga: "Rp.250.0000.0000" },
//   { id: 4, idCategory: 2, carName: "Zenix", harga: "Rp.250.0000.0000" },
//   { id: 5, idCategory: 2, carName: "Zenix", harga: "Rp.250.0000.0000" },
//   { id: 6, idCategory: 2, carName: "Zenix", harga: "Rp.250.0000.0000" },
//   { id: 4, idCategory: 2, carName: "Zenix", harga: "Rp.250.0000.0000" },
//   { id: 5, idCategory: 2, carName: "Zenix", harga: "Rp.250.0000.0000" },
//   { id: 6, idCategory: 2, carName: "Zenix", harga: "Rp.250.0000.0000" },
//   { id: 7, idCategory: 3, carName: "Zenix", harga: "Rp.250.0000.0000" },
//   { id: 8, idCategory: 4, carName: "Zenix", harga: "Rp.250.0000.0000" },
//   // { id: 3, idCategory: 1, carName: "Zenix", harga: "Rp.250.0000.0000" },
//   { id: 9, idCategory: 3, carName: "Zenix", harga: "Rp.250.0000.0000" },
//   { id: 10, idCategory: 5, carName: "Zenix", harga: "Rp.250.0000.0000" },
//   { id: 11, idCategory: 4, carName: "Zenix", harga: "Rp.250.0000.0000" },
// ];

function HomeScreen() {
  const dispatch = useAppDispatch();
  // const [loading, setLoading] = useState(false);
  const { dataHome, loading } = useAppSelector((state) => state.home);
  useEffect(() => {
    dispatch(homeAction());
  }, [dispatch]);
  // console.log(dataHome?.banner[0].banner_img);
  // console.log(dataHome);

  const [items] = React.useState(category);

  const dragState = React.useRef(new DragDealer());

  const handleDrag =
    ({ scrollContainer }: scrollVisibilityApiType) =>
    (ev: React.MouseEvent) =>
      dragState.current.dragMove(ev, (posDiff: number) => {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff;
        }
      });

  const [selected, setSelected] = React.useState<string>("1");
  const [categoryCar, setCategoryCar] = React.useState<number>(1);
  const handleItemClick = (itemId: number) => () => {
    if (dragState.current.dragging) {
      return false;
    }
    setSelected(selected !== itemId.toString() ? itemId.toString() : "");
    setCategoryCar(itemId);
  };
  // console.log(process.env.REACT_APP_LINK);
  return (
    <>
      <SEO
        title='Beranda'
        description='Beranda pada halaman admin Dealer Toyota Deltamas Medan menampilkan daftar mobil, kontak sales, dan testimoni pembeli'
        name='Dealer Toyota Deltamas Medan Kota'
        link='https://toyotakotamedan.com/'
        type='article'
        keyword='toyota, deltamas,toyota delatamas, toyota delatamas medan, toyota delatamas medan kota, dealer medan kota, toyota medan, deltamas medan, toyota medan Kota, deltamas medan kota, toyota zenix, zenix, toyota alphard, alphard, toyota fortuner, fortuner, toyota veloz, veloz, toyota avanza, avanza, toyota rush, rush, toyota voxy, voxy, toyota altis, altis, toyota corolla, corolla, toyota innova, innova,toyota calya, calya,toyota sigra, sigra,toyota yaris, yaris, toyota raize, raize,vehicle, beranda, beranda toyota'
      />
      <main className='headerMain'>
        {loading ? (
          <div className='spinLoader'>
            <div className='loaderPage'></div>
          </div>
        ) : (
          <>
            <section className='heroSection'>
              <div className='heroSlide'>
                {/* <img src={"./assets/headerLogo.png"} /> */}
                <Carousel
                  autoPlay={true}
                  infiniteLoop={true}
                  showThumbs={false}
                  stopOnHover={true}
                  swipeable={true}
                  showStatus={false}
                  dynamicHeight={true}
                >
                  {dataHome &&
                    dataHome.banner.map((banner) => (
                      <div
                        className='carrouselImg'
                        style={{ height: "clamp(12rem, 33vw, 26rem)" }}
                      >
                        <img
                          src={`${process.env.REACT_APP_LINK as string}${
                            banner.banner_img
                          }`}
                          alt='carrouselImg'
                        />
                      </div>
                    ))}
                </Carousel>
              </div>
            </section>
            <section className='priceListSection'>
              <div className='priceListContainer container'>
                <div className='headerTitle'>
                  <h1>Jelajahi Produk</h1>
                </div>
                <div className='example scroll '>
                  <div style={{}} onMouseLeave={dragState.current.dragStop}>
                    <ScrollMenu
                      LeftArrow={LeftArrow}
                      RightArrow={RightArrow}
                      onWheel={onWheel}
                      onMouseMove={handleDrag}
                    >
                      {items.map((category, index) => (
                        <Card
                          title={category}
                          itemId={index.toString()} // NOTE: itemId is required for track items
                          key={index}
                          onClick={handleItemClick(index + 1)}
                          selected={(index + 1).toString() === selected}
                        />
                      ))}
                    </ScrollMenu>
                  </div>
                </div>
                <div className='produkList' id={"produkList"}>
                  {dataHome &&
                    dataHome.vehicle.map(
                      (vehicle) =>
                        vehicle.vehicle_idCategory === categoryCar && (
                          <div className='produkCard'>
                            <img
                              src={`${process.env.REACT_APP_LINK as string}${
                                vehicle.vehicle_img
                              }`}
                              alt=''
                            />
                            <h2>{vehicle.vehicle_name}</h2>
                            <p>Mulai Dari {vehicle.min_val2}</p>
                            <p>
                              <Link to={`/price/${vehicle.vehicle_id}`}>
                                lihat detail{"    "}
                                <FontAwesomeIcon
                                  className='iconUtil'
                                  icon={faArrowRight}
                                />{" "}
                              </Link>
                            </p>
                          </div>
                        )
                    )}
                </div>
              </div>
            </section>
            <section className='aboutUs'>
              <div className='aboutUsContainer container'>
                <div className='aboutCompany' id={"contact"}>
                  <div className='headerTitle'>
                    <h1>DEALER TOYOTA MEDAN</h1>
                  </div>
                  <p className='companyDesc'>
                    Deltamas Toyota Medan adalah dealer resmi kendaraan bermotor
                    merek Toyota Medan dengan jaringan dealer di wilayah Medan
                    dan sekitarnya. Deltamas merupakan dealer resmi kendaraan
                    bermotor merek Toyota di Medan yang melayani penjualan unit
                    kendaraan beserta layanan purnajualnya, termasuk penjualan
                    suku cadang original, dan juga pelayanan bengkel dan
                    perbaikan kendaraan.
                  </p>
                </div>
                <div className='aboutContact'>
                  <div className='headerTitle'>
                    <h1 style={{ marginBottom: "2rem" }}>Kontak</h1>
                  </div>
                  <div className='contactCard'>
                    <div className='cardLogo'>
                      <img src={"./assets/deltamas.png"} alt='' />
                      <img src={"./assets/toyota.png"} alt='' />
                    </div>
                    <div className='cardProfile'>
                      <img src={"./assets/d4.jpeg"} alt='' />
                      <div className='profileDesc'>
                        <h3>Mustafa Kamal</h3>
                        <h3>Sales Executive</h3>
                      </div>
                    </div>
                    <div className='cardContact'>
                      <div style={{ marginRight: "1rem" }}>
                        <h2>
                          <FontAwesomeIcon
                            className='iconUtil'
                            icon={faFacebook}
                          />{" "}
                        </h2>
                        <h2>Mustafa Kamal</h2>
                      </div>
                      <div>
                        <h2>
                          <FontAwesomeIcon
                            className='iconUtil'
                            icon={faInstagram}
                          />{" "}
                        </h2>
                        <h2>@musta_fakamal2706</h2>
                      </div>
                      <div>
                        <h2>
                          <FontAwesomeIcon
                            className='iconUtil'
                            icon={faWhatsapp}
                          />{" "}
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
                          <FontAwesomeIcon
                            className='iconUtil'
                            icon={faPhone}
                          />
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
                  </div>
                </div>
              </div>
            </section>
            <section className='testimoniSection'>
              <div className='testimoniContainer container'>
                <div className='headerTitle'>
                  <h1>Testimoni Customer</h1>
                </div>
                <div className='testimoniList'>
                  <div className='testimoniCard'>
                    <img src={"./assets/testimoni/testimoni.jpg"} alt='' />
                    <h1>"</h1>
                    <p>
                      {" "}
                      Proses Kredit Fortuner butuh waktu 2 hari dari pengumpulan
                      berkas. Sales nya juga fast respond dan selalu memberikan
                      kabar untuk mobil nya.
                    </p>
                  </div>
                  <div className='testimoniCard'>
                    <img src={"./assets/testimoni/testimoni1.jpg"} alt='' />
                    <h1>"</h1>
                    <p>
                      {" "}
                      Pelayanan tidak perlu diragukan lagi, hari itu datang hari
                      itu juga dilayani dengan sangat baik, saya sangat
                      merekomendasikan bagi yang ingin ambil mobil bisa dengan
                      Bapak Kamal.
                    </p>
                  </div>
                </div>

                {/* <div className='testimoniCard'>
              <img src={"./assets/testimoni/testimoni.jpg"} alt='' />
              <h1>"</h1>
              <p>
                Proses Kredit Innova butuh waktu 2 hari dari pengumpulan berkas.
                Sales nya juga fast respond dan selalu memberikan kabar untuk
                mobil nya.
              </p>
            </div> */}
              </div>
            </section>
          </>
        )}
      </main>
    </>
  );
}
function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}

export default HomeScreen;
