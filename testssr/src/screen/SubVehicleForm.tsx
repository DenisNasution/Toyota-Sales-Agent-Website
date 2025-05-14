import { FormEvent, useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";
import { useAppDispatch, useAppSelector } from "../app/store";
import { getVehicleIdAction } from "../features/vehicleActions";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  updateSubVehicleAction,
  uploadSubVehicleAction,
} from "../features/subVehicleActions";
import { resetStatus } from "../features/subVehicleSlice";
import { checkAuth } from "../features/userAction";
import SEO from "../component/SEO";

const SubVehicleForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { status, message } = useAppSelector((state) => state.subVehicle);
  const { dataVehicle } = useAppSelector((state) => state.vehicle);
  const [tipe, setTipe] = useState("");
  const [harga, setHarga] = useState("");
  const [carId, setCarId] = useState("");
  const [loading, setLoading] = useState(false);
  const [warnText, setWarnText] = useState("");
  const { id } = useParams();
  const { state } = useLocation();
  // console.log(status);
  // console.log(dataVehicle);
  useEffect(() => {
    if (state) {
      setTipe(state.subVehicle_name);
      setHarga(state.subVehicle_price);
    }
    if (id) {
      setCarId(id);
    }
    if (status === 200) {
      // console.log(status, message);
      setLoading(false);
      navigate(`/subVehicle/${id}`, { replace: true });
    }
    if (status === 500) {
      setLoading(false);
      setWarnText(message);
      dispatch(resetStatus());
    }

    dispatch(getVehicleIdAction(id as string));
  }, [dispatch, id, status, navigate, state, message]);
  // console.log(status);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    dispatch(checkAuth());
    if (state) {
      dispatch(
        updateSubVehicleAction({ id: state.subVehicle_id, tipe, harga, carId })
      );
    } else {
      dispatch(uploadSubVehicleAction({ tipe, harga, carId }));
    }
  };
  return (
    <>
      <SEO
        title='Admin - Form Tipe Kendaraan'
        description='Form untuk merubah dan menambahkan tipe kendaraan'
        name='Dealer Toyota Deltamas Medan Kota'
        link='https://toyotakotamedan.com/svhcForm/:id/vhc'
        type='form'
        keyword='toyota, deltamas,toyota delatamas, toyota delatamas medan, toyota delatamas medan kota, dealer medan kota, toyota medan, deltamas medan, toyota medan Kota, deltamas medan kota, toyota zenix, zenix, toyota alphard, alphard, toyota fortuner, fortuner, toyota veloz, veloz, toyota avanza, avanza, toyota rush, rush, toyota voxy, voxy, toyota altis, altis, toyota corolla, corolla, toyota innova, innova,toyota calya, calya,toyota sigra, sigra,toyota yaris, yaris, toyota raize, raize,vehicle, form, form admin tipe kendaraan toyota'
      />
      <main className='headerMain'>
        <section className='vehiclePage'>
          <div className='headerVehicle'>
            <div className='headerTitle'>
              <h1>{dataVehicle && dataVehicle[0].vehicle_name}</h1>
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
                <div className='formInput'>
                  <label htmlFor='menuName'>Tipe</label>
                  <input
                    required
                    type='text'
                    id='tipe'
                    name='tipe'
                    value={tipe}
                    onChange={(e) => setTipe(e.target.value)}
                  ></input>
                </div>
                <div className='formInput'>
                  <label htmlFor='menuName'>Harga</label>
                  <input
                    required
                    type='text'
                    id='harga'
                    name='harga'
                    value={harga}
                    onChange={(e) => setHarga(e.target.value)}
                  ></input>
                </div>
                <div className='formInput'>
                  <label htmlFor='carId'>Car</label>
                  <input
                    required
                    type='text'
                    id='carId'
                    name='carId'
                    value={dataVehicle && dataVehicle[0].vehicle_name}
                    onChange={(e) => setCarId(e.target.value)}
                    disabled={true}
                  ></input>
                  {/* <select
                  required
                  id='carId'
                  name='carId'
                  value={carId}
                  onChange={(e) => setCarId(e.target.value)}
                  disabled={true}
                >
                  {dataVehicle &&
                    dataVehicle.map((vehicle) => (
                      <option
                        key={vehicle.vehicle_id}
                        value={vehicle.vehicle_id}
                      >
                        {vehicle.vehicle_name}
                      </option>
                    ))}
                </select> */}
                </div>
                <div className='buttons'>
                  <button
                    type='submit'
                    className='saveButton'
                    disabled={loading}
                  >
                    {loading && <div className='loader'></div>}
                    Save Vehicle
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

export default SubVehicleForm;
