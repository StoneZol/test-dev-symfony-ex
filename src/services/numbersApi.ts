import type { NumberType, ApiResponse } from '../types';

const BASE_URL = 'http://numbersapi.com';

export class NumbersApiService {
    static async getNumberInfo(number: number | 'random', type: NumberType): Promise<ApiResponse> {
        try {
            const url = `${BASE_URL}/${number}/${type}?json`;
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            throw new Error(`Failed to fetch number info: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    }

    static async getRandomNumberInfo(type: NumberType): Promise<ApiResponse> {
        return this.getNumberInfo('random', type);
    }

    static async getSpecificNumberInfo(number: number, type: NumberType): Promise<ApiResponse> {
        return this.getNumberInfo(number, type);
    }
} 