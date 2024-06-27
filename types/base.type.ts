export type ResponseBase<TData> = {
    statusCode: number;
    message: string;
    data?: TData | null;
};

export interface User{
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
      street: string,
      suite: string,
      city: string,
      zipcode: string,
      geo: [Object]
    },
    phone: string,
    website: string,
    company: {
      name: string,
      catchPhrase: string,
      bs: string
    }
}