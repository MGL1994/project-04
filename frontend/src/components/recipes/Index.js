import React from 'react'
import { Link } from 'react-router-dom'
import Card from '../common/Card'
import axios from 'axios'

class RecipesIndex extends React.Component{

  constructor() {
    super()

    this.state = {
      recipes: []
    }
  }

  componentDidMount() {
    axios.get('/api/recipes')
      .then(res => {
        res.data.reverse()
        this.setState({ recipes: res.data })
      })
  }

  render() {
    return(
      <div className="columns is-multiline">
        {!this.state.recipes && <h2 className="title is-2">Loading...</h2>}
        {this.state.recipes.map(recipe =>
          <div key={recipe.id} className="column is-half-tablet is-one-quarter-desktop">
            <Link to={`/recipes/${recipe.id}`}>
              <Card {...recipe} />
            </Link>
          </div>
        )}

      </div>
    )
  }

}

export default RecipesIndex
