import { useState } from 'react'
import { compose } from 'recompose'

import Input from './input'

export const formFields = [
  {
    label: 'email',
    name: 'email',
    type: 'email',
    rules: { required: true, format: 'email' },
  },
  {
    label: 'password',
    name: 'password',
    type: 'password',
    rules: { required: true, minLength: 8 },
  },
]

const isInvalid = (errors) => Object.values(errors).some((err) => err.length > 0)

const Form = (props) => {
  const { errors, submitForm, validate } = props
  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSubmitAttempted(true)

    if (isInvalid(errors)) return

    submitForm()
  }

  return (
    <form onSubmit={handleSubmit} className={isSubmitAttempted ? 'validate' : ''}>
      {formFields.map((inputProps) =>
        <Input {...props} {...inputProps} key={inputProps.name} />
      )}
      <button type="submit">Log in</button>
    </form>
  )
}

export default compose()(Form)
