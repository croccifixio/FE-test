import React from 'react'
import { compose } from 'recompose'

import Form from './form'
import Success from './success'

class Page extends React.Component {
  componentDidMount() {
    const { checkForJWTToken } = this.props

    checkForJWTToken()
  }

  render() {
    const { user } = this.props

    return (
      <div className="wrapper">
        {user.token
          ? <Success {...this.props} />
          : <div>
              <h1>Login</h1>
              <Form {...this.props} />
            </div>
        }
      </div>
    )
  }
}

export default compose()(Page)
