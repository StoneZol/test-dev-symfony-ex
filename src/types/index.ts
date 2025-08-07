export type NumberType = 'math' | 'trivia' | 'date' | 'year';

export interface NumberInfo {
    text: string;
    number: number;
    type: NumberType;
}

export interface UserInput {
    number?: number;
    type: NumberType;
    isRandom: boolean;
}

export interface ApiResponse {
    text: string;
    number: number;
    found: boolean;
} 