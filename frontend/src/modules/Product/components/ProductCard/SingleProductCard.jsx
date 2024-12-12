import Bulb from '@/assets/images/bulb.png'
import { Link } from 'react-router-dom'
import { calculateDiscount } from '@/helpers/helpers.js'
import Rating from '@/assets/icons/Rating.jsx'
import React from 'react'
import Img from '@/components/Img.jsx'

const SingleProductCard = ({
  images,
  title,
  price,
  isNew,
  discount,
  rating,
  className,
  url,
  showRating = false,
  _id,
}) => {
  const discountedPrice = discount ? calculateDiscount(price, discount) : price
  return (
    <Link to={`/shop/${_id}`} className={`flex flex-col ${className ?? ''}`}>
      <div className={`w-full h-full max-w-[262px] max-h-[349px] relative`}>
        {/*<img src={images?.[0] || Bulb} alt={title} className="h-full" />*/}
        <Img src={images?.[0] || Bulb} alt={title} className='h-full' />
        {isNew ? (
          <div className='w-[70px] absolute top-5 left-5 font-semibold uppercase text-[14px] bg-white rounded-sm shadow-md px-4 py-[1px]'>
            New
          </div>
        ) : null}
        {discount ? (
          <div
            className={`w-[70px] flex justify-center font-inter bg-[#38CB89] text-white absolute ${isNew ? 'top-12' : 'top-5'} left-5 font-semibold uppercase text-[14px] rounded-sm shadow-md px-4 py-[1px]`}
          >
            {`-${discount}%`}
          </div>
        ) : null}
      </div>
      {showRating ? (
        <div className='mt-[16px]'>
          <Rating />
        </div>
      ) : null}
      {title && (
        <p className='text-[16px] font-semibold text-left font-inter'>
          {title}
        </p>
      )}
      <div className='flex w-fit gap-2 justify-center'>
        {price && (
          <p className='text-[14px] font-inter font-semibold text-left'>
            ${discountedPrice}
          </p>
        )}
        {/*If discount is there in the product then show original price here, otherwise show the price above*/}
        {discount && (
          <p className='text-[14px] font-inter font-light text-left'>
            ${price}
          </p>
        )}
      </div>
    </Link>
  )
}

export default SingleProductCard
