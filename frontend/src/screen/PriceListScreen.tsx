import { useEffect, useLayoutEffect, useRef, useState } from "react";
// import { Helmet } from "react-helmet-async";
import { useAppDispatch, useAppSelector } from "../app/store";
import { getPriceAction } from "../features/priceActions";
import { useParams } from "react-router-dom";
import { resetStatus } from "../features/priceSlice";
import { Link } from "react-router-dom";
import SEO from "../component/SEO";

function PriceListScreen() {
  const dispatch = useAppDispatch();
  // const [loading, setLoading] = useState(true);
  const { dataPrice, loading, status, message } = useAppSelector(
    (state) => state.price
  );
  // const [scroll, setScroll] = useState(400);
  const [warnText, setWarnText] = useState("");
  const { id } = useParams();
  // const ref = useRef<null | HTMLDivElement>(null);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({
  //     block: "center",
  //     behavior: "smooth",
  //   });
  //   // messagesEndRef.current?.scrollTo({
  //   //   top: 100,
  //   //   left: 100,
  //   //   behavior: "smooth",
  //   // });
  // };
  // useLayoutEffect(() => {
  //   document.title = `${dataPrice && dataPrice.vehicleName} - Price List`;
  // }, [dataPrice]);
  useEffect(() => {
    dispatch(getPriceAction(id as string));
    // scrollToBottom();
    window.scrollTo({
      top: 400,
      left: 0,
      behavior: "smooth",
    });
  }, [dispatch, id]);
  useEffect(() => {
    if (status === 404) {
      setWarnText(message);
      dispatch(resetStatus());
    }
  }, [dispatch, status, message]);
  // console.log(dataPrice);

  return (
    <>
      <SEO
        title={`${dataPrice && dataPrice.vehicleName} - Price List`}
        description={`Daftar harga mobil ${
          dataPrice && dataPrice.vehicleName
        } pada halaman Dealer Toyota Deltamas Medan`}
        name='Dealer Toyota Deltamas Medan Kota'
        link='https://toyotakotamedan.com/price'
        type='article'
        keyword='toyota, deltamas,toyota delatamas, toyota delatamas medan, toyota delatamas medan kota, dealer medan kota, toyota medan, deltamas medan, toyota medan Kota, deltamas medan kota, toyota zenix, zenix, toyota alphard, alphard, toyota fortuner, fortuner, toyota veloz, veloz, toyota avanza, avanza, toyota rush, rush, toyota voxy, voxy, toyota altis, altis, toyota corolla, corolla, toyota innova, innova,toyota calya, calya,toyota sigra, sigra,toyota yaris, yaris, toyota raize, raize,vehicle, price list, price list toyota, daftar harga'
      />
      <main className='headerMain' ref={messagesEndRef}>
        {loading ? (
          <div className='spinLoader'>
            <div className='loaderPage'></div>
          </div>
        ) : (
          <>
            {warnText ? (
              <div className='spinLoader' style={{ textAlign: "center" }}>
                <h1>{warnText}</h1>
                <Link to={"/"}>Kembali ke Beranda</Link>
              </div>
            ) : (
              <>
                <section className='heroSectionPrice'>
                  <div className='heroSlide'>
                    <img
                      src={`${process.env.REACT_APP_LINK as string}${
                        dataPrice.vehicleBanner
                      }`}
                      alt=''
                    />
                  </div>
                </section>
                <section className='priceListProduct'>
                  <div className='priceListProductContainer '>
                    <img
                      src={`${process.env.REACT_APP_LINK as string}${
                        dataPrice.vehicleImage
                      }`}
                      alt=''
                    />
                    <div className='producType'>
                      <div className='headerTitle'>
                        <h1>{dataPrice.vehicleName}</h1>
                      </div>
                      <div className='productTypeTable'>
                        <table className='tableRow'>
                          <thead>
                            <tr>
                              <th>TIPE</th>
                              <th>HARGA</th>
                            </tr>
                          </thead>
                          <tbody>
                            {dataPrice &&
                              dataPrice.vehicle.map((data) => (
                                <tr>
                                  <td>{data.subVehicle_name}</td>
                                  <td>{data.subVehicle_price}</td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </section>
              </>
            )}
          </>
        )}
      </main>
    </>
  );
}

export default PriceListScreen;
