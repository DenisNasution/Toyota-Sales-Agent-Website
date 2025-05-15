import { ChangeEvent, FormEvent, useEffect, useState } from "react";
// import { Helmet } from "react-helmet-async";
import { useAppDispatch, useAppSelector } from "../app/store";
import { useLocation, useNavigate } from "react-router-dom";
import {
  updateTestimoniAction,
  uploadTestimoniAction,
} from "../features/testimoniActions";
import { resetStatus } from "../features/testimoniSlice";
import { checkAuth } from "../features/userAction";
import SEO from "../component/SEO";

const TestimoniForm = () => {
  const [testimoniImage, setTestimoniImage] = useState<File>();
  const [testimoni, setTestimoni] = useState("");
  // const [testimoniImgOld, setTestimoniImgOld] = useState("");
  const [loading, setLoading] = useState(false);
  const [warnText, setWarnText] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const { status, message } = useAppSelector((state) => state.testimoni);
  // console.log(state);
  useEffect(() => {
    if (state) {
      // setTestimoniImgOld(state.testimoni_img);
      setTestimoni(state.testimoni_text);
    }
    if (status === 200) {
      setLoading(false);
      navigate(`/testimoniList`, {
        replace: true,
      });
    }
    if (status === 500) {
      setLoading(false);
      setWarnText(message);
      dispatch(resetStatus());
    }
  }, [status, navigate, dispatch, state, message]);
  console.log(status, message);

  const handleTestimoniFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files as FileList;
    setTestimoniImage(selectedFiles?.[0]);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    dispatch(checkAuth());
    const form = new FormData();
    form.append("testimoni_text", testimoni);
    if (testimoniImage) {
      form.append("imgTes", testimoniImage);
    }
    if (state) {
      form.append("testimoni_img", state.testimoni_img);
      form.append("testimoni_id", state.testimoni_id);
      dispatch(updateTestimoniAction({ form }));
    } else {
      dispatch(uploadTestimoniAction({ form }));
    }
  };
  // console.log(typeof category);
  return (
    <>
      <SEO
        title='Admin - Form Testimoni'
        description='Form untuk merubah dan menambahkan Testimoni Customer'
        name='Dealer Toyota Deltamas Medan Kota'
        link='https://toyotakotamedan.com/testimoniForm'
        type='form'
        keyword='toyota, deltamas,toyota delatamas, toyota delatamas medan, toyota delatamas medan kota, dealer medan kota, toyota medan, deltamas medan, toyota medan Kota, deltamas medan kota, toyota zenix, zenix, toyota alphard, alphard, toyota fortuner, fortuner, toyota veloz, veloz, toyota avanza, avanza, toyota rush, rush, toyota voxy, voxy, toyota altis, altis, toyota corolla, corolla, toyota innova, innova,toyota calya, calya,toyota sigra, sigra,toyota yaris, yaris, toyota raize, raize,vehicle, form, form admin testimoni'
      />
      <main className='headerMain'>
        <section className='vehiclePage'>
          <div className='headerVehicle'>
            <div className='headerTitle'>
              <h1>Testimoni</h1>
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
                  <label htmlFor='menuPict'>Testimoni Image</label>
                  <div className='menuPictContainer'>
                    <input
                      required={!state}
                      type='file'
                      id='menuPict'
                      name='testimoniImage'
                      accept='.jpg,.png,.jpeg'
                      onChange={(e) => handleTestimoniFile(e)}
                    ></input>
                  </div>
                </div>
                <div className='formInput'>
                  <label htmlFor='testimoni'>Testimoni text</label>
                  <input
                    required
                    type='text'
                    id='testimoni'
                    name='testimoni'
                    value={testimoni}
                    onChange={(e) => setTestimoni(e.target.value)}
                  ></input>
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

export default TestimoniForm;
