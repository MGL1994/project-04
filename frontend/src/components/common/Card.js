import React from 'react'

const Card = ({ title, image }) => {

  return(
    <div className="card">
      <div className="card-image">
        <figure className="image is-square">
          <img src={image} alt={title} />
        </figure>
      </div>
    </div>


  )
}

export default Card
