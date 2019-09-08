import React from 'react'

const NutritionCard = ({ key, content }) => {

  return(
    <div className="card">
      <div className="card-content">
        <p className="title is-5">Calories</p>
      </div>
      <div className="card-content">
        <p className="title is-5">{this.state.recipe.calories}</p>
      </div>
      <hr />
      <div className="card-content">
        <p className="title is-5">25%</p>
      </div>
    </div>


  )
}

export default NutritionCard
