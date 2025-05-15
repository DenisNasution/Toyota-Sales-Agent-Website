import { useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";
import { useAppDispatch, useAppSelector } from "../app/store";
import { getTestimoni } from "../features/testimoniActions";
import { resetStatus } from "../features/testimoniSlice";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import SEO from "../component/SEO";

function TestimoniScreen() {
  const dispatch = useAppDispatch();
  // const [isOpen, setIsOpen] = useState(true);
  const [imageSrc, setImageSrc] = useState("");
  const [textModal, setTextModal] = useState("");
  const { dataTestimoni, loading, status, message } = useAppSelector(
    (state) => state.testimoni
  );
  const [warnText, setWarnText] = useState("");
  useEffect(() => {
    // document.title = "Galeri";
    dispatch(getTestimoni());
  }, [dispatch]);

  useEffect(() => {
    if (status === 404) {
      setWarnText(message);
      dispatch(resetStatus());
    }
  }, [dispatch, status, message]);
  interface modal {
    image: string;
    text: string;
  }
  const handleShowDialog = (modal: modal) => {
    // setIsOpen(!isOpen);
    setImageSrc(modal.image);
    setTextModal(modal.text);
    // console.log(image);
  };
  return (
    <>
      <SEO
        title='Galeri'
        description='Daftar Galeri pada halaman Dealer Toyota Deltamas Medan'
        name='Dealer Toyota Deltamas Medan Kota'
        link='https://toyotakotamedan.com/testimoni'
        type='article'
        keyword='toyota, deltamas,toyota delatamas, toyota delatamas medan, toyota delatamas medan kota, dealer medan kota, toyota medan, deltamas medan, toyota medan Kota, deltamas medan kota, toyota zenix, zenix, toyota alphard, alphard, toyota fortuner, fortuner, toyota veloz, veloz, toyota avanza, avanza, toyota rush, rush, toyota voxy, voxy, toyota altis, altis, toyota corolla, corolla, toyota innova, innova,toyota calya, calya,toyota sigra, sigra,toyota yaris, yaris, toyota raize, raize,vehicle, daftar testimoni, daftar testimoni toyota'
      />
      <main className='headerMain'>
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
                <section className='testimoniPage'>
                  <div className='testimoniPageContainer'>
                    <div className='headerTitle'>
                      <h1>Toyota Gallery</h1>
                    </div>
                    <div className='testimoniCardPageContainer'>
                      {dataTestimoni &&
                        dataTestimoni.map((testimoni) => (
                          <div className='testimoniCardPage'>
                            <div id='todiv1'></div>
                            <a
                              className='open'
                              href='#todiv1'
                              onClick={() =>
                                handleShowDialog({
                                  image: testimoni.testimoni_img,
                                  text: testimoni.testimoni_text,
                                })
                              }
                            >
                              {" "}
                              <div className='openBtn'>LIHAT</div>
                            </a>
                            <LazyLoadImage
                              className='testimoniPageImage'
                              // loading='lazy'
                              alt='Image Alt'
                              src={`${process.env.REACT_APP_LINK as string}${
                                testimoni.testimoni_img
                              }`}
                              // alt=''
                            />

                            <div className='modal' id='modalShow'>
                              <a className='cancel' href='#hidiv1'>
                                x
                              </a>
                              <img
                                className='testimoniPageImageLarge'
                                src={`${
                                  process.env.REACT_APP_LINK as string
                                }${imageSrc}`}
                                alt=''
                              />
                              <p className='testimoniText'>{textModal}</p>
                            </div>
                          </div>
                        ))}
                      {/* <div>
                      <img
                        className='testimoniPageImage'
                        src='./assets/d4.jpeg'
                        onClick={handleShowDialog}
                        alt='no image'
                      />
                      {isOpen && (
                        <dialog
                          className='dialog'
                          style={{ position: "absolute" }}
                          open
                          onClick={handleShowDialog}
                        >
                          <img
                            className='image'
                            src='./assets/d4.jpeg'
                            onClick={handleShowDialog}
                            alt='no image'
                          />
                        </dialog>
                      )}
                    </div>
                    <div>
                      <img
                        className='testimoniPageImage'
                        src='./assets/testimoni.jpg'
                        onClick={handleShowDialog}
                        alt='no image'
                      />
                      {isOpen && (
                        <dialog
                          className='dialog'
                          style={{ position: "absolute" }}
                          open
                          onClick={handleShowDialog}
                        >
                          <img
                            className='image'
                            src='./assets/testimoni.jpg'
                            onClick={handleShowDialog}
                            alt='no image'
                          />
                        </dialog>
                      )}
                    </div> */}
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

export default TestimoniScreen;
