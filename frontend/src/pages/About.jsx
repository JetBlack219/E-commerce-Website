import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
      <Title text1={'ABOUT '} text2={'US'}/>
    </div>
    <div className="my-10 flex flex-col md:flex-row gap-16">
      <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
      <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
        <p className="">At Shibe, fashion meets personality. We’re more than just a clothing store — we’re a community that celebrates self-expression, style, and confidence. Every piece we offer is carefully selected to help you look good and feel even better.</p>
        <p className="">Founded with a love for fashion and a flair for trends, our shop brings you a curated mix of timeless staples and bold statements. Whether you're dressing up or keeping it casual, we've got something that fits your vibe.</p>
        <b className='text-gray-800'>Our Mission</b>
        <p>Our mission is to empower individuals through fashion by offering stylish, affordable, and high-quality clothing that inspires confidence and self-expression in every outfit.</p>
      </div>
    </div>

    <div className="text-xl py-4">
      <Title text1={'WHY '} text2={'CHOOSE US'}/>
    </div>

    <div className="flex flex-col md:flex-row text-sm mb-20">
      <div className="border-r px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
        <b>Quality Assurance:</b>
        <p className='text-gray-600'>We are committed to delivering the highest quality in every stitch. Each item in our collection goes through careful inspection to ensure it meets our standards for durability, comfort, and style—because you deserve nothing less than the best.</p>
      </div>
      <div className="border-r px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
        <b>Convenience:</b>
        <p className='text-gray-600'>Shopping with us is easy and hassle-free. From a smooth online experience to fast shipping and easy returns, we’re here to make fashion convenient and accessible—right at your fingertips.</p>
      </div>
      <div className="px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
        <b>Exceptional Customer Service:</b>
        <p className='text-gray-600'>We pride ourselves on providing exceptional customer service every step of the way. Our friendly and responsive team is always here to help—whether you have a question, need styling advice, or just want to share your feedback.</p>
      </div>
    </div>
    <NewsletterBox/>
    </div>
  )
}

export default About