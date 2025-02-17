
export interface IBaseReponse<T> {
    success: boolean;
    message: string;
    payload?: T | undefined;
}
