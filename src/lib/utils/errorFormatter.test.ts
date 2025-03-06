import { errorFormatter } from "./errorFormatter"

describe('Error formatter', () => {

    test('error check for status code 404', () => {
        const error = {
            status: 404
        }
        expect(errorFormatter(error)).toBe('The requested resource was not found (404).')
    })

    test('error checks for status code 500 ', () => {
        const error = {
            status: 500
        }
        expect(errorFormatter(error)).toBe('Internal server error (500). Please try again later.')
    })

    test('error checks for default status', () => {
        const error = {
            status: 'DEFAULT'
        }
        expect(errorFormatter(error)).toBe('Unexpected error occurred (status code: DEFAULT).')
    })
})