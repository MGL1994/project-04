import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import Auth from '../../lib/Auth'
import cookBookLogo from '../../img/CookBook.png'

class Navbar extends React.Component {

  constructor() {
    super()

    this.state = {
      navbarOpen: false,
      dropdownOpen: false
    }

    this.logout = this.logout.bind(this)
    this.toggleNavbar = this.toggleNavbar.bind(this)
    this.toggleDropdown = this.toggleDropdown.bind(this)
  }

  logout() {
    Auth.removeToken()
    this.props.history.push('/')
  }

  toggleNavbar() {
    this.setState({ navbarOpen: !this.state.navbarOpen })
  }

  toggleDropdown() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen})
  }


  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        navbarOpen: false,
        dropdownOpen: false
      })
    }
  }

  render(){
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">
            <img src={cookBookLogo} alt="CookBook Logo"/>
          </Link>
        </div>

        <div className="navbar-end">
          <a
            role="button"
            className={`navbar-burger ${this.state.navbarOpen ? 'is-active' : ''}`}
            onClick={this.toggleNavbar}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>

        </div>


        <div className={`navbar-menu ${this.state.navbarOpen ? 'is-active' : ''}`}>
          <div className="navbar-start">

          </div>

          <div className="navbar-end">
            <Link to="/recipes" className="navbar-item has-text-weight-bold">Recipes</Link>
            {Auth.isAuthenticated() && <Link to="/recipes/new" className="navbar-item has-text-weight-bold">Add</Link>}
            {!Auth.isAuthenticated() && <div className="navbar-item"><Link to="/register" className="button is-primary is-rounded has-text-weight-bold">Register</Link></div>}
            {!Auth.isAuthenticated() && <div className="navbar-item"><Link to="/login" className="button is-danger is-rounded has-text-weight-bold">Login</Link></div>}
            {Auth.isAuthenticated() && <div className="navbar-item"><a className="button is-danger is-rounded has-text-weight-bold" onClick={this.logout}>Logout</a></div>}
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Navbar)
