import React, { useState } from 'react'
import Title from '../components/Title'
import { assets, dummyCarData } from '../assets/assets.js'
import CarCard from '../components/CarCard'

const Cars = () => {

  const [input, setInput] = useState('')

  return (
    <div>
      <div className='flex flex-col items-center py-20 bg-light max-md:px-4'>
        <Title title='Available Cars' subTitle='Browse our selection of premium vehicles available for your next adventure'/>
      </div>
      
      <div className='flex justify-center px-4 mt-6'>
        <div className='flex items-center bg-white px-4 max-w-2xl w-full h-12 rounded-full shadow'>
          <img src={assets.search_icon} alt="" className='w-5 h-5 mr-2'/>
          <input 
            onChange={(e)=> setInput(e.target.value)} 
            value={input}  
            type="text" 
            placeholder='Search by make, model, or features' 
            className='w-full h-full outline-none text-gray-500'
          />
          <img src={assets.filter_icon} alt="" className='w-5 h-5 ml-2'/>
        </div>
      </div>

      <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-10'>
        <p className='text-gray-600 xl:px-20 max-w-7xl max-auto'>Showing {dummyCarData.length} cars</p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 xl:px-20 max-w-7xl mx-auto'>
          {dummyCarData.map((car)=> (
            <div key={car._id}>
              <CarCard car={car}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Cars