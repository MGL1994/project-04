import React from 'react'

class Home extends React.Component {
  constructor() {
    super()

    this.state = {}

  }


  render() {
    return (
      <section className="hero is-info is-large">
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
      </section>
    )
  }
}

export default Home
