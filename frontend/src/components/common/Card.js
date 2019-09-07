import React from 'react'

const Card = ({ title, image }) => {

  return(
    <div className="card">

      <div className="card-image">
        <figure className="image is-4by3">
          <img src={image} alt={title} />
        </figure>
      </div>


      <div className="card-content">
        <p className="title is-5">{title}</p>
      </div>
    </div>


  )
}

export default Card
