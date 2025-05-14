import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LayoutComponent from "./component/LayoutComponent";
import HomeScreen from "./screen/HomeScreen";
import PriceListScreen from "./screen/PriceListScreen";
import TestimoniScreen from "./screen/TestimoniScreen";
import VehicleScreen from "./screen/VehicleScreen";
import SubVehicleScreen from "./screen/SubVehicleScreen";
import BannerScreen from "./screen/BannerScreen";
import VehicleForm from "./screen/VehicleForm";
import SubVehicleForm from "./screen/SubVehicleForm";
import BannerForm from "./screen/BannerForm";
import TestimoniListScreen from "./screen/TestimoniListScreen";
import TestimoniForm from "./screen/TestimoniForm";
import NotFound from "./screen/NotFound";
import LoginScreen from "./screen/LoginScreen";
import RequireAuth from "./screen/RequireAuth";
import TestAuth from "./screen/TestAuth";
import RegisterScreen from "./screen/RegisterScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginScreen />}></Route>
        <Route path='/register' element={<RegisterScreen />}></Route>
        <Route path='/' element={<LayoutComponent />}>
          <Route path='*' element={<NotFound />}></Route>
          <Route path='/' element={<HomeScreen />} />
          <Route path='/price/:id' element={<PriceListScreen />} />
          <Route path='/testimoni' element={<TestimoniScreen />} />
          <Route element={<RequireAuth />}>
            <Route path='/vehicle' element={<VehicleScreen />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path='/subvehicle/:id' element={<SubVehicleScreen />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path='/banner' element={<BannerScreen />} />
          </Route>
          {/* <Route element={<RequireAuth />}>
            <Route path='/testimoniList' element={<TestimoniListScreen />} />
          </Route> */}
          <Route element={<RequireAuth />}>
            <Route path='/vhcForm' element={<VehicleForm />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path='/svhcForm/:id/vhc' element={<SubVehicleForm />} />
          </Route>
          <Route element={<RequireAuth />}>
            <Route path='/bannForm' element={<BannerForm />} />
          </Route>
          {/* <Route element={<RequireAuth />}>
            <Route path='/testimoniForm' element={<TestimoniForm />} />
          </Route> */}
          <Route path='/test' element={<TestAuth />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
