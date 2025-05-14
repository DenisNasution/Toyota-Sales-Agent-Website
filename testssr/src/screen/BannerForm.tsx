import { ChangeEvent, FormEvent, useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";
import { useAppDispatch, useAppSelector } from "../app/store";
import { useLocation, useNavigate } from "react-router-dom";
import { updateBannerAction } from "../features/bannerActions";
import { resetStatus } from "../features/bannerSlice";
import { checkAuth } from "../features/userAction";
import SEO from "../component/SEO";

const BannerForm = () => {
  const [homeBanner, setHomeBanner] = useState<File | null>(null);
  const [banner_img, setBanner_img] = useState("");
  const [banner_id, setBanner_id] = useState("");
  const [loading, setLoading] = useState(false);
  const [warnText, setWarnText] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const { status, message } = useAppSelector((state) => state.banner);

  useEffect(() => {
    if (state) {
      setBanner_img(state.banner_img);
      setBanner_id(state.banner_id);
    }
    if (status === 200) {
      setLoading(false);
      navigate(`/banner`, {
        replace: true,
      });
    }
    if (status === 500) {
      setLoading(false);
      setWarnText(message);
      dispatch(resetStatus());
    }
  }, [status, navigate, dispatch, state, message]);
  // console.log(state);

  const handleBannerFile = (e: ChangeEvent<HTMLInputElement>) => {
    // const { files } = e.target;
    const selectedFiles = e.target.files as FileList;
    setHomeBanner(selectedFiles?.[0]);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    dispatch(checkAuth());
    const form = new FormData();
    if (homeBanner) {
      form.append("banner", homeBanner);
    }

    form.append("banner_img", banner_img);
    form.append("banner_id", banner_id);
    dispatch(updateBannerAction({ form }));
  };
  // console.log(typeof category);
  return (
    <main className='headerMain'>
      <SEO
        title='Admin - Form Banner'
        description='Form untuk merubah dan menambahkan Banner'
        name='Dealer Toyota Deltamas Medan Kota'
        link='https://toyotakotamedan.com/bannForm'
        type='form'
        keyword='form, banner, bannerForm, toyota, deltamas, dealer medan kota, toyota Medan, deltamas medan'
      />
      <section className='vehiclePage'>
        <div className='headerVehicle'>
          <div className='headerTitle'>
            <h1>Banner Beranda</h1>
          </div>
        </div>
        <div className='vehicleForm'>
          <div className='vehicleFormContainer formContainer'>
            {/* <div> */}
            <form action='' onSubmit={handleSubmit}>
              <div className='formInput formPict'>
                {warnText ? (
                  <div className='textWarnInput'>
                    <h5>{warnText}</h5>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className='formInput formPict'></div>
              <div className='formInput formPict'>
                <label htmlFor='menuPict'>Banner</label>
                <div className='menuPictContainer'>
                  <input
                    required
                    type='file'
                    id='menuPict'
                    name='bannerHome'
                    accept='.jpg,.png,.jpeg'
                    onChange={(e) => handleBannerFile(e)}
                  ></input>
                </div>
              </div>
              <div className='buttons'>
                <button type='submit' className='saveButton' disabled={loading}>
                  {loading && <div className='loader'></div>}
                  Simpan Banner
                </button>
              </div>
            </form>
            {/* </div> */}
          </div>
        </div>
      </section>
    </main>
  );
};

export default BannerForm;
