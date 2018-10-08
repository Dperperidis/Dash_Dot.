import { Photo } from "./photo";
import { Color } from "./color";

export class Product {
    id: string;
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
    ColorOfColorId: Color[];
    line:string;
    discount: string;
    photos?: Photo[];
}