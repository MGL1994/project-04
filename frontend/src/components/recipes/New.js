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
      formData: {},
      errors: {},
      file: null,
      ingredients: [],
      steps: [],
      mealOptions: {},
      tagOptions: {},
      equipmentOptions: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleMultiChange = this.handleMultiChange.bind(this)
  }

  componentDidMount() {
    axios.get('/api/meals')
      .then(res => {
        res.data.reverse()
        this.setState({ mealOptions: res.data.map(option => {
          return {value: option.id, label: option.name}
        })})
      })
    axios.get('/api/equipment')
      .then(res => {
        res.data.reverse()
        this.setState({ equipmentOptions: res.data.map(option => {
          return {value: option.id, label: option.name}
        })})
      })
    axios.get('/api/tags')
      .then(res => {
        res.data.reverse()
        this.setState({ tagOptions: res.data.map(option => {
          return {value: option.id, label: option.name}
        })})
      })
  }

  handleSubmit(e) {
    e.preventDefault()

    const cleanedData = {
      ...this.state.formData,
      ingredients: this.state.ingredients,
      equipment: [parseInt(this.state.formData.equipment)],
      portions: parseInt(this.state.formData.portions),
      method: this.state.steps,
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

  handleIngredientChange(e, index) {
    this.state.ingredients[index] = e.target.value
    this.setState({ ingredients: this.state.ingredients })
  }

  handleStepChange(e, index) {
    this.state.steps[index] = e.target.value
    this.setState({ steps: this.state.steps })
  }

  addIngredient() {
    this.setState({ ingredients: [...this.state.ingredients, '']})
  }

  addStep() {
    this.setState({ steps: [...this.state.steps, '']})
  }

  handleRemoveIngredient(index) {
    this.state.ingredients.splice(index, 1)
    this.setState({ ingredients: this.state.ingredients })
  }

  handleRemoveStep(index) {
    this.state.steps.splice(index, 1)
    this.setState({ steps: this.state.steps })
  }

  render() {
    console.log(this.state.mealOptions)
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
                      this.state.ingredients.map((ingredient, index) => {
                        return (
                          <div key={index}>
                            <input
                              className="input"
                              name="ingredients"
                              placeholder="eg: 3 eggs"
                              onChange={(e) => this.handleIngredientChange(e, index)}
                              value={ingredient}
                            />
                            <button onClick={() => this.handleRemoveIngredient(index)}>Remove Ingredient</button>
                          </div>
                        )
                      })
                    }
                    <button onClick={(e) => this.addIngredient(e)}>Add Ingredient</button>
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
                      this.state.steps.map((step, index) => {
                        return (
                          <div key={index}>
                            <input
                              className="input"
                              name="method"
                              placeholder="eg: Whisk the eggs"
                              onChange={(e) => this.handleStepChange(e, index)}
                              value={step}
                            />
                            <button onClick={() => this.handleRemoveStep(index)}>Remove Step</button>
                          </div>
                        )
                      })
                    }
                    <button onClick={(e) => this.addStep(e)}>Add Step</button>
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
