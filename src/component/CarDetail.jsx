import React from "react";
import { useSelector } from "react-redux/es";
import { Link, useNavigate, useParams } from "react-router-dom";

const CarDetail = () => {
  const cars = useSelector((state) => state.car.data);
  const { id } = useParams();
  const navigate = useNavigate();
  const FilterCar = cars.filter((car) => car.id === +id);

  if (FilterCar.length === 0) {
    return <div>Car not found</div>;
  }

  const HandleClickEvent = (car) => {
    navigate(`/booking/${car.id}`);
  };

  const car = FilterCar[0];

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-semibold">{car.category} Car</h2>
      <div className="flex mt-3">
        <Link to="/" className="text-gray-950 font-semibold hover:underline">
          Home
        </Link>
        <span className="font-semibold text-gray-700">/{car.category}</span>
      </div>
      <img
        src={`${car.img}`}
        alt={car.category}
        className="w-full h-full object-cover rounded-md mt-4"
      />
      <div className="p-4 w-10/12 flex justify-between items-center mt-2">
        <div className="w-8/12">
          <p className="font-semibold">
            Car Type:{" "}
            <span className="font-bold text-grey-700">{car.type}</span>{" "}
          </p>
          <p className="font-semibold">
            Estimated Arrival Time: <span>{car.estimatedArrivalTime}</span>{" "}
          </p>
          <p className="font-semibold">Pickup Location: {car.pickupLocation}</p>
        </div>
        <div className="">
          <p className="font-semibold">
            Price: <span>${car.price}</span>
          </p>
          <p className="font-semibold">
            Drop-Off Location: {car.dropOffLocation}
          </p>
        </div>
      </div>
      <div className="w-10/12 text-center">
        <button
          onClick={HandleClickEvent}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mt-4 text-center"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default CarDetail;
