import { API_ERROR } from '../constants'

export const errorFormatter = (error: any) => {
  switch (error.status) {
    case 404:
      return API_ERROR[404]
    case 500:
      return API_ERROR[500]
    case 403:
      return API_ERROR[403]
    case 400:
      return API_ERROR[400]
    default:
      return `${API_ERROR['DEFAULT']} ${error.status}).`
  }
}
