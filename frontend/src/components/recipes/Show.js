import React from 'react'
import axios from 'axios'

class ShowRecipe extends React.Component {

  constructor() {
    super()

    this.state = {}

  }


  componentDidMount() {
    axios
      .get(`api/recipes/${this.props.match.params.id}`)
      .then(res => {
        this.setState({ recipe: res.data })
      })
  }

  render() {

    if(!this.state.recipe) return null

    return(

      <section className="section">
        <div className="container ">
          <h1>{this.state.recipe.title}</h1>
          <img src={this.state.recipe.image}/>
        </div>
      </section>
    )
  }

}

export default ShowRecipe
