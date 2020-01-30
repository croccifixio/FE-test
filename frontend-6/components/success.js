const Success = ({ user }) => (
  <div className="success">
    {user.name
      ? <h1>Welcome back, {user.name}!</h1>
      : <div className="token-text">
          <h1>🦄 This is some hidden text 🌈</h1>
          <p>You're token let's you see it!</p>
          <p>If this were a full blown application, it would give you access so much more.</p>
        </div>
    }
  </div>
)

export default Success
