import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Auth from '../../lib/Auth'
import NutritionCard from '../common/NutritionCard'
import Comment from '../common/Comment'


class ShowRecipe extends React.Component {

  constructor() {
    super()

    this.state = {
      ingredients: [],
      comments: [],
      formData: {
        content: ''
      }
    }

    this.handleDelete = this.handleDelete.bind(this)
    this.handleDeleteComment = this.handleDeleteComment.bind(this)
    this.handleChangeContent = this.handleChangeContent.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }


  componentDidMount() {
    axios
      .get(`api/recipes/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ recipe: res.data })
      })
    axios
      .get(`api/comments/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ comments: res.data })
      })
  }

  handleChangeContent(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/comments/', {...this.state.formData, user: Auth.currentUser(), recipe: this.props.match.params.id },
      {
        headers: { Authorization: `Bearer ${Auth.getToken()}` }
      })
      .then(res => this.setState({ recipe: res.data, formData: { content: '' } }))
  }

  handleDelete(e) {
    e.preventDefault()

    axios.delete(`/api/recipes/${this.props.match.params.id}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/recipes/'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  handleDeleteComment(e) {
    e.preventDefault()
    console.log(e.target.id)
    axios.delete(`/api/comments/detail/${e.target.id}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(res => {
        this.setState({ recipe: res.data })
      })
  }

  render() {
    console.log(this.state)
    if(!this.state.recipe) return null
    return(

      <section className="section">
        <div className="container ">
          <div className="columns">
            <div className="column">
              <img src={this.state.recipe.image}/>
              <hr />
              <p><span className="has-text-weight-bold">Tags: </span>{this.state.recipe.tags}</p>
              <hr />
              <p><span className="has-text-weight-bold">Posted: </span>{this.state.recipe.created} | <span className="has-text-weight-bold">By: </span>{this.state.recipe.user}</p>
              <hr />
              {Auth.currentUser() === this.state.recipe.user && <div className="buttons">
                <Link className="button" to={`/recipes/${this.state.recipe.id}/edit`}>Edit</Link>
                <Link className="button" onClick={this.handleDelete}>Delete</Link>
              </div>}
            </div>
            <div className="column">
              <h1 className="title has-text-centered">{this.state.recipe.title}</h1>

              <hr/>

              <nav className="level">
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Serves</p>
                    <p className="subtitle">{this.state.recipe.portions}</p>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Prep Time</p>
                    <p className="subtitle">{this.state.recipe.prep_time}</p>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Cook Time</p>
                    <p className="subtitle">{this.state.recipe.cook_time}</p>
                  </div>
                </div>
              </nav>

              <hr />

              <nav className="level">
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Equipment</p>
                    <p className="subtitle">{this.state.recipe.equipment}</p>
                  </div>
                </div>
              </nav>

              <hr />

              <div className="columns has-text-centered">
                <div className="column">
                  <div className="card">
                    <div className="card-content">
                      <p>Calories</p>
                    </div>
                    <div className="card-content">
                      <p>{this.state.recipe.calories}</p>
                    </div>
                    <hr />
                    <div className="card-content">
                      <p>25%</p>
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="card">
                    <div className="card-content">
                      <p>Fat</p>
                    </div>
                    <div className="card-content">
                      <p>{this.state.recipe.fat}g</p>
                    </div>
                    <hr />
                    <div className="card-content">
                      <p>25%</p>
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="card">
                    <div className="card-content">
                      <p>Saturates</p>
                    </div>
                    <div className="card-content">
                      <p>{this.state.recipe.saturates}g</p>
                    </div>
                    <hr />
                    <div className="card-content">
                      <p>25%</p>
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="card">
                    <div className="card-content">
                      <p>Sugars</p>
                    </div>
                    <div className="card-content">
                      <p>{this.state.recipe.sugars}g</p>
                    </div>
                    <hr />
                    <div className="card-content">
                      <p>25%</p>
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="card">
                    <div className="card-content">
                      <p>Salt</p>
                    </div>
                    <div className="card-content">
                      <p>{this.state.recipe.salt}g</p>
                    </div>
                    <hr />
                    <div className="card-content">
                      <p>25%</p>
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="card">
                    <div className="card-content">
                      <p>Protein</p>
                    </div>
                    <div className="card-content">
                      <p>{this.state.recipe.protein}g</p>
                    </div>
                    <hr />
                    <div className="card-content">
                      <p>25%</p>
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="card">
                    <div className="card-content">
                      <p>Carbs</p>
                    </div>
                    <div className="card-content">
                      <p>{this.state.recipe.carbs}g</p>
                    </div>
                    <hr />
                    <div className="card-content">
                      <p>25%</p>
                    </div>
                  </div>
                </div>
                <div className="column">
                  <div className="card">
                    <div className="card-content">
                      <p>Fibre</p>
                    </div>
                    <div className="card-content">
                      <p>{this.state.recipe.fibre}g</p>
                    </div>
                    <hr />
                    <div className="card-content">
                      <p>25%</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <hr />
        <div className="container">
          <div className="columns">
            <div className="column">
              <h2 className="subtitle">Ingredients</h2>
              {this.state.recipe.ingredients.map(ingredient =>
                <p key={this.state.recipe.ingredients.indexOf(ingredient)}>{this.state.recipe.ingredients.indexOf(ingredient) + 1}. {ingredient}</p>)
              }
            </div>
            <div className="column">
              <h2 className="subtitle">Method</h2>
              {this.state.recipe.method.map(step =>
                <p key={this.state.recipe.method.indexOf(step)}>{this.state.recipe.method.indexOf(step) + 1}. {step}</p>)
              }
            </div>
          </div>
        </div>
        <hr />
        <div className="container">
          {Auth.isAuthenticated() && <form onSubmit={this.handleSubmit}>
            <div className="field">
              <textarea
                name="content"
                className="textarea"
                placeholder="Add a comment..."
                onChange={this.handleChangeContent}
                value={this.state.formData.content}
              />
            </div>
            <button className="button">Submit</button>
          </form>}
          <hr />
          <h2 className="subtitle">Comments</h2>
          {!this.state.comments && <h2 className="title is-2">Loading...</h2>}
          {this.state.comments.map(comment =>
            <Comment
              key={comment.id}
              {...comment}
              handleDeleteComment={this.handleDeleteComment} />
          )}
        </div>
      </section>
    )
  }
}

export default ShowRecipe
