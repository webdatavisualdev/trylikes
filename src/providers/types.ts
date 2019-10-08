export interface AuthType {
    email: string;
    password: string;
    phone?: number;
    company?: string;
    name?: string;
    location?: string;
    eulaAccepted?: boolean;
}

export interface Report {
    name: string;
    url: string;
}