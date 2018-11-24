export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    mobile: string;
    postalCode: number;
    city: string;
    area: string;
    isAdmin: boolean;
    created: Date;
}