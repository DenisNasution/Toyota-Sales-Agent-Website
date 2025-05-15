import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/store";
import { deleteBannerAction, getBanner } from "../features/bannerActions";
import { resetStatus } from "../features/bannerSlice";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import ModalComponent from "../component/ModalComponent";
import { checkAuth } from "../features/userAction";
import SEO from "../component/SEO";

const BannerScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // const [loading, setLoading] = useState(true);
  const { dataBanner, status, loading, message } = useAppSelector(
    (state) => state.banner
  );
  const [isModalOpen, setModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(0);
  const [banner, setBanner] = useState("");
  const notifysuccess = () => toast.success(message);
  const notifyerror = () => toast.error(message);
  let ranonce = false;

  useEffect(() => {
    if (!ranonce) {
      if (status === 200) {
        notifysuccess();
        dispatch(resetStatus());
      }
      if (status === 400 || status === 500) {
        notifyerror();
        dispatch(resetStatus());
      }
      if (status === 408) {
        // notifyerror();
        dispatch(resetStatus());
      }
      dispatch(getBanner());
      ranonce = true;
    }
  }, [dispatch, status]);
  // console.log(status);
  interface bannerData {
    id: number;
    banner: string;
  }
  const handleClickDelete = (data: bannerData) => {
    dispatch(checkAuth());
    setModalOpen(true);
    setDeleteId(data.id);
    setBanner(data.banner);
  };

  const deleteItem = () => {
    dispatch(
      deleteBannerAction({
        id: deleteId,
        banner: banner,
      })
    );
    // console.log(deleteId, image);
  };
  // console.log(message);
  return (
    <main className='headerMain'>
      <SEO
        title='Admin - Banner '
        description='Daftar gambar Banner Dealer Toyota Deltamas Medan'
        name='Dealer Toyota Deltamas Medan Kota'
        link='https://toyotakotamedan.com/banner'
        type='article'
        keyword='toyota, deltamas,toyota delatamas, toyota delatamas medan, toyota delatamas medan kota, dealer medan kota, toyota medan, deltamas medan, toyota medan Kota, deltamas medan kota, toyota zenix, zenix, toyota alphard, alphard, toyota fortuner, fortuner, toyota veloz, veloz, toyota avanza, avanza, toyota rush, rush, toyota voxy, voxy, toyota altis, altis, toyota corolla, corolla, toyota innova, innova,toyota calya, calya,toyota sigra, sigra,toyota yaris, yaris, toyota raize, raize,banner'
      />
      <section className='vehiclePage'>
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        {loading ? (
          <div className='spinLoader'>
            <div className='loaderPage'></div>
          </div>
        ) : (
          <>
            <div className='headerVehicle'>
              <div className='headerTitle'>
                <h1>Banner</h1>
              </div>
            </div>
            <div className='vehicleList'>
              <div className='vehicleListContainer'>
                {/* <div> */}
                <table className='bannerTable adminTable'>
                  <thead>
                    <tr>
                      <th scope='col'></th>
                      <th scope='col'></th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataBanner &&
                      dataBanner.map((banner) => (
                        <>
                          <tr>
                            <td data-label='Banner' className='imageBanner'>
                              <div>
                                <img
                                  className='vehicleBanner'
                                  src={`${
                                    process.env.REACT_APP_LINK as string
                                  }${banner.banner_img}`}
                                  alt=''
                                />
                              </div>
                            </td>

                            <td data-label='Action' className='actionCell'>
                              <div className=''>
                                <div>
                                  <button
                                    className='edit btn'
                                    onClick={() =>
                                      navigate(`/bannForm`, {
                                        state: banner,
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
                                        id: banner.banner_id,
                                        banner: banner.banner_img,
                                      })
                                    }
                                  >
                                    hapus
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                          {isModalOpen && (
                            <ModalComponent
                              onClose={() => setModalOpen(false)}
                              onDelete={deleteItem}
                            >
                              <h2>Konfirmasi Hapus</h2>
                              <p>Apakah Anda yakin untuk menghapus?</p>
                            </ModalComponent>
                          )}
                        </>
                      ))}
                  </tbody>
                </table>
                {/* </div> */}
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
};

export default BannerScreen;
