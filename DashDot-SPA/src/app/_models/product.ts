import { Photo } from "./photo";

export class Product {
    id: number;
    category: string;
    price: string;
    title: string;
    size: string;
    code: string;
    season: string;
    photoUrl: string;
    material: string;
    description: string;
    sleeve: string;
    quantity: string;
    color: string;
    line:string;
    discount: string;
    photos?: Photo[];
}