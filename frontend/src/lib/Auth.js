import jwt from  'jsonwebtoken'

class Auth {
  static setToken(token) {
    localStorage.setItem('token', token)
  }

  static getToken() {
    return localStorage.getItem('token')
  }

  static removeToken() {
    localStorage.removeItem('token')
  }

  static getPayload() {
    return jwt.decode(this.getToken())
  }

  static isAuthenticated() {
    return !!this.getToken()
  }

  static currentUser() {
    const payload = this.getPayload()
    return payload.sub
  }
}

export default Auth
