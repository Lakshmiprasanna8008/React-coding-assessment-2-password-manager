import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'
import PasswordItem from '../PasswordItem'

const initialPasswordList = []
class PasswordManager extends Component {
  state = {
    websiteUrl: '',
    userName: '',
    password: '',
    passwordList: initialPasswordList,
    inputString: '',
    check: true,
  }

  url = event => {
    this.setState({websiteUrl: event.target.value})
  }

  user = event => {
    this.setState({userName: event.target.value})
  }

  password = event => {
    this.setState({password: event.target.value})
  }

  search = event => {
    this.setState({inputString: event.target.value})
  }

  check = event => {
    this.setState(prevState => ({check: !prevState.check}))
  }

  deletePassword = id => {
    const {passwordList} = this.state
    const updatedPasswordList = passwordList.filter(each => id !== each.id)

    this.setState({
      passwordList: updatedPasswordList,
    })
  }

  addPassword = event => {
    const {websiteUrl, password, userName, passwordList} = this.state
    event.preventDefault()
    const newPassword = {
      id: uuidv4(),
      websiteUrl,
      password,
      userName,
    }
    if (websiteUrl !== '' && password !== '' && userName !== '') {
      this.setState(prevState => ({
        passwordList: [...prevState.passwordList, newPassword],
        websiteUrl: '',
        userName: '',
        password: '',
      }))
    }
  }

  render() {
    const {
      websiteUrl,
      password,
      userName,
      passwordList,
      inputString,
    } = this.state
    const filteredResult = passwordList.filter(each =>
      each.websiteUrl.toLowerCase().includes(inputString),
    )

    return (
      <div className="whole-container">
        <img
          className="app-logo"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="password-creation-container">
          <img
            className="password-manager"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
          />
          <div className="details-container">
            <h1>Add New Password</h1>
            <form className="form" onSubmit={this.addPassword}>
              <div className="input-container">
                <img
                  className="input-img"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                />
                <input
                  onChange={this.url}
                  type="text"
                  placeholder="Enter Website"
                  className="input-text"
                />
              </div>
              <br />
              <div className="input-container">
                <img
                  className="input-img"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                />
                <input
                  onChange={this.user}
                  type="text"
                  placeholder="Enter Username"
                  className="input-text"
                />
              </div>
              <br />
              <div className="input-container">
                <img
                  className="input-img"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                />
                <input
                  onChange={this.password}
                  type="password"
                  placeholder="Enter Password"
                  className="input-text"
                />
              </div>
              <br />
              <div className="button-container">
                <button type="submit" className="add-button">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="passwords-container">
          <div className="passwords-header">
            <div className="password-header-container-one">
              {' '}
              <h1>Your Passwords</h1>
              <button type="button" className="count-button">
                <p>{passwordList.length}</p>
              </button>
            </div>
            <div className="search-container">
              <img
                className="search-img"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
              />
              <input
                value={inputString}
                type="search"
                placeholder="search"
                onChange={this.search}
              />
            </div>
          </div>
          <hr />
          <div className="checkbox-container">
            <input
              id="showPassword"
              type="checkbox"
              className="checkbox"
              onChange={this.check}
            />
            <label htmlFor="showPassword">Show Passwords</label>
          </div>
          {passwordList.length === 0 ? (
            <div className="no-password-container">
              <img
                className="no-password-img"
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
              />
              <p className="no-password-text">No Passwords</p>
            </div>
          ) : (
            <div>
              <ul>
                {filteredResult.map(each => (
                  <PasswordItem
                    list={each}
                    deletePassword={this.deletePassword}
                    key={each.id}
                    check={this.check}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  }
}
export default PasswordManager
