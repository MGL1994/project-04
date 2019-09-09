import React from 'react'
import axios from 'axios'
import ReactFilestack from 'filestack-react'
import Select from 'react-select'

import Auth from '../../lib/Auth'

const equipmentOptions = [
  { value: 1, label: 'Whisk' },
  { value: 2, label: 'Frying Pan' }
]

const mealOptions = [
  { value: 1, label: 'Breakfast' },
  { value: 2, label: 'Lunch' },
  { value: 3, label: 'Dinner' },
  { value: 4, label: 'Dessert' },
  { value: 5, label: 'Snack' }
]

const tagsOptions = [
  { value: 1, label: 'Healthy' },
  { value: 2, label: 'Vegetarian' }
]

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

class Edit extends React.Component {

  constructor() {
    super()
    this.state = {
      errors: {},
      file: null,
      ingredients: [],
      steps: []
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
    this.handleMultiChange = this.handleMultiChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()

    const cleanedData = {
      title: this.state.formData.title,
      image: this.state.formData.image,
      ingredients: this.state.formData.ingredients,
      equipment: this.state.formData.equipment.map(equipment => equipment.value),
      prep_time: this.state.formData.prep_time,
      cook_time: this.state.formData.cook_time,
      portions: this.state.formData.portions,
      method: this.state.formData.method,
      meal: this.state.formData.meal,
      tags: this.state.formData.tags
    }

    axios.put(`/api/recipes/${this.props.match.params.id}/`, cleanedData, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push(`/recipes/${this.props.match.params.id}`))
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
      ...this.state.ingredients.slice(0, index),
      e.target.value,
      ...this.state.ingredients.slice(index + 1)
    ]

    this.setState({ ingredients })
  }

  handleDynamicStepChange(e, index) {
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

  componentDidMount() {
    axios.get(`/api/recipes/${this.props.match.params.id}`)
      .then(res => this.setState({ formData: res.data }))
      // .then(this.setState({ ingredients: this.state.formData.ingredients }))
  }

  render() {
    if(!this.state.formData) return null
    const selectedEquipment = (this.state.formData.equipment || []).map(equipment => ({ label: equipment.name, value: equipment.id }))
    const selectedTags = (this.state.formData.tags || []).map(tag => ({ label: tag.name, value: tag.id }))

    return (
      <section className="hero is-light">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">

              <h1 className="title"> Edit Recipe </h1>
              <p className="subtitle">What did you make?</p>
              <div className="box is-light">
                <form onSubmit={this.handleSubmit}>
                  <div className="field">
                    <label className="label">Title</label>
                    <input
                      className="input"
                      name="title"
                      placeholder="eg: Macaroni Cheese"
                      value={this.state.formData.title || ''}
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
                          <div key={index}>
                            <input
                              className="input"
                              name="ingredients"
                              placeholder="eg: 3 eggs"
                              onChange={(e) => this.handleDynamicIngredientChange(e, index)}
                              value={ingredient || ''}
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
                      options={equipmentOptions}
                      value={selectedEquipment}
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
                      value={this.state.formData.prep_time || ''}
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
                      value={this.state.formData.cook_time || ''}
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
                      value={this.state.formData.portions || ''}
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
                              onChange={(e) => this.handleDynamicStepChange(e, index)}
                              value={this.state.formData.method || ''}
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
                      options={mealOptions}
                      value={mealOptions.find(option => option.value === this.state.formData.meal)}
                      onChange={this.handleSelectChange}
                    />
                  </div>

                  <div className="field">
                    <label className="label">Tags</label>
                    <Select
                      isMulti
                      name="tags"
                      options={tagsOptions}
                      value={selectedTags}
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

export default Edit
