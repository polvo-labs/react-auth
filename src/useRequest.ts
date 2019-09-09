import { useEffect, useState, useMemo } from 'react'
import axiosDefault, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import * as Emitter from 'tiny-emitter'
import { RequestData, UseRequestArgs } from './types'
import useAuth from './useAuth'

export default function useRequest ({ authorized = true, onError, onSuccess }: UseRequestArgs = {}): RequestData {
  // @ts-ignore
  const emitter = useMemo(() => new Emitter(), [])
  const { token, axios } = useAuth()
  const [ requestConfig, setRequestConfig ] = useState<any>(null)
  const [ loading, setLoading ] = useState(false)
  const [ data, setData ] = useState(null)
  const [ error, setError ] = useState(null)

  useEffect(() => {
    if (!requestConfig) {
      return
    }

    setLoading(true)

    if (authorized) {
      if (!requestConfig.headers) {
        requestConfig.headers = {}
      }

      requestConfig.headers['Authorization'] = `Bearer ${token}`
    }

    const source = axiosDefault.CancelToken.source()

    requestConfig.cancelToken = source.token

    // @ts-ignore
    axios(requestConfig)
      .then(response => {
        setLoading(false)
        setData(response.data)
        setError(null)
        setRequestConfig(null)
        emitter.emit('success', response)

        if (onSuccess) {
          onSuccess(response)
        }
      })
      .catch(err => {
        if (axiosDefault.isCancel(err)) {
          return
        }

        setLoading(false)
        setData(null)
        setRequestConfig(null)
        setError(err)

        if (onError) {
          onError(err)
        }

        emitter.emit('failure', err)
      })

    return () => {
      source.cancel()
      emitter.off()
    }
  }, [ requestConfig ])

  const request = (config: Partial<AxiosRequestConfig>) => {
    setRequestConfig(config)
    return new Promise((resolve, reject) => {
      emitter.on('success', (response: AxiosResponse) => resolve(response))
      emitter.on('failure', (err: AxiosError) => reject(err))
    })
  }

  return {
    loading,
    request,
    data,
    error
  }
}
