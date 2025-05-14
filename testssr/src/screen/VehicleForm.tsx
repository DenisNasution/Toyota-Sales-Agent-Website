import { ChangeEvent, FormEvent, useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";
import { useAppDispatch, useAppSelector } from "../app/store";
import {
  getCategoryAction,
  updateVehicleAction,
  uploadVehicleAction,
} from "../features/vehicleActions";
import { useLocation, useNavigate } from "react-router-dom";
import { resetStatus } from "../features/vehicleSlice";
import { checkAuth } from "../features/userAction";
import SEO from "../component/SEO";

const VehicleForm = () => {
  const [carBanner, setCarBanner] = useState<File>();
  const [carImage, setCarImage] = useState<File | null>(null);
  const [carName, setCarName] = useState("");
  const [category, setCategory] = useState("");
  const [vehicle_banner, setVehicle_banner] = useState("");
  const [vehicle_img, setVehicle_img] = useState("");
  const [loading, setLoading] = useState(false);
  const [warnText, setWarnText] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const {
    status,
    message,
    category: carCategory,
  } = useAppSelector((state) => state.vehicle);
  // console.log(state);
  useEffect(() => {
    dispatch(getCategoryAction());
    if (state) {
      setVehicle_banner(state.vehicle_banner);
      setVehicle_img(state.vehicle_img);
      setCategory(state.vehicle_idCategory);
      setCarName(state.vehicle_name);
    }
    if (status === 200) {
      setLoading(false);
      navigate(`/vehicle`, {
        replace: true,
      });
    }
    if (status === 500) {
      setLoading(false);
      setWarnText(message);
      dispatch(resetStatus());
    }
  }, [status, navigate, dispatch, state, message]);
  console.log(status);

  const handleImageFile = (e: ChangeEvent<HTMLInputElement>) => {
    // const { files } = e.target;
    const selectedFiles = e.target.files as FileList;
    setCarImage(selectedFiles?.[0]);
  };
  const handleBannerFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files as FileList;
    setCarBanner(selectedFiles?.[0]);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    dispatch(checkAuth());
    const form = new FormData();
    form.append("vehicle_name", carName);
    form.append("vehicle_idCategory", category);
    if (carBanner) {
      form.append("banner", carBanner);
    }
    if (carImage) {
      form.append("image", carImage);
    }
    if (state) {
      form.append("vehicle_img", vehicle_img);
      form.append("vehicle_banner", vehicle_banner);
      dispatch(updateVehicleAction({ form, id: state.vehicle_id }));
    } else {
      dispatch(uploadVehicleAction(form));
    }
  };
  // console.log(typeof category);
  return (
    <>
      <SEO
        title='Admin - Form Kendaraan'
        description='Form untuk merubah dan menambahkan kendaraan'
        name='Dealer Toyota Deltamas Medan Kota'
        link='https://toyotakotamedan.com/vhcForm'
        type='form'
        keyword='toyota, deltamas,toyota delatamas, toyota delatamas medan, toyota delatamas medan kota, dealer medan kota, toyota medan, deltamas medan, toyota medan Kota, deltamas medan kota, toyota zenix, zenix, toyota alphard, alphard, toyota fortuner, fortuner, toyota veloz, veloz, toyota avanza, avanza, toyota rush, rush, toyota voxy, voxy, toyota altis, altis, toyota corolla, corolla, toyota innova, innova,toyota calya, calya,toyota sigra, sigra,toyota yaris, yaris, toyota raize, raize,vehicle, form, form admin kendaraan toyota'
      />
      <main className='headerMain'>
        <section className='vehiclePage'>
          <div className='headerVehicle'>
            <div className='headerTitle'>
              <h1>Kendaraan</h1>
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
                <div className='formInput formPict'>
                  <label htmlFor='menuPict'>Banner</label>
                  <div className='menuPictContainer'>
                    <input
                      required={!state}
                      type='file'
                      id='menuPict'
                      name='carBanner'
                      accept='.jpg,.png,.jpeg'
                      onChange={(e) => handleBannerFile(e)}
                    ></input>
                  </div>
                </div>
                <div className='formInput formPict'>
                  <label htmlFor='menuPict'>Gambar Kendaraan</label>
                  <div className='menuPictContainer'>
                    <input
                      required={!state}
                      type='file'
                      id='menuPict'
                      name='carImage'
                      accept='.jpg,.png,.jpeg'
                      onChange={(e) => handleImageFile(e)}
                    ></input>
                  </div>
                </div>
                <div className='formInput'>
                  <label htmlFor='carName'>Nama Kendaraan</label>
                  <input
                    required
                    type='text'
                    id='carName'
                    name='carName'
                    value={carName}
                    onChange={(e) => setCarName(e.target.value)}
                  ></input>
                </div>
                <div className='formInput'>
                  <label htmlFor='carCategory'>Kategori</label>
                  <select
                    required
                    id='carCategory'
                    name='carCategory'
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value=''>--Pilih Kategori--</option>
                    {carCategory &&
                      carCategory.map((category) => (
                        <option value={category.category_id}>
                          {category.category_name}
                        </option>
                      ))}
                  </select>
                </div>
                <div className='buttons'>
                  <button type='submit' className='saveButton'>
                    {loading && <div className='loader'></div>}
                    Simpan Kendaraan
                  </button>
                </div>
              </form>
              {/* </div> */}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default VehicleForm;
