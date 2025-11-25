import React from 'react'
import { useNavigate } from 'react-router-dom'
import { dummyCarData } from '../assets/assets.js'
import CarCard from './CarCard'

const FeaturedSection = () => {
  const navigate = useNavigate()

  return (
    <section className="px-6 md:px-16 lg:px-24 xl:px-32 py-12">
      {/* header with button */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">Featured cars</h2>
        <button
          onClick={() => navigate('/cars')}
          className="border border-borderColor px-4 sm:px-5 py-2 rounded-full text-gray-700 hover:bg-light transition-colors"
          aria-label="Explore cars"
        >
          Explore cars
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {dummyCarData.slice(0, 6).map((car) => (
          <div key={car._id}>
            <CarCard car={car} />
          </div>
        ))}
      </div>
    </section>
  )
}

export default FeaturedSection