import { TEXT } from '@suspensive/test-utils'
import { render, screen, waitFor } from '@testing-library/react'
import ms from 'ms'
import { describe, expect, it } from 'vitest'
import { DelayMsPropShouldBeGreaterThanOrEqualTo0 } from './utils/assert'
import { Delay, withDelay } from '.'

describe('<Delay/>', () => {
  it('should render the children after the delay', async () => {
    render(<Delay ms={ms('0.1s')}>{TEXT}</Delay>)

    expect(screen.queryByText(TEXT)).not.toBeInTheDocument()
    await waitFor(() => expect(screen.queryByText(TEXT)).toBeInTheDocument())
  })
  it('should render the children directly if no ms prop', () => {
    render(<Delay>{TEXT}</Delay>)
    expect(screen.queryByText(TEXT)).toBeInTheDocument()
  })
  it('should accept 0 for ms prop', async () => {
    render(<Delay ms={0}>{TEXT}</Delay>)
    await waitFor(() => expect(screen.queryByText(TEXT)).toBeInTheDocument(), { timeout: 1000 })
  })
  it('should throw error if negative number is passed as ms prop', () => {
    expect(() => render(<Delay ms={-1}>{TEXT}</Delay>)).toThrow(DelayMsPropShouldBeGreaterThanOrEqualTo0)
  })
})

const TEXTAfterDelay100ms = withDelay(() => <>{TEXT}</>, { ms: ms('0.1s') })

describe('withDelay', () => {
  it('renders the children after the delay with component', async () => {
    render(<TEXTAfterDelay100ms />)
    expect(screen.queryByText(TEXT)).not.toBeInTheDocument()
    await waitFor(() => expect(screen.queryByText(TEXT)).toBeInTheDocument())
  })

  it('should set displayName based on Component.displayName', () => {
    const TestComponentWithDisplayName = () => <>{TEXT}</>
    TestComponentWithDisplayName.displayName = 'TestDisplayName'
    expect(withDelay(TestComponentWithDisplayName).displayName).toBe('withDelay(TestDisplayName)')
    expect(withDelay(() => <>{TEXT}</>).displayName).toBe('withDelay(Component)')
  })
})
