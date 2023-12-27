import { AsyncBoundary } from '@suspensive/react'
import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { type ComponentPropsWithoutRef, type ComponentRef, forwardRef } from 'react'

const BaseQueryAsyncBoundary = forwardRef<
  ComponentRef<typeof AsyncBoundary>,
  ComponentPropsWithoutRef<typeof AsyncBoundary>
>(({ onReset, ...props }, resetRef) => {
  const { reset } = useQueryErrorResetBoundary()
  return (
    <AsyncBoundary.CSROnly
      {...props}
      onReset={() => {
        onReset?.()
        reset()
      }}
      ref={resetRef}
    />
  )
})
if (process.env.NODE_ENV !== 'production') {
  BaseQueryAsyncBoundary.displayName = 'QueryAsyncBoundary'
}
const CSROnly = forwardRef<
  ComponentRef<typeof AsyncBoundary.CSROnly>,
  ComponentPropsWithoutRef<typeof AsyncBoundary.CSROnly>
>(({ onReset, ...props }, resetRef) => {
  const { reset } = useQueryErrorResetBoundary()
  return (
    <AsyncBoundary.CSROnly
      {...props}
      onReset={() => {
        onReset?.()
        reset()
      }}
      ref={resetRef}
    />
  )
})
if (process.env.NODE_ENV !== 'production') {
  CSROnly.displayName = 'QueryAsyncBoundary.CSROnly'
}

/**
 * @deprecated Use `<QueryErrorBoundary/>`, `<Suspense/>` at once instead
 */
export const QueryAsyncBoundary = Object.assign(BaseQueryAsyncBoundary, {
  /**
   * @deprecated Use `<QueryErrorBoundary/>`, `<Suspense csrOnly/>` at once instead
   */
  CSROnly,
})
