/* global describe it expect */
import React from 'react'
import Cities from './Cities'
import renderer from 'react-test-renderer'

describe('<Cities />', () => {
  it('renders empty when cities are not provided', () => {
    const tree = renderer
    .create(<Cities />)
    .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('renders cities when they are provided', () => {
    const cities = [
      { id: 'china', name: 'China' }
    ]
    const tree = renderer
    .create(<Cities cities={cities} />)
    .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
