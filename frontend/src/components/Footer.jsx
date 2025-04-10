import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className="">
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
            <div className="">
                <img src={assets.logo} className='mg-5 w-12'/>
                <p className='w-full md:w-2/3 text-gray-600'>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Soluta, accusantium vitae quasi corporis ipsa fugiat in pariatur nisi nemo cupiditate esse. Quia nihil nobis asperiores, explicabo nam laborum ipsa ad?
                </p>
            </div>

            <div className="">
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                 <li className="">Home</li>
                 <li className="">About Us</li>
                 <li className="">Delivery</li>
                 <li className="">Privacy Policy</li>
                </ul>
            </div>

            <div className="">
                <p className='text-xl font-medium mb-5'>Get In Touch</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li className="">+1-212-456-7890</li>
                    <li className="">contact@gmail.com</li>
                </ul>
            </div>
        </div>

        <div className="">
            <hr/>
            <p className='py-5 text-sm text-center'>Copyright 2025 - All Right Reserved.</p>
        </div>

    </div>
  )
}

export default Footer