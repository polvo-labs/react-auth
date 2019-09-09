import expand from './expand'
import objectPath from 'object-path'

export default async function handleFormSubmit (options: handleFormSubmitOptions): Promise<any> {
  try {
    const data = await options.request
    options.onSuccess(data)
  } catch (err) {
    const validationErrors = objectPath.get(err, 'response.data.errors')
    if (validationErrors) {
      if (options.onValidationErrors) {
        options.onValidationErrors(validationErrors)
      }
      return expand(validationErrors)
    }
    options.onFailure(err)
  }
}

interface handleFormSubmitOptions {
  request: Promise<any>
  onValidationErrors(validationErrors: any): any
  onSuccess(data: any): any
  onFailure(err: any): any
}
