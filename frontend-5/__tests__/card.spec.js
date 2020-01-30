import * as React from 'react'
import { shallow } from 'enzyme'

import Card from '../components/card'

describe('<Card />', () => {
  it('should render its props correctly', () => {
    const card = shallow(
      <Card
        capital='Brussels'
        continent='Europe'
        languages={['Dutch', 'French', 'German']}
        name={'Belgium'}
        tlds={['.be']}
      />
    )

    expect(card.find('.title').text()).toBe('Belgium')
    expect(card.find('.subtitle').text()).toBe('Brussels')
    expect(card.find('.tag').text()).toBe('Europe')
    expect(card.find('.language').at(0).text()).toBe('Dutch')
    expect(card.find('.language').at(1).text()).toBe('French')
    expect(card.find('.language').at(2).text()).toBe('German')
    expect(card.find('.tld').text()).toBe('.be')
  })
})
