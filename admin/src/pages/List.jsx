import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from './../App';
import { toast } from 'react-toastify';

const List = ({token}) => {

  const [list, setList] = useState([])

  const fetchList = async() => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products || []);
      } else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
      setList([])
    }
  }

  const removeProduct = async(id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', {id}, {headers: {token}})

      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList();
      } else{
        toast.error(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <>
      <p className="mb-2">All Product List</p>
      <div className="flex flex-col gap-2 ">
        
        {/* Container */}
        <div className="bg-white shadow-md rounded-md overflow-hidden">

        {/* Table Header - Only for Medium and Up */}
        <div className="hidden md:grid grid-cols-[80px_1fr_1fr_1fr_80px] items-center py-2 px-4 border-b bg-gray-100 text-sm font-semibold text-gray-700">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-center">Action</span>
        </div>

        {/* Product List */}
        {list.map((item, index) => (
          <div
            key={index}
            className="border-b px-4 py-4 md:grid md:grid-cols-[80px_1fr_1fr_1fr_80px] md:gap-4 flex flex-col gap-2 text-sm transition hover:bg-gray-50"
          >
            {/* Image */}
            <div className="flex justify-start md:block">
              <img
                src={item.image?.[0] || 'https://via.placeholder.com/48'}
                alt={item.name}
                className="w-16 h-16 object-cover rounded-md border"
              />
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden flex flex-col gap-1">
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Name:</span>
                <span className="text-gray-800">{item.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Category:</span>
                <span className="capitalize">{item.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Price:</span>
                <span className="text-green-600 font-medium">
                  {currency}
                  {item.price}
                </span>
              </div>
            </div>

            {/* Desktop Columns */}
            <p className="hidden md:block truncate">{item.name}</p>
            <p className="hidden md:block capitalize">{item.category}</p>
            <p className="hidden md:block text-green-600 font-medium">
              {currency}
              {item.price}
            </p>

            {/* Action Button */}
            <div className="flex justify-end md:justify-center items-center">
              <button
                onClick={() => removeProduct(item._id)}
                className="text-red-500 hover:text-red-700 text-lg font-bold transition duration-150"
                title="Delete"
              >
                ×
              </button>
            </div>
          </div>
        ))}
        </div>
      </div>
    </>
  )
}

export default List