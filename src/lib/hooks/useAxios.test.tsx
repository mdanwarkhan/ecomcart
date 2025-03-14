import useAxios from './useAxios';
import axiosInstance from '../services/api';

jest.mock('../services/api');

describe('useAxios Hook', () => {

    test('should make a GET request and return data', async () => {
        const mockResponse = { data: { userId: 1, username: 'Person 1' } };
        (axiosInstance as unknown as jest.Mock).mockResolvedValue(mockResponse);

        const result = await useAxios('/users/1', 'get');

        expect(axiosInstance).toHaveBeenCalledWith({
            url: '/users/1',
            method: 'get',
            data: undefined,
        });

        expect(result).toEqual(mockResponse.data);
    });

    test('should make a POST request and return data', async () => {
        const mockResponse = { data: { id: 1, name: 'Person 1' } };
        const postData = { name: 'Person 1' };
        (axiosInstance as unknown as jest.Mock).mockResolvedValue(mockResponse);

        const result = await useAxios('/users', 'post', postData);

        expect(axiosInstance).toHaveBeenCalledWith({
            url: '/users',
            method: 'post',
            data: postData,
        });

        expect(result).toEqual(mockResponse.data);
    });

    test('should handle errors correctly', async () => {
        const mockError = new Error('Request failed');
        (axiosInstance as unknown as jest.Mock).mockRejectedValue(mockError);

        await expect(useAxios('/users/1', 'get')).rejects.toThrow('Request failed');

        expect(axiosInstance).toHaveBeenCalledWith({
            url: '/users/1',
            method: 'get',
            data: undefined,
        });
    });

});
