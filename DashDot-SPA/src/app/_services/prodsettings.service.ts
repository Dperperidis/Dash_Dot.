import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Color, Size } from "../_models/product";

@Injectable({
    providedIn: "root"
})
export class ProdSettingsService {
    baseUrl = environment.apiUrl + 'sizescolors';
    constructor(private http: HttpClient) { }



    addColor(color: Color): Observable<Color> {
        return this.http.post<Color>(this.baseUrl + '/addColor', color);
    }

    addSize(size: Size): Observable<Size> {
        return this.http.post<Size>(this.baseUrl + '/addSize', size);
    }

    getColors(): Observable<Array<Color>> {
        return this.http.get<Array<Color>>(this.baseUrl + '/getColors');
    }

    getSizes(): Observable<Array<Size>> {
        return this.http.get<Array<Size>>(this.baseUrl + '/getSizes');
    }



}