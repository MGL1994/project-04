import React from 'react'

class Home extends React.Component {
  constructor() {
    super()

    this.state = {}

  }


  render() {
    return (
      <section className="section">
        <div className="hero is-info is-large">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Cookbook
              </h1>
              <h2 className="subtitle">
                Upload recipes now!
              </h2>
            </div>
          </div>
        </div>
        <div className="hero is-warning is-medium">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Recipes
              </h1>
              <h2 className="subtitle">
                Look now
              </h2>
            </div>
          </div>
        </div>
        <div className="hero is-warning is-medium">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Add your own
              </h1>
              <h2 className="subtitle">
                Add now
              </h2>
            </div>
          </div>
        </div>
        <div className="hero is-warning is-medium">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Get lots of info
              </h1>
              <h2 className="subtitle">
                Sign up
              </h2>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Home
