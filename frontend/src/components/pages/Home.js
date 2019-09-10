import React from 'react'
import IndexPreview from '../../images/IndexPreview.png'
import RecipePreview from '../../images/RecipePreview.png'
import NewRecipePreview from '../../images/NewRecipePreview.png'

class Home extends React.Component {
  constructor() {
    super()

    this.state = {}

  }


  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns is-vcentered">
            <div className="column">
              <h1 className="title is-1">Share Your Gastronomic Masterpieces With The World</h1>
              <h2 className="subtitle is-3">At Cookbook we believe that all food is art, and it should be put on display. We hope you will join our food revolution and join a community of like-minded individuals who want make recipes accesible for everyone.
              </h2>
              <a className="button is-primary is-rounded is-large">Join Now</a>
            </div>
            <div className="column">
              <img src={IndexPreview} alt="Index Preview" />
            </div>
          </div>
        </div>

        <div className="container">
          <div className="box">
            <div className="columns is-vcentered">
              <div className="column">
                <img src={RecipePreview} alt="Recipe Preview" />
              </div>
              <div className="column">
                <h3 className="title is-3">Get Cooking</h3>
                <hr />
                <h4 className="subtitle is-5">We make sure to display as much information as possible to make it easy to have a go yourself. Our third party API also includes nutritional information so you don't have to worry.
                </h4>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="box">
            <div className="columns is-vcentered">
              <div className="column">
                <h3 className="title is-3">Easy Uploading</h3>
                <hr />
                <h4 className="subtitle is-5">You don't need to be a wordsmith to contribute. Our easy uploading page means you can spend less time writing and more time creating new recipes.
                </h4>
              </div>
              <div className="column">
                <img src={NewRecipePreview} alt="NewRecipe Preview" />
              </div>
            </div>
          </div>
        </div>

      </section>
    )
  }
}

export default Home
