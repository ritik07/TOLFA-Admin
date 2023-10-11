import React from 'react'
import { BASE_URL_ASSET } from '../../constant'

const Card = ({ name, image, shortDecription }) => {
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

    </div>
  )
}

export default Card