import { render, screen } from '@testing-library/react'
import { createElement } from 'react'
import { describe, expect, expectTypeOf, it } from 'vitest'
import { ErrorBoundary } from '../ErrorBoundary'
import { AssertionError } from '../models/AssertionError'

describe('AssertionError.assert', () => {
  it('should make assertion if condition is boolean', () => {
    const isRandomlyTrue = Math.random() > 0.5
    expectTypeOf(isRandomlyTrue).toEqualTypeOf<boolean>()
    try {
      AssertionError.assert(isRandomlyTrue, 'isRandomlyTrue should be true')
      expectTypeOf(isRandomlyTrue).toEqualTypeOf<true>()
      expect(isRandomlyTrue).toBe(true)
    } catch (error) {
      expect(error).toBeInstanceOf(AssertionError)
    }
  })
  it('should make assertion if condition is right', () => {
    const isAlwaysTrue = Math.random() > 0
    expectTypeOf(isAlwaysTrue).toEqualTypeOf<boolean>()
    AssertionError.assert(isAlwaysTrue, 'isAlwaysTrue should be true')
    expectTypeOf(isAlwaysTrue).toEqualTypeOf<true>()
    expect(isAlwaysTrue).toBe(true)
  })
  it('should throw AssertionError if condition is not right', () => {
    try {
      AssertionError.assert(Math.random() > 2, 'Math.random() should be greater than 2')
    } catch (error) {
      expect(error).toBeInstanceOf(AssertionError)
    }
  })

  type ParamKey = 'paramKey1' | 'paramKey2'
  const useParams = <TParamKey extends string>(resultParam?: Partial<Record<TParamKey, string>>) =>
    ({
      ...resultParam,
    }) as Record<TParamKey, string | null>
  it('should assert condition in TypeScript, JavaScript (assertion blocked case)', () => {
    render(
      <ErrorBoundary shouldCatch={AssertionError} fallback={({ error }) => <>{error.message}</>}>
        {createElement(() => {
          const params = useParams<ParamKey>()
          expectTypeOf(params.paramKey1).toEqualTypeOf<string | null>()
          AssertionError.assert(typeof params.paramKey1 === 'string', 'params.id must be string')
          expect(typeof params.paramKey1).toBe('string')
          expectTypeOf(params.paramKey1).toEqualTypeOf<string>()
          return <>Try reaching: {params.paramKey1}</>
        })}
      </ErrorBoundary>
    )
    expect(screen.getByText('params.id must be string')).toBeInTheDocument()
  })

  it('should assert condition in TypeScript, JavaScript (assertion passed case)', () => {
    const virtualId = 'virtual-id'
    render(
      <ErrorBoundary shouldCatch={AssertionError} fallback={({ error }) => <>{error.message}</>}>
        {createElement(() => {
          const params = useParams<ParamKey>({ paramKey1: virtualId })
          expectTypeOf(params.paramKey1).toEqualTypeOf<string | null>()
          AssertionError.assert(typeof params.paramKey1 === 'string', 'params.id must be string')
          expect(typeof params.paramKey1).toBe('string')
          expectTypeOf(params.paramKey1).toEqualTypeOf<string>()
          return <>Try reaching: {params.paramKey1}</>
        })}
      </ErrorBoundary>
    )
    expect(screen.getByText(`Try reaching: ${virtualId}`)).toBeInTheDocument()
  })
})
