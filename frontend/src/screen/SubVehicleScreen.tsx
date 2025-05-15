import { useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";
import toast, { Toaster } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "../app/store";
import {
  deleteSubVehicleAction,
  getSubVehicleAction,
} from "../features/subVehicleActions";
import { useNavigate, useParams } from "react-router-dom";
import { resetStatus } from "../features/subVehicleSlice";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalComponent from "../component/ModalComponent";
import { checkAuth } from "../features/userAction";
import { Link } from "react-router-dom";
import SEO from "../component/SEO";
const SubVehicleScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(true);
  const { dataSubVehicle, message, status, loading } = useAppSelector(
    (state) => state.subVehicle
  );
  // const { status: statusLogin } = useAppSelector((state) => state.user);
  const [warnText, setWarnText] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [cordinate, setCordinate] = useState(0);
  // const notify = () => toast.success(message);
  const { id } = useParams();
  const notify = () => toast.success(message);
  const notifyerror = () => toast.error(message);
  let ranonce = false;

  // useLayoutEffect(() => {
  //   document.title = `${
  //     dataSubVehicle && dataSubVehicle.vehicleName
  //   } - Tipe Kendaraan`;
  // }, [dataSubVehicle]);
  useEffect(() => {
    dispatch(getSubVehicleAction(id as string));
  }, [dispatch, id]);

  useEffect(() => {
    if (!ranonce) {
      if (status === 200) {
        notify();
        dispatch(getSubVehicleAction(id as string));
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

  // console.log(status);
  // console.log(warnText);
  interface subVehicleData {
    id: number;
  }
  const handleClickDelete = (data: subVehicleData) => {
    dispatch(checkAuth());
    setModalOpen(true);
    setDeleteId(data.id);
  };

  const deleteItem = () => {
    dispatch(deleteSubVehicleAction(deleteId));
    setCordinate(window.scrollY);
    // console.log(deleteId);
  };
  // console.log(status);
  // console.log(dataSubVehicle);
  // console.log(dataSubVehicle.vehicleId);
  return (
    <>
      <SEO
        title={`${
          dataSubVehicle && dataSubVehicle.vehicleName
        } - Tipe Kendaraan`}
        description={`Daftar tipe mobil atau kendaraan ${
          dataSubVehicle && dataSubVehicle.vehicleName
        } pada halaman admin Dealer Toyota Deltamas Medan`}
        name='Dealer Toyota Deltamas Medan Kota'
        link='https://toyotakotamedan.com/subvehicle/:id'
        type='article'
        keyword='toyota, deltamas,toyota delatamas, toyota delatamas medan, toyota delatamas medan kota, dealer medan kota, toyota medan, deltamas medan, toyota medan Kota, deltamas medan kota, toyota zenix, zenix, toyota alphard, alphard, toyota fortuner, fortuner, toyota veloz, veloz, toyota avanza, avanza, toyota rush, rush, toyota voxy, voxy, toyota altis, altis, toyota corolla, corolla, toyota innova, innova,toyota calya, calya,toyota sigra, sigra,toyota yaris, yaris, toyota raize, raize,vehicle, tipe kendaraan atau mobil, tipe kendaraan atau mobil toyota'
      />
      <main className='headerMain'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        {/* <ToastContainer></ToastContainer> */}
        <section className='vehiclePage'>
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
                      <h1>{dataSubVehicle.vehicleName}</h1>
                    </div>
                    <div
                      className='addButtonAdmin'
                      onClick={() => navigate(`/svhcForm/${id}/vhc`)}
                      // onClick={notify}
                    >
                      <h3>+ Tipe Kendaraan</h3>
                    </div>
                  </div>
                  <div className='vehicleList'>
                    <div className='vehicleListContainer'>
                      {/* <div> */}
                      <table className='adminTable subvehicleTable '>
                        <thead>
                          <tr>
                            <th
                              className='tipeHead'
                              scope='col'
                              style={
                                {
                                  // width: "20rem",
                                  // marginRight: "134rem",
                                  // background: "red",
                                }
                              }
                            >
                              Tipe
                            </th>
                            <th scope='col'>Harga</th>
                            <th scope='col'>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dataSubVehicle &&
                            dataSubVehicle.vehicle.map((subVehicle) => (
                              <>
                                <tr key={subVehicle.subVehicle_id}>
                                  <td
                                    data-label='Name'
                                    className='nameCell'
                                    style={{
                                      verticalAlign: "top",
                                      // background: "blue",
                                      // paddingInline: "1rem",
                                      // width: "122rem",
                                    }}
                                  >
                                    <h2>{subVehicle.subVehicle_name}</h2>
                                  </td>
                                  <td
                                    data-label='Kategori'
                                    className='kategoriCell'
                                    style={{ verticalAlign: "top" }}
                                  >
                                    <h2>{subVehicle.subVehicle_price}</h2>
                                  </td>
                                  <td
                                    data-label='Action'
                                    className='actionCell'
                                  >
                                    <div className=''>
                                      <button
                                        className='edit btn'
                                        onClick={() =>
                                          navigate(
                                            `/svhcForm/${subVehicle.vehicle_id}/vhc`,
                                            {
                                              state: subVehicle,
                                            }
                                          )
                                        }
                                      >
                                        edit
                                      </button>
                                      <button
                                        className='delete btn'
                                        onClick={() =>
                                          handleClickDelete({
                                            id: subVehicle.subVehicle_id,
                                          })
                                        }
                                      >
                                        delete
                                      </button>
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

export default SubVehicleScreen;
