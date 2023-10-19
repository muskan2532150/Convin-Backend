import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CarThunk } from "./redux/CarSlice";
import Navbar from "./component/Navbar";
import BookingForm from "./component/BookingForm";
import HomePage from "./component/HomePage";
import CarDetail from "./component/CarDetail";

function App() {
  const store = useSelector((state) => state.car.data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (store.length === 0) {
      dispatch(CarThunk());
    }
  });

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/car/:id" element={<CarDetail />} />
        <Route path="/booking/:id" element={<BookingForm />} />
      </Routes>
    </>
  );
}

export default App;
