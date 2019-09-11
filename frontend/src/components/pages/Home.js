import React from 'react'
import IndexPreview from '../../images/IndexPreview.png'
import RecipePreview from '../../images/RecipePreview.png'
import NewRecipePreview from '../../images/NewRecipePreview.png'
import CommentsPreview from '../../images/CommentsPreview.png'
import { Link } from 'react-router-dom'
import Auth from '../../lib/Auth'

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
            <div className="column hero-column">
              <h1 className="title is-1">Share Your Gastronomic Masterpieces With The World</h1>
              <hr />
              <h2 className="subtitle is-3">At Cookbook we believe that all food is art, and it should be put on display. We hope you will join our food revolution and join a community of like-minded individuals who want make recipes accesible for everyone.
              </h2>
              {!Auth.isAuthenticated() &&<Link to="/register" className="button is-primary is-rounded is-large">Join Now</Link>}
            </div>
            <div className="column hero-column">
              <img src={IndexPreview} alt="Index Preview" />
            </div>
          </div>
        </div>

        <div className="container">
          <div className="box homepage">
            <div className="columns is-vcentered">
              <div className="column">
                <img src={RecipePreview} alt="Recipe Preview" />
              </div>
              <div className="column">
                <h3 className="title is-3">Get Cooking</h3>
                <hr />
                <h4 className="subtitle is-5">We make sure to display as much information as possible to make it easy to have a go yourself. Our third party API also includes nutritional information so you don&apos;t have to worry.
                </h4>
                <div id="edamam-badge" data-color="white"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="box homepage">
            <div className="columns is-vcentered">
              <div className="column">
                <h3 className="title is-3">Easy Uploading</h3>
                <hr />
                <h4 className="subtitle is-5">You don&apos;t need to be a wordsmith to contribute. Our easy uploading page means you can spend less time writing and more time creating new recipes.
                </h4>
              </div>
              <div className="column">
                <img src={NewRecipePreview} alt="NewRecipe Preview" />
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="box homepage">
            <div className="columns is-vcentered">
              <div className="column">
                <img src={CommentsPreview} alt="Comments Preview" />
              </div>
              <div className="column">
                <h3 className="title is-3">Give Feedback</h3>
                <hr />
                <h4 className="subtitle is-5">Let people know you are loving their content with our comments feature! It&apos;s always great to give positive feedback, so comment away!
                </h4>
              </div>
            </div>
          </div>
        </div>

      </section>
    )
  }
}

export default Home
