import './index.css'

const PasswordItem = props => {
  const {list, deletePassword} = props
  const {id, websiteUrl, password, UserName, check} = list
  const initial = websiteUrl[0]
  const colors = [
    'amber',
    'blue',
    'orange',
    'emerald',
    'teal',
    'red',
    'light-blue',
  ]
  const checkPassword = !check ? (
    <img
      className="star"
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
    />
  ) : (
    <p>{password}</p>
  )

  const deletingPassword = () => {
    deletePassword(id)
  }

  return (
    <li>
      <div className="profile-container">
        <p>{initial}</p>
        <div>
          <p>{websiteUrl}</p>
          <p>{UserName}</p>
          {checkPassword}
        </div>
      </div>
      <button
        className="delete-button"
        type="button"
        data-testid="delete"
        onClick={deletingPassword}
      >
        {' '}
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
        />
      </button>
    </li>
  )
}
export default PasswordItem
