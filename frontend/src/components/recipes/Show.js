import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Auth from '../../lib/Auth'
import Comment from '../common/Comment'


class ShowRecipe extends React.Component {

  constructor() {
    super()

    this.state = {
      ingredients: [],
      formData: {
        content: ''
      },
      ingredientsTab: true,
      methodTab: false
    }

    this.handleDelete = this.handleDelete.bind(this)
    this.handleDeleteComment = this.handleDeleteComment.bind(this)
    this.handleChangeContent = this.handleChangeContent.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleIngredientsTab = this.handleIngredientsTab.bind(this)
    this.handleMethodTab = this.handleMethodTab.bind(this)

  }


  componentDidMount() {
    axios
      .get(`api/recipes/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ recipe: res.data })
      })
  }

  handleIngredientsTab(e) {
    e.target.parentElement.classList.add('is-active')
    e.target.parentElement.nextElementSibling.classList.remove('is-active')
    this.setState({
      ingredientsTab: true,
      methodTab: false
    })
  }

  handleMethodTab(e) {
    e.target.parentElement.classList.add('is-active')
    e.target.parentElement.previousElementSibling.classList.remove('is-active')
    this.setState({
      ingredientsTab: false,
      methodTab: true
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
    const commentId = +e.target.id
    axios.delete(`/api/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => {
        const index = this.state.recipe.comments.findIndex(comment => comment.id === commentId)
        const comments = [
          ...this.state.recipe.comments.slice(0, index),
          ...this.state.recipe.comments.slice(index+1)
        ]
        const recipe = { ...this.state.recipe, comments }
        this.setState({ recipe })
      })
  }

  render() {
    if(!this.state.recipe) return null
    console.log(this.state.recipe)
    return(

      <section className="section">
        <div className="container ">
          <div className="columns">
            <div className="column">
              <img src={this.state.recipe.image}/>
              <hr />
              <p className="has-text-weight-bold">Tags:</p>
              <div className="tags">
                {this.state.recipe.tags.map(tags => <span key={tags.id} className="tag is-info">{tags.name}</span>)}
              </div>
              <hr />
              <p><span className="has-text-weight-bold">Posted: </span>{this.state.recipe.created.split('-').reverse().join('-')} | <span className="has-text-weight-bold">By: </span>{this.state.recipe.user.username}</p>
              <hr />
              {Auth.currentUser() === this.state.recipe.user.id && <div className="buttons">
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
                    <p className="subtitle">{this.state.recipe.prep_time.slice(3)} hrs</p>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Cook Time</p>
                    <p className="subtitle">{this.state.recipe.cook_time.slice(3)} hrs</p>
                  </div>
                </div>
              </nav>

              <hr />

              <nav className="level">
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Equipment</p>
                    <div className="tags are-medium">
                      {this.state.recipe.equipment.map(equipment => <span key={equipment.id} className="tag is-info">{equipment.name}</span>)}
                    </div>
                  </div>
                </div>
              </nav>
              <hr />
              <div className="columns">
                <div className="column">
                  <div className="tags has-addons">
                    <span className="tag is-dark">Calories</span>
                    <span className="tag">{this.state.recipe.calories} | {Math.round((this.state.recipe.calories / 2000) * 100)}%</span>
                  </div>
                  <div className="tags has-addons">
                    <span className="tag is-dark">Protein</span>
                    <span className="tag">{this.state.recipe.protein}g | {Math.round((this.state.recipe.fat / 50) * 100)}%</span>
                  </div>
                </div>
                <div className="column">
                  <div className="tags has-addons">
                    <span className="tag is-dark">Carbs</span>
                    <span className="tag">{this.state.recipe.carbs}g | {Math.round((this.state.recipe.carbs/ 260) * 100)}%</span>
                  </div>
                  <div className="tags has-addons">
                    <span className="tag is-dark">Fibre</span>
                    <span className="tag">{this.state.recipe.fibre}g | {Math.round((this.state.recipe.fibre / 30) * 100)}%</span>
                  </div>
                </div>
                <div className="column">
                  <div className="tags has-addons">
                    <span className="tag is-dark">Salt</span>
                    <span className={'tag ' + ((this.state.recipe.salt / 1000) < 0.3 ? 'has-background-success' : (this.state.recipe.salt / 1000) < 1.5 ? 'has-background-warning' : 'has-background-danger has-text-white')}>{(this.state.recipe.salt / 1000).toFixed(2)}g | {Math.round(((this.state.recipe.salt / 1000) / 6) * 100)}%</span>
                  </div>
                  <div className="tags has-addons">
                    <span className="tag is-dark">Fat</span>
                    <span className={'tag ' + (this.state.recipe.fat < 3 ? 'has-background-success' : this.state.recipe.fat < 17.5 ? 'has-background-warning' : 'has-background-danger has-text-white')}>{this.state.recipe.fat}g | {Math.round((this.state.recipe.fat / 70) * 100)}%</span>
                  </div>
                </div>
                <div className="column">
                  <div className="tags has-addons">
                    <span className="tag is-dark">Saturates</span>
                    <span className={'tag ' + (this.state.recipe.saturates < 1.5 ? 'has-background-success' : this.state.recipe.saturates < 5 ? 'has-background-warning' : 'has-background-danger has-text-white')}>{this.state.recipe.saturates}g | {Math.round((this.state.recipe.saturates / 20) * 100)}%</span>
                  </div>
                  <div className="tags has-addons">
                    <span className="tag is-dark">Sugars</span>
                    <span className={'tag ' + (this.state.recipe.saturates < 5 ? 'has-background-success' : this.state.recipe.saturates < 22.5 ? 'has-background-warning' : 'has-background-danger has-text-white')}>{this.state.recipe.sugars}g | {Math.round((this.state.recipe.sugars / 90) * 100)}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="tabs is-toggle is-toggle-rounded is-centered">
          <ul>
            <li className="is-active" onClick={this.handleIngredientsTab}>
              <a>Ingredients</a>
            </li>
            <li onClick={this.handleMethodTab}>
              <a>Method</a>
            </li>
          </ul>
        </div>

        {this.state.ingredientsTab && <div className="container has-text-centered">
          <h2 className="subtitle">Ingredients</h2>
          {this.state.recipe.ingredients.map(ingredient =>
            <p key={this.state.recipe.ingredients.indexOf(ingredient)}>{ingredient}</p>)
          }
        </div>}

        {this.state.methodTab && <div className="container has-text-centered">
          <h2 className="subtitle">Method</h2>
          {this.state.recipe.method.map(step =>
            <p key={this.state.recipe.method.indexOf(step)}><span className="subtitle is-4"><br />Step {this.state.recipe.method.indexOf(step) + 1}:<br /></span> {step}</p>)
          }
        </div>}

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
            <button className="button is-rounded is-primary">Submit</button>
          </form>}
          <hr />
          <h2 className="subtitle">Comments</h2>
          {this.state.recipe.comments.map(comment =>
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
