import React from 'react'
import { BASE_URL_ASSET } from '../../constant'

const ProductCard = ({ name, image, shortDecription, mrp, price }) => {
  return (
    <div className='cs-card-wrapper'>
      {/* Image */}
      <div>
        <img className='cs-w-max'
          src={BASE_URL_ASSET + "/" + image}></img>
      </div>

      {/* Name */}
      <div className='cs-cat-name'>
        {name}
      </div>

      {/* Brief */}
      <div>
        {shortDecription}
      </div>

      <div className='cs-dis-flex cs-fw-700'>
        <div>
          <span>Rs:</span>
          <span className='cs-mrp'> {mrp} </span>
        </div>

        <div className='cs-lm-5'>
          {price}
        </div>
      </div>

    </div>
  )
}

export default ProductCard