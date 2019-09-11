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

class Edit extends React.Component {

  constructor() {
    super()
    this.state = {
      error: '',
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
      equipment: this.state.formData.equipment.map(equipment => equipment.id),
      tags: this.state.formData.tags.map(tag => tag.id),
      user: this.state.formData.user.id,
      meal: this.state.formData.meal.id
    }
    console.log(cleanedData)

    axios.put(`/api/recipes/${this.props.match.params.id}/`, cleanedData, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push(`/recipes/${this.props.match.params.id}`))
      .catch(() => this.setState({ error: 'This field cannot be empty' }))
  }

  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData, error: '' })
  }

  handleSelectChange(selectedOption, data) {
    const formData = { ...this.state.formData, [data.name]: { id: selectedOption.value, name: selectedOption.label } }
    this.setState({ formData, error: '' })
  }

  handleMultiChange(selectedOptions, data) {
    const options = selectedOptions.map(option => {
      return { id: option.value, name: option.label }
    })
    const formData = { ...this.state.formData, [data.name]: options}
    this.setState({ formData, error: '' })
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

    this.setState({ formData, error: '' })
  }

  handleDynamicStepChange(e, index) {
    const method = [
      ...this.state.formData.method.slice(0, index),
      e.target.value,
      ...this.state.formData.method.slice(index + 1)
    ]

    const formData = { ...this.state.formData, method }

    this.setState({ formData, error: '' })
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
    axios.get(`/api/recipes/${this.props.match.params.id}`)
      .then(res => this.setState({ formData: res.data }))
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
    if(!this.state.formData) return null
    const selectedEquipment = (this.state.formData.equipment || []).map(equipment => ({ label: equipment.name, value: equipment.id }))
    const selectedTags = (this.state.formData.tags || []).map(tag => ({ label: tag.name, value: tag.id }))

    return (
      <section className="hero is-light">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">

              <h1 className="title"> Edit Recipe </h1>
              <p className="subtitle">What changed?</p>
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

                  {this.state.error && <small className="help is-danger">{this.state.error}</small>}

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

                  {this.state.error && <small className="help is-danger">{this.state.error}</small>}

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
                              value={ingredient || ''}
                            />
                            <button className="button is-danger" onClick={() => this.handleRemoveIngredient(index)}>Delete</button>
                          </div>
                        )
                      })
                    }
                    <button className="button is-primary is-rounded is-small" onClick={(e) => this.addIngredient(e)}>Add Ingredient</button>
                  </div>

                  {this.state.error && <small className="help is-danger">{this.state.error}</small>}

                  <div className="field">
                    <label className="label">Equipment</label>
                    <Select
                      isMulti
                      name="equipment"
                      options={this.state.equipmentOptions}
                      value={selectedEquipment}
                      onChange={this.handleMultiChange}
                    />
                  </div>

                  {this.state.error && <small className="help is-danger">{this.state.error}</small>}

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

                  {this.state.error && <small className="help is-danger">{this.state.error}</small>}

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

                  {this.state.error && <small className="help is-danger">{this.state.error}</small>}

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

                  {this.state.error && <small className="help is-danger">{this.state.error}</small>}

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
                              value={step || ''}
                            />
                            <button className="button is-danger" onClick={() => this.handleRemoveStep(index)}>Delete</button>
                          </div>
                        )
                      })
                    }
                    <button className="button is-primary is-rounded is-small" onClick={(e) => this.addStep(e)}>Add Step</button>
                  </div>

                  {this.state.error && <small className="help is-danger">{this.state.error}</small>}

                  <div className="field">
                    <label className="label">Meal</label>
                    <Select
                      name="meal"
                      options={this.state.mealOptions}
                      value={this.state.mealOptions.find(option => option.value === this.state.formData.meal.id)}
                      onChange={this.handleSelectChange}
                    />
                  </div>

                  {this.state.error && <small className="help is-danger">{this.state.error}</small>}

                  <div className="field">
                    <label className="label">Tags</label>
                    <Select
                      isMulti
                      name="tags"
                      options={this.state.tagOptions}
                      value={selectedTags}
                      onChange={this.handleMultiChange}
                    />
                  </div>

                  {this.state.error && <small className="help is-danger">{this.state.error}</small>}

                  <button className="submit button is-primary is-rounded is-large">Submit</button>
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
