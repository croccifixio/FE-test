import { useEffect, useState } from 'react'
import { compose } from 'recompose'
import { useDebounce } from 'use-lodash-debounce'

import { titleCase } from '../utils'

const Input = ({ errors, name, rules, setValue: setValueAction, type, validate }) => {
  const [value, setValue] = useState('')
  const debouncedValue = useDebounce(value, 400)
  const isValid = errors[name] === ''

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  useEffect(
    () => {
      setValueAction(name, debouncedValue)
      validate(name, debouncedValue, rules)
    }, [debouncedValue]
  )

  return (
    <label>
      <div>{titleCase(name)}</div>
      <input
        className={!isValid ? 'invalid' : ''}
        name={name}
        onChange={handleChange}
        type={type}
        value={value}
      />
      <div className="error">{errors[name] || ''}</div>
    </label>

  )
}

export default compose()(Input)
