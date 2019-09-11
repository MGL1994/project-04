import React from 'react'
import axios from 'axios'
import ReactFilestack from 'filestack-react'
import Select from 'react-select'

import Auth from '../../lib/Auth'

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
      formData: {
        ingredients: [],
        method: []
      },
      errors: {},
      file: null,
      mealOptions: [],
      tagOptions: [],
      equipmentOptions: []
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleMultiChange = this.handleMultiChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()

    const cleanedData = {
      ...this.state.formData,
      ingredients: this.state.formData.ingredients,
      equipment: [parseInt(this.state.formData.equipment)],
      portions: parseInt(this.state.formData.portions),
      method: this.state.formData.method,
      meal: parseInt(this.state.formData.meal),
      tags: [parseInt(this.state.formData.tags)],
      user: parseInt(Auth.currentUser()),
      created: new Date().getFullYear() + '-' + new Date().getMonth() + '-' + new Date().getDate()
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

  handleSelectChange(selectedOption, data) {
    const formData = { ...this.state.formData, [data.name]: selectedOption.value }
    this.setState({ formData })
  }

  handleMultiChange(selectedOptions, data) {
    const options = selectedOptions.map(selectedOption => selectedOption.value)
    const formData = { ...this.state.formData, [data.name]: options}
    this.setState({ formData })
  }

  handleUploadImages(result) {
    const formData = {...this.state.formData, image: result.filesUploaded[0].url}
    this.setState({ formData })
  }

  handleDynamicIngredientChange(e, index) {
    const ingredients = [
      ...this.state.formData.ingredients.slice(0, index),
      e.target.value,
      ...this.state.formData.ingredients.slice(index + 1)
    ]

    const formData = { ...this.state.formData, ingredients }

    this.setState({ formData })
  }

  handleDynamicStepChange(e, index) {
    const method = [
      ...this.state.formData.method.slice(0, index),
      e.target.value,
      ...this.state.formData.method.slice(index + 1)
    ]

    const formData = { ...this.state.formData, method }

    this.setState({ formData })
  }

  addIngredient() {
    const ingredients = [...this.state.formData.ingredients, '']
    const formData = { ...this.state.formData, ingredients }
    this.setState({ formData })
  }

  addStep() {
    const method = [...this.state.formData.method, '']
    const formData = { ...this.state.formData, method }
    this.setState({ formData })
  }

  handleRemoveIngredient(index) {
    const ingredients = [
      ...this.state.formData.ingredients.slice(0, index),
      ...this.state.formData.ingredients.slice(index + 1)
    ]
    const formData = { ...this.state.formData, ingredients }
    this.setState({ formData })
  }

  handleRemoveStep(index) {
    const method = [
      ...this.state.formData.method.slice(0, index),
      ...this.state.formData.method.slice(index + 1)
    ]
    const formData = { ...this.state.formData, method }
    this.setState({ formData })
  }

  componentDidMount() {
    this.setState()
    axios.get('/api/meals')
      .then(res => {
        res.data
        this.setState({ mealOptions: res.data.map(option => {
          return {value: option.id, label: option.name}
        })})
      })
    axios.get('/api/equipment')
      .then(res => {
        res.data
        this.setState({ equipmentOptions: res.data.map(option => {
          return {value: option.id, label: option.name}
        })})
      })
    axios.get('/api/tags')
      .then(res => {
        res.data
        this.setState({ tagOptions: res.data.map(option => {
          return {value: option.id, label: option.name}
        })})
      })
  }

  render() {
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
                      apikey={process.env.REACT_APP_API_KEY}
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
                    {
                      this.state.formData.ingredients.map((ingredient, index) => {
                        return (
                          <div key={index} className="multiline-container">
                            <input
                              className="input multiline"
                              name="ingredients"
                              placeholder="eg: 3 eggs"
                              onChange={(e) => this.handleDynamicIngredientChange(e, index)}
                              value={ingredient}
                            />
                            <button className="button is-danger" onClick={() => this.handleRemoveIngredient(index)}>Delete</button>
                          </div>
                        )
                      })
                    }
                    <button className="button is-primary is-rounded is-small" onClick={(e) => this.addIngredient(e)}>Add Ingredient</button>
                  </div>

                  <div className="field">
                    <label className="label">Equipment</label>
                    <Select
                      isMulti
                      name="equipment"
                      options={this.state.equipmentOptions}
                      onChange={this.handleMultiChange}
                    />
                  </div>

                  <div className="field">
                    <label className="label">Prep Time</label>
                    <input
                      className="input"
                      type="time"
                      name="prep_time"
                      placeholder="eg: 00:05:00"
                      onChange={this.handleChange}
                    />

                  </div>

                  <div className="field">
                    <label className="label">Cook Time</label>
                    <input
                      className="input"
                      type="time"
                      name="cook_time"
                      placeholder="eg: 00:15:00"
                      onChange={this.handleChange}
                    />

                  </div>

                  <div className="field">
                    <label className="label">Portions</label>
                    <input
                      className="input"
                      type="number"
                      name="portions"
                      placeholder="eg: 2"
                      onChange={this.handleChange}
                    />

                  </div>

                  <div className="field">
                    <label className="label">Method</label>
                    {
                      this.state.formData.method.map((step, index) => {
                        return (
                          <div key={index} className="multiline-container">
                            <input
                              className="input multiline"
                              name="method"
                              placeholder="eg: Whisk the eggs"
                              onChange={(e) => this.handleDynamicStepChange(e, index)}
                              value={step}
                            />
                            <button className="button is-danger" onClick={() => this.handleRemoveStep(index)}>Delete</button>
                          </div>
                        )
                      })
                    }
                    <button className="button is-primary is-rounded is-small" onClick={(e) => this.addStep(e)}>Add Step</button>
                  </div>

                  <div className="field">
                    <label className="label">Meal</label>
                    <Select
                      name="meal"
                      options={this.state.mealOptions}
                      onChange={this.handleSelectChange}
                    />
                  </div>

                  <div className="field">
                    <label className="label">Tags</label>
                    <Select
                      isMulti
                      name="tags"
                      options={this.state.tagOptions}
                      onChange={this.handleMultiChange}
                    />
                  </div>

                  <button className="submit button is-primary is-large is-rounded">Submit</button>
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
