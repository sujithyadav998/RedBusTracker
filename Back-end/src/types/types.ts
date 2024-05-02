export interface SessionPayload {
    userId: string;
    email: string;
}

export interface ResponsePayload<T> {
    success: boolean;
    message?: string;
    data?: T;
}