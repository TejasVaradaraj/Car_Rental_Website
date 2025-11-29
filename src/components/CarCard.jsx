import React from 'react'
import { assets } from '../assets/assets.js'
import { useNavigate } from 'react-router-dom'

const CarCard = ({ car }) => {
  const currency = import.meta.env.VITE_CURRENCY || '$'
  const isAvailable = car.isAvailable ?? car.isAvaliable
  const navigate = useNavigate()

  return (
    <div onClick={()=> {navigate(`/car-details/${car._id}`); scrollTo(0,0)}} className="group rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-white">
      {/* Image with fixed aspect ratio to prevent stretching */}
      <div className="relative">
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className="w-full aspect-[16/9] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        {isAvailable && (
          <span className="absolute top-3 left-3 bg-primary text-white text-[11px] px-2 py-0.5 rounded-full">
            Available
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        {/* Title + price per day in the white box */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{car.brand} {car.model}</h3>
            <p className="text-sm text-gray-500">{car.category} • {car.year}</p>
          </div>
          <div className="text-right">
            <div className="text-base font-semibold text-gray-900">
              {currency}{car.pricePerDay}
            </div>
            <div className="text-xs text-gray-500">/ day</div>
          </div>
        </div>

        {/* Specs */}
        <div className="mt-4 grid grid-cols-2 gap-y-2 text-gray-600">
          <div className="flex items-center text-sm">
            <img src={assets.users_icon} alt="Seats" className="h-4 w-4 mr-2" />
            <span>{car.seating_capacity} Seats</span>
          </div>
          <div className="flex items-center text-sm">
            <img src={assets.fuel_icon} alt="Fuel" className="h-4 w-4 mr-2" />
            <span>{car.fuel_type}</span>
          </div>
          <div className="flex items-center text-sm">
            <img src={assets.car_icon} alt="Transmission" className="h-4 w-4 mr-2" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center text-sm">
            <img src={assets.location_icon} alt="Location" className="h-4 w-4 mr-2" />
            <span>{car.location}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarCard