import {
  type DefaultError,
  type FetchInfiniteQueryOptions,
  type QueryKey,
  usePrefetchInfiniteQuery,
} from '@tanstack/react-query'

/**
 * A component that allows you to use usePrefetchInfiniteQuery in JSX, avoiding the limitations of React hooks.
 *
 * @see {@link https://suspensive.org/en/docs/react-query/PrefetchInfiniteQuery Suspensive Docs}
 */
export function PrefetchInfiniteQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
  TPageParam = unknown,
>(options: FetchInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryKey, TPageParam>) {
  usePrefetchInfiniteQuery(options)
  return <></>
}
