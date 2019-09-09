import React, { useEffect, useState } from 'react'
import { AxiosRequestConfig } from 'axios'
import { RequestData, UseRequestArgs } from './types'
import useRequest from './useRequest'

export default function Fetch (props: AxiosRequestConfig & FetchProps) {
  const {
    children,
    lazy,
    authorized,
    onSuccess,
    onError,
    loader: Loader,
    ...config
  } = props

  const [ firstRequestMade, setFirstRequestMade ] = useState(false)
  const requestData = useRequest({ authorized, onError, onSuccess })

  useEffect(() => {
    requestData.request(config).then(() => setFirstRequestMade(true))
  }, [...Object.values(config), lazy, authorized])

  const isLoading = (!firstRequestMade && !lazy) && !requestData.error

  if (Loader && (isLoading || requestData.loading)) {
    return <Loader />
  }

  return isLoading
    ? children({ ...requestData, loading: true })
    : children(requestData)
}

interface FetchProps extends UseRequestArgs {
  children: (props: RequestData) => JSX.Element
  lazy?: boolean
  loader?: () => JSX.Element
}
