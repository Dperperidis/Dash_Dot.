import { Photo } from "./photo";


export class Product {
    id: number;
    category: string;
    price: string;
    title: string;
    code: string;
    season: string;
    photoUrl: string;
    material: string;
    active: string;
    design: string;
    quantity: string; 
    description: string;
    sleeve: string;
    line: string;
    discount: string;
    photos?: Photo[];
    productSizes: Array<ProductSize>
    constructor() {
        this.productSizes = new Array<ProductSize>();
    }
}

export class ProductSize {
    id: number;
    productId: number;
    sizeId: number;
    size: Size;
    productSizeColor: Array<ProductSizeColor>
    constructor() {
        this.productSizeColor = new Array<ProductSizeColor>();
    }
}

export class ProductSizeColor {
    id: number;
    productSizeId: number;
    productSizes:ProductSize;
    colorId: number;
    color: Color; 
    count: number;
}

export class Size {
    id: number;
    title: string;
    region: string;
}

export class Color {
    id: number;
    title: string;
    rgb: string;
}