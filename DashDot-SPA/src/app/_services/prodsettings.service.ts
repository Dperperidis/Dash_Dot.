import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Color, Size, ProductSize } from "../_models/product";

@Injectable({
    providedIn: "root"
})
export class ProdSettingsService {
    baseUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }
    


    addColor(color: Color): Observable<Color> {
        return this.http.post<Color>(this.baseUrl + '/sizescolors/addColor', color);
    }

    updateColor(color: Color): Observable<Color>{
        return this.http.post<Color>(this.baseUrl + '/sizescolors/updateColor', color )
    }

    addSize(size: Size): Observable<Size> {
        return this.http.post<Size>(this.baseUrl + '/sizescolors/addSize', size);
    }

    getColors(): Observable<Array<Color>> {
        return this.http.get<Array<Color>>(this.baseUrl + '/sizescolors/getColors');
    }

    getSizes(): Observable<Array<Size>> {
        return this.http.get<Array<Size>>(this.baseUrl + '/sizescolors/getSizes');
    }

    getColorsBySize(id: number, prodId: number): Observable<Array<ProductSize>>{
        return this.http.get<Array<ProductSize>>(this.baseUrl +'/customers/getSizeColor/' + id + '/' +prodId)
    }

    deleteColor(id: number){
        return this.http.delete(this.baseUrl + '/sizescolors/deleteColor/' + id)
    }

    deleteProdColor(id:number) {
        return this.http.delete(this.baseUrl + 'sizescolors/deleteProductColor/' + id);
    }


}