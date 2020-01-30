const Success = ({ user }) => (
  <div className="success">
    <h1>Great news, {user.name}! You're account has been created.</h1>
    <p>Please verify you're account by clicking the activation link we sent to your email at <b>{user.email}</b></p>
  </div>
)

export default Success
