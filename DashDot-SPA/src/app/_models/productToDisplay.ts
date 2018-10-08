import { Photo } from "./photo";

export interface ProductToDisplay {
    id: number;
    category: string;
    price: string;
    title: string;
    size: string;
    code: string;
    season: string;
    material: string;
    description: string;
    sleeve: string;
    quantity: string;
    color: string;
    line:string;
    discount: string;
    photos?: Photo[];
}