import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/store";
import { useNavigate } from "react-router-dom";
import {
  deleteTestimoniAction,
  getTestimoni,
} from "../features/testimoniActions";
import { resetStatus } from "../features/testimoniSlice";
import toast, { Toaster } from "react-hot-toast";
import ModalComponent from "../component/ModalComponent";
import { checkAuth } from "../features/userAction";
import { Link } from "react-router-dom";
import SEO from "../component/SEO";

const TestimoniListScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { dataTestimoni, status, loading, message } = useAppSelector(
    (state) => state.testimoni
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [image, setImage] = useState("");
  const [warnText, setWarnText] = useState("");
  const [cordinate, setCordinate] = useState(0);
  const notify = () => toast.success(message);
  const notifyerror = () => toast.error(message);
  let ranonce = false;
  useEffect(() => {
    // document.title = "Admin - Testimoni";
    dispatch(getTestimoni());
  }, [dispatch]);
  useEffect(() => {
    if (!ranonce) {
      if (status === 200) {
        notify();
        dispatch(getTestimoni());
        dispatch(resetStatus());
        window.scrollTo({
          top: cordinate,
          left: 0,
          behavior: "smooth",
        });
      }
      if (status === 400) {
        notifyerror();
        dispatch(resetStatus());
      }
      if (status === 404) {
        // navigate("/login", { replace: true });
        setWarnText(message);
        dispatch(resetStatus());
      }
      ranonce = true;
    }
  }, [dispatch, status]);

  interface testimoniData {
    id: number;
    image: string;
  }
  const handleClickDelete = (data: testimoniData) => {
    dispatch(checkAuth());
    setModalOpen(true);
    setDeleteId(data.id);
    setImage(data.image);
  };

  const deleteItem = () => {
    dispatch(
      deleteTestimoniAction({
        id: deleteId,
        images: image,
      })
    );
    setCordinate(window.scrollY);
    // console.log(deleteId, image);
  };

  return (
    <>
      <SEO
        title='Admin - Testimoni'
        description='Daftar testimoni pada halaman admin Dealer Toyota Deltamas Medan'
        name='Dealer Toyota Deltamas Medan Kota'
        link='https://toyotakotamedan.com/testimoniList'
        type='article'
        keyword='toyota, deltamas,toyota delatamas, toyota delatamas medan, toyota delatamas medan kota, dealer medan kota, toyota medan, deltamas medan, toyota medan Kota, deltamas medan kota, toyota zenix, zenix, toyota alphard, alphard, toyota fortuner, fortuner, toyota veloz, veloz, toyota avanza, avanza, toyota rush, rush, toyota voxy, voxy, toyota altis, altis, toyota corolla, corolla, toyota innova, innova,toyota calya, calya,toyota sigra, sigra,toyota yaris, yaris, toyota raize, raize,vehicle, daftar testimoni admin, daftar testimoni admin toyota'
      />
      <main className='headerMain'>
        <section className='vehiclePage'>
          <Toaster position='top-center' reverseOrder={false}></Toaster>
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
                  <div className='headerVehicle'>
                    <div className='headerTitle'>
                      <h1>Testimoni</h1>
                    </div>
                    <div
                      className='addButtonAdmin'
                      onClick={() => navigate(`/testimoniForm/`)}
                    >
                      <h3>+ Testimoni</h3>
                    </div>
                  </div>
                  <div className='vehicleList'>
                    <div className='vehicleListContainer'>
                      {/* <div> */}
                      <table className='vehicleTable adminTable'>
                        <thead>
                          <tr>
                            <th scope='col'>Gambar</th>
                            <th scope='col'>Testimoni</th>
                            <th scope='col'>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dataTestimoni &&
                            dataTestimoni.map((testimoni) => (
                              <>
                                <tr key={testimoni.testimoni_id}>
                                  <td data-label='Gambar'>
                                    <div>
                                      <img
                                        className='vehicleBanner'
                                        src={`${
                                          process.env.REACT_APP_LINK as string
                                        }${testimoni.testimoni_img}`}
                                        alt=''
                                      />
                                    </div>
                                  </td>
                                  <td
                                    data-label='Testimoni'
                                    className='nameCell'
                                    style={{ verticalAlign: "top" }}
                                  >
                                    <p>{testimoni.testimoni_text}</p>
                                  </td>

                                  <td
                                    data-label='Action'
                                    className='actionCell'
                                  >
                                    <div className='buttonAction'>
                                      <div>
                                        <button
                                          className='edit btn'
                                          onClick={() =>
                                            navigate(`/testimoniForm`, {
                                              state: testimoni,
                                            })
                                          }
                                        >
                                          edit
                                        </button>
                                      </div>
                                      <div>
                                        <button
                                          className='delete btn'
                                          onClick={() =>
                                            handleClickDelete({
                                              id: testimoni.testimoni_id,
                                              image: testimoni.testimoni_img,
                                            })
                                          }
                                        >
                                          delete
                                        </button>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                                {/* <div> */}
                                {isModalOpen && (
                                  <ModalComponent
                                    onClose={() => setModalOpen(false)}
                                    onDelete={deleteItem}
                                  >
                                    <h2>Delete Confirmation</h2>
                                    <p>Are you want to delete?</p>
                                  </ModalComponent>
                                )}
                                {/* </div> */}
                              </>
                            ))}
                        </tbody>
                      </table>
                      {/* </div> */}
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </section>
      </main>
    </>
  );
};

export default TestimoniListScreen;
