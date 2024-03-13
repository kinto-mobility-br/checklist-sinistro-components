import React from 'react'
import { render } from '@testing-library/react'

import 'jest-canvas-mock'

import { SignatureCanvas } from '../src'

describe('Common render', () => {
  it('renders without crashing', () => {
    render(<SignatureCanvas />)
  })
})
