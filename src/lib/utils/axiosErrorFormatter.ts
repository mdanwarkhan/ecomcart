import axios, { AxiosError } from 'axios';
import { API_ERROR } from '../constants';

const formatAxiosError = (error: AxiosError): string => {
    if (error) {
        if (axios.isAxiosError(error) && error.response) {
            switch (error.response.status) {
                case 400:
                    return API_ERROR[400];
                case 403:
                    return API_ERROR[403];
                case 404:
                    return API_ERROR[404];
                case 500:
                    return API_ERROR[500];
                default:
                    return API_ERROR['UNEXPECTED_SERVER'];
            }
        } else if (axios.isAxiosError(error) && error.request) {
            return API_ERROR['NETWORK'];
        } else if (error instanceof Error) {
            return `Error: ${error.message}`;
        } else {
            return API_ERROR['UNEXPECTED'];
        }
    }
    return API_ERROR['UNEXPECTED'];
};

export default formatAxiosError