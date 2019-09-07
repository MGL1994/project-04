import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Auth from '../../lib/Auth'


class ShowRecipe extends React.Component {

  constructor() {
    super()

    this.state = {}

    this.handleDelete = this.handleDelete.bind(this)

  }


  componentDidMount() {
    axios
      .get(`api/recipes/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ recipe: res.data })
      })
  }

  handleDelete(e) {
    e.preventDefault()

    axios.delete(`/api/recipes/${this.props.match.params.id}`, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/recipes/'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  render() {

    if(!this.state.recipe) return null

    return(

      <section className="section">
        <div className="container ">
          <h1>{this.state.recipe.title}</h1>
          <img src={this.state.recipe.image}/>
          <h2>{this.state.recipe.user}</h2>
          {Auth.currentUser() === this.state.recipe.user && <div className="buttons">
            <Link className="edit" to={`/recipes/${this.state.recipe.id}/edit`}>Edit</Link>
            <Link className="erase" onClick={this.handleDelete}>Delete</Link>
          </div>}
        </div>
      </section>
    )
  }

}

export default ShowRecipe
