'use client'

import { ErrorBoundary, ErrorBoundaryGroup, Suspense } from '@suspensive/react'
import { useQueryErrorResetBoundary } from '@tanstack/react-query'
import { RejectedFallback, UseSuspenseQuery } from '~/components'
import { Area, Button, Spinner } from '~/components/uis'
import { api } from '~/utils/api'

export default function Page() {
  const queryErrorResetBoundary = useQueryErrorResetBoundary()

  return (
    <Area title="ErrorBoundaryGroup">
      <ErrorBoundaryGroup>
        <ErrorBoundaryGroup.Reset
          trigger={({ reset }) => (
            <Button style={{ alignSelf: 'end' }} onClick={reset}>
              ↻
            </Button>
          )}
        />
        <Area title="ErrorBoundaryGroup">
          <ErrorBoundaryGroup>
            <ErrorBoundaryGroup.Reset
              trigger={({ reset }) => (
                <Button style={{ alignSelf: 'end' }} onClick={reset}>
                  ↻
                </Button>
              )}
            />
            <Area title="Suspense (Continuous 3 fetching)">
              <Suspense.CSROnly fallback={<Spinner />}>
                <UseSuspenseQuery queryKey={['boundary', 1]} queryFn={() => api.delay(500, { percentage: 100 })} />
                <UseSuspenseQuery queryKey={['boundary', 2]} queryFn={() => api.delay(1000, { percentage: 100 })} />
                <UseSuspenseQuery queryKey={['boundary', 3]} queryFn={() => api.delay(1500, { percentage: 100 })} />
              </Suspense.CSROnly>
            </Area>

            <Area title="ErrorBoundary (100% Error)">
              <ErrorBoundary onReset={queryErrorResetBoundary.reset} fallback={RejectedFallback}>
                <Suspense.CSROnly fallback={<Spinner />}>
                  <UseSuspenseQuery queryKey={['boundary', 4]} queryFn={() => api.delay(500, { percentage: 0 })} />
                  <UseSuspenseQuery queryKey={['boundary', 5]} queryFn={() => api.delay(500, { percentage: 100 })} />
                </Suspense.CSROnly>
              </ErrorBoundary>
            </Area>
          </ErrorBoundaryGroup>
        </Area>

        <Area title="ErrorBoundaryGroup blockOutside">
          <ErrorBoundaryGroup blockOutside>
            <ErrorBoundaryGroup.Reset
              trigger={({ reset }) => (
                <Button style={{ alignSelf: 'end' }} onClick={reset}>
                  ↻
                </Button>
              )}
            />
            <Area title="Suspense">
              <Suspense.CSROnly fallback={<Spinner />}>
                <UseSuspenseQuery queryKey={['boundary', 1]} queryFn={() => api.delay(500, { percentage: 100 })} />
              </Suspense.CSROnly>
            </Area>

            <Area title="ErrorBoundary (100% Error)">
              <ErrorBoundary onReset={queryErrorResetBoundary.reset} fallback={RejectedFallback}>
                <Suspense.CSROnly fallback={<Spinner />}>
                  <UseSuspenseQuery queryKey={['boundary', 4]} queryFn={() => api.delay(500, { percentage: 0 })} />
                  <UseSuspenseQuery queryKey={['boundary', 5]} queryFn={() => api.delay(500, { percentage: 100 })} />
                </Suspense.CSROnly>
              </ErrorBoundary>
            </Area>
          </ErrorBoundaryGroup>
        </Area>

        <Area title="ErrorBoundary (100% Error)">
          <ErrorBoundary onReset={queryErrorResetBoundary.reset} fallback={RejectedFallback}>
            <Suspense.CSROnly fallback={<Spinner />}>
              <UseSuspenseQuery queryKey={['boundary', 4]} queryFn={() => api.delay(500, { percentage: 0 })} />
              <UseSuspenseQuery queryKey={['boundary', 5]} queryFn={() => api.delay(500, { percentage: 100 })} />
            </Suspense.CSROnly>
          </ErrorBoundary>
        </Area>
      </ErrorBoundaryGroup>
    </Area>
  )
}
