import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateBookingData } from "../redux/CarSlice";
import { useParams } from "react-router-dom";

const BookingForm = () => {
  const cars = useSelector((state) => state.car.data);
  const { id } = useParams();
  const FilterCar = cars.filter((car) => car.id === +id);
  console.log(id, FilterCar);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    car: FilterCar,
    pickupCity: "",
    destinationCity: "",
    phoneNumber: "",
    passengers: 1,
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = {};
    if (formData.pickupCity.trim() === "") {
      validationErrors.pickupCity = "Pickup city is required";
    }
    if (formData.destinationCity.trim() === "") {
      validationErrors.destinationCity = "Destination city is required";
    }
    if (formData.phoneNumber.trim() === "") {
      validationErrors.phoneNumber = "Phone number is required";
    }

    if (Object.keys(validationErrors).length === 0) {
      // Form is valid, you can dispatch an action or submit the data
      dispatch(updateBookingData(formData));
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <form className="mt-5 booking-form max-w-md mx-auto p-4 bg-white rounded-lg shadow-md">
      <div className="mb-4 flex gap-4">
        <select
          name="tripType"
          id="tripType"
          value={formData.tripType}
          onChange={handleInputChange}
          className="w-full border p-2 rounded focus:outline-none "
        >
          <option value="outstation">Outstation</option>
          <option value="local-airport">Local/Airport</option>
        </select>

        <select
          name="tripMode"
          id="tripMode"
          value={formData.tripMode}
          onChange={handleInputChange}
          className="w-full border p-2 rounded focus:outline-none "
        >
          <option value="round-trip">Round Trip</option>
          <option value="one-way-trip">One-Way Trip</option>
        </select>
      </div>
      <div className="mb-4">
        <input
          type="text"
          name="pickupCity"
          id="pickupCity"
          value={formData.pickupCity}
          onChange={handleInputChange}
          className={`w-full border p-2 rounded focus:outline-none  ${
            errors.pickupCity ? "border-red-500" : ""
          }`}
          placeholder="Enter Pickup City"
        />
        {errors.pickupCity && (
          <p className="text-red-500 text-xs mt-1">{errors.pickupCity}</p>
        )}
      </div>
      <div className="mb-4">
        <input
          type="text"
          name="destinationCity"
          id="destinationCity"
          value={formData.destinationCity}
          onChange={handleInputChange}
          className={`w-full border p-2 rounded focus:outline-none  ${
            errors.destinationCity ? "border-red-500" : ""
          }`}
          placeholder="Enter Destination City"
        />
        {errors.destinationCity && (
          <p className="text-red-500 text-xs mt-1">{errors.destinationCity}</p>
        )}
      </div>
      <div className="mb-4">
        <input
          type="tel"
          name="phoneNumber"
          id="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          className={`w-full border p-2 rounded focus:outline-none  ${
            errors.phoneNumber ? "border-red-500" : ""
          }`}
          placeholder="Enter Phone Number"
        />
        {errors.phoneNumber && (
          <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>
        )}
      </div>
      <div className="mb-4">
        <input
          type="number"
          name="passengers"
          id="passengers"
          value={formData.passengers}
          onChange={handleInputChange}
          className="w-full border p-2 rounded focus:outline-none "
          placeholder="Number of Passengers:"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        onClick={handleSubmit}
      >
        Book Your Car
      </button>
    </form>
  );
};

export default BookingForm;
