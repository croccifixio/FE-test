import React from 'react'
import { compose } from 'recompose'

import Form from './form'
import Success from './success'

const Page = (props) => {
  const { user } = props

  return (
    <div className="wrapper">
      {user
        ? <Success {...props} />
        : <div>
            <h1>Create an account</h1>
            <Form {...props} />
          </div>
      }
    </div>
  )
}

export default compose()(Page)
