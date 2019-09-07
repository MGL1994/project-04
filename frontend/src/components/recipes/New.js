import React from 'react'
import axios from 'axios'
import ReactFilestack from 'filestack-react'

import Auth from '../../lib/Auth'
import { FILESTACKAPIKEY } from '../../../.ENV'

const options = {
  accept: 'image/*',
  options: {
    resize: {
      width: 100
    }
  },
  transformations: {
    crop: true,
    circle: true,
    rotate: true
  }
}

class New extends React.Component {

  constructor() {
    super()
    this.state = {
      formData: {},
      errors: {},
      file: null
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()

    const cleanedData = {
      ...this.state.formData,
      ingredients: this.state.formData.ingredients.split(','),
      equipment: [parseInt(this.state.formData.equipment)],
      portions: parseInt(this.state.formData.portions),
      method: this.state.formData.method.split(', '),
      meal: parseInt(this.state.formData.meal),
      tags: [parseInt(this.state.formData.tags)]
    }

    console.log(cleanedData)

    axios.post('/api/recipes/', cleanedData, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/recipes'))
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ formData, errors })
  }

  handleUploadImages(result) {
    const formData = {...this.state.formData, image: result.filesUploaded[0].url}
    this.setState({ formData })
  }

  render() {
    console.log(this.state.formData)
    return (

      <section className="hero is-light">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">

              <h1 className="title"> New Recipe </h1>
              <p className="subtitle">What did you make?</p>
              <div className="box is-light">
                <form onSubmit={this.handleSubmit}>
                  <div className="field">
                    <label className="label">Title</label>
                    <input
                      className="input"
                      name="title"
                      placeholder="eg: Macaroni Cheese"
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="field">
                    <label className="label">Image</label>
                    <ReactFilestack
                      mode="transform"
                      apikey={FILESTACKAPIKEY}
                      buttonText="Upload Photo"
                      buttonClass="button"
                      className="upload-image"
                      options={options}
                      onSuccess={(result) => this.handleUploadImages(result)}
                      preload={true}
                    />
                    {this.state.formData.image && <img src={this.state.formData.image} />}
                  </div>

                  <div className="field">
                    <label className="label">Ingredients</label>
                    <input
                      className="input"
                      name="ingredients"
                      placeholder="eg: 3 eggs, 4 slices of bread"
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="field">
                    <label className="label">Equipment</label>
                    <input
                      className="input"
                      name="equipment"
                      placeholder="eg: Whisk, Frying Pan"
                      onChange={this.handleChange}
                    />

                  </div>

                  <div className="field">
                    <label className="label">Prep Time</label>
                    <input
                      className="input"
                      name="prep_time"
                      placeholder="eg: 00:05:00"
                      onChange={this.handleChange}
                    />

                  </div>

                  <div className="field">
                    <label className="label">Cook Time</label>
                    <input
                      className="input"
                      name="cook_time"
                      placeholder="eg: 00:15:00"
                      onChange={this.handleChange}
                    />

                  </div>

                  <div className="field">
                    <label className="label">Portions</label>
                    <input
                      className="input"
                      name="portions"
                      placeholder="eg: 2"
                      onChange={this.handleChange}
                    />

                  </div>

                  <div className="field">
                    <label className="label">Method</label>
                    <input
                      className="input"
                      name="method"
                      placeholder="Scramble the eggs, toast the bread"
                      onChange={this.handleChange}
                    />

                  </div>

                  <div className="field">
                    <label className="label">Meal</label>
                    <input
                      className="input"
                      data-type="int"
                      name="meal"
                      placeholder="eg: Breakfast"
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="field">
                    <label className="label">Tags</label>
                    <input
                      className="input"
                      name="tags"
                      placeholder="eg: Healthy"
                      onChange={this.handleChange}
                    />
                  </div>

                  <button className="submit">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>

      </section>

    )
  }
}

export default New
