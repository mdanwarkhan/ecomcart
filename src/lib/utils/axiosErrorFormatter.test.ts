import axios, { AxiosError } from 'axios';
import formatAxiosError from './axiosErrorFormatter';
import { API_ERROR } from '../constants';

jest.mock('axios');

describe('formatAxiosError', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should handle 400 error', () => {
        const error = {
            isAxiosError: true,
            response: { status: 400 }
        } as AxiosError;
        (axios.isAxiosError as unknown as jest.Mock).mockReturnValue(true);

        const result = formatAxiosError(error);
        expect(result).toBe(API_ERROR[400]);
    });

    test('should handle 403 error', () => {
        const error = {
            isAxiosError: true,
            response: { status: 403 }
        } as AxiosError;
        (axios.isAxiosError as unknown as jest.Mock).mockReturnValue(true);

        const result = formatAxiosError(error);
        expect(result).toBe(API_ERROR[403]);
    });

    test('should handle 404 error', () => {
        const error = {
            isAxiosError: true,
            response: { status: 404 }
        } as AxiosError;
        (axios.isAxiosError as unknown as jest.Mock).mockReturnValue(true);

        const result = formatAxiosError(error);
        expect(result).toBe(API_ERROR[404]);
    });

    test('should handle 500 error', () => {
        const error = {
            isAxiosError: true,
            response: { status: 500 }
        } as AxiosError;
        (axios.isAxiosError as unknown as jest.Mock).mockReturnValue(true);

        const result = formatAxiosError(error);
        expect(result).toBe(API_ERROR[500]);
    });

    test('should handle unexpected server error', () => {
        const error = {
            isAxiosError: true,
            response: { status: 502 }
        } as AxiosError;
        (axios.isAxiosError as unknown as jest.Mock).mockReturnValue(true);

        const result = formatAxiosError(error);
        expect(result).toBe(API_ERROR['UNEXPECTED_SERVER']);
    });

    test('should handle network error', () => {
        const error = {
            isAxiosError: true,
            request: {},
            response: undefined
        } as AxiosError;
        (axios.isAxiosError as unknown as jest.Mock).mockReturnValue(true);

        const result = formatAxiosError(error);
        expect(result).toBe(API_ERROR['NETWORK']);
    });

    test('should handle generic Error', () => {
        const error = new Error('Test error') as AxiosError;
        (axios.isAxiosError as unknown as jest.Mock).mockReturnValue(false);

        const result = formatAxiosError(error);
        expect(result).toBe('Error: Test error');
    });

    test('should handle undefined error', () => {
        const error = undefined as unknown as AxiosError;
        const result = formatAxiosError(error);
        expect(result).toBe(API_ERROR['UNEXPECTED']);
    });
});