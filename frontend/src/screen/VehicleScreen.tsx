import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/store";
import { deleteVehicle, getVehicle } from "../features/vehicleActions";
import { useNavigate } from "react-router-dom";
import { resetStatus } from "../features/vehicleSlice";
import toast, { Toaster } from "react-hot-toast";
import ModalComponent from "../component/ModalComponent";
import { checkAuth } from "../features/userAction";
import { Link } from "react-router-dom";
import SEO from "../component/SEO";

function VehicleScreen() {
  const dispatch = useAppDispatch();
  const { dataVehicle, status, message, loading } = useAppSelector(
    (state) => state.vehicle
  );
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [warnText, setWarnText] = useState("");
  const [image, setImage] = useState("");
  const [banner, setBanner] = useState("");
  const [deleteId, setDeleteId] = useState(0);
  const [cordinate, setCordinate] = useState(0);
  const notify = () => toast.success(message);
  const notifyerror = () => toast.error(message);
  let ranonce = false;
  // const memoizedCallback = useCallback(() => {
  //   if (status === 200) {
  //     // dispatch(resetStatus());
  //     console.log("oke");
  //   }
  // }, [status, dispatch]);
  // console.log(message);
  useEffect(() => {
    // memoizedCallback();
    dispatch(getVehicle());
  }, [dispatch]);
  useEffect(() => {
    if (!ranonce) {
      if (status === 404) {
        // navigate("/login", { replace: true });
        setWarnText(message);
        dispatch(resetStatus());
      }
      if (status === 200) {
        notify();
        dispatch(getVehicle());
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
      ranonce = true;
    }
  }, [dispatch, status]);

  interface vehicleData {
    id: number;
    image: string;
    banner: string;
  }
  const handleClickDelete = (data: vehicleData) => {
    dispatch(checkAuth());
    setModalOpen(true);
    setDeleteId(data.id);
    setImage(data.image);
    setBanner(data.banner);
    // console.log(window.scrollY);
  };

  const deleteItem = () => {
    dispatch(
      deleteVehicle({
        id: deleteId,
        banner: banner,
        image: image,
      })
    );
    setCordinate(window.scrollY);
    // console.log(deleteId);
  };

  return (
    <>
      <SEO
        title='Admin - Kendaraan '
        description='Daftar kendaraan pada halaman admin Dealer Toyota Deltamas Medan'
        name='Dealer Toyota Deltamas Medan Kota'
        link='https://toyotakotamedan.com/vehicle'
        type='article'
        keyword='toyota, deltamas,toyota delatamas, toyota delatamas medan, toyota delatamas medan kota, dealer medan kota, toyota medan, deltamas medan, toyota medan Kota, deltamas medan kota, toyota zenix, zenix, toyota alphard, alphard, toyota fortuner, fortuner, toyota veloz, veloz, toyota avanza, avanza, toyota rush, rush, toyota voxy, voxy, toyota altis, altis, toyota corolla, corolla, toyota innova, innova,toyota calya, calya,toyota sigra, sigra,toyota yaris, yaris, toyota raize, raize,vehicle, kendaraan, daftar kendaraan toyota'
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
                      <h1>Vehicle</h1>
                    </div>
                    <div
                      className='addButtonAdmin'
                      onClick={() => navigate(`/vhcForm/`)}
                    >
                      <h3>+ Kendaraan</h3>
                    </div>
                  </div>
                  <div className='vehicleList'>
                    <div className='vehicleListContainer'>
                      <table className='vehicleTable adminTable'>
                        <thead>
                          <tr>
                            <th scope='col'>Gambar</th>
                            <th scope='col'>Banner</th>
                            <th scope='col' className='textCell'>
                              Name
                            </th>
                            <th scope='col' className='textCell'>
                              Kategori
                            </th>
                            <th scope='col'>button</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dataVehicle &&
                            dataVehicle.map((vehicle) => (
                              <React.Fragment key={vehicle.vehicle_id}>
                                {isModalOpen && (
                                  <ModalComponent
                                    onClose={() => setModalOpen(false)}
                                    onDelete={deleteItem}
                                  >
                                    <h2>Delete Confirmation </h2>
                                    <p>Are you want to delete?</p>
                                  </ModalComponent>
                                )}
                                <tr key={vehicle.vehicle_id}>
                                  <td data-label='Gambar' className='imageCell'>
                                    <img
                                      className='vehicleImage'
                                      src={`${
                                        process.env.REACT_APP_LINK as string
                                      }${vehicle.vehicle_img}`}
                                      alt=''
                                    />
                                  </td>
                                  <td
                                    data-label='Banner'
                                    className='imageBanner'
                                  >
                                    <div>
                                      <img
                                        className='vehicleBanner'
                                        src={`${
                                          process.env.REACT_APP_LINK as string
                                        }${vehicle.vehicle_banner}`}
                                        alt=''
                                      />
                                    </div>
                                  </td>
                                  <td data-label='Name'>
                                    <h3>{vehicle.vehicle_name}</h3>
                                  </td>
                                  <td
                                    data-label='Kategori'
                                    className='kategoriCell'
                                  >
                                    <h3>{vehicle.category_name}</h3>
                                  </td>
                                  <td
                                    data-label='Action'
                                    className='actionCell'
                                  >
                                    <div className='buttonAction'>
                                      <button
                                        className='edit btn'
                                        onClick={() =>
                                          navigate(`/vhcForm`, {
                                            state: vehicle,
                                          })
                                        }
                                      >
                                        edit
                                      </button>
                                      <button
                                        className='delete btn'
                                        onClick={() =>
                                          handleClickDelete({
                                            id: vehicle.vehicle_id,
                                            image: vehicle.vehicle_img,
                                            banner: vehicle.vehicle_banner,
                                          })
                                        }
                                      >
                                        delete
                                      </button>
                                      <button
                                        className='tipe btn'
                                        onClick={() =>
                                          navigate(
                                            `/subvehicle/${vehicle.vehicle_id}`
                                          )
                                        }
                                      >
                                        tipe
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              </React.Fragment>
                            ))}
                        </tbody>
                      </table>
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
}

export default VehicleScreen;
