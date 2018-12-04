import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { Color, Size, ProductSize } from "../_models/product";
import { PaginatedResult } from "../_models/pagination";
import { map } from "rxjs/operators";
import { Photo } from "../_models/photo";

@Injectable({
    providedIn: "root"
})
export class ProdSettingsService {
    baseUrl = environment.apiUrl;
    constructor(private http: HttpClient) { }



    addColor(color: Color): Observable<Color> {
        return this.http.post<Color>(this.baseUrl + '/sizescolors/addColor', color);
    }

    updateColor(color: Color): Observable<Color> {
        return this.http.post<Color>(this.baseUrl + '/sizescolors/updateColor', color);
    }

    setColorToPhoto(photo: Photo): Observable<Photo> {
        return this.http.put<Photo>(this.baseUrl + '/products/set/color', photo);
    }

    addSize(size: Size): Observable<Size> {
        return this.http.post<Size>(this.baseUrl + '/sizescolors/addSize', size);
    }

    getColors(): Observable<Color[]> {
        return this.http.get<Color[]>(this.baseUrl + '/sizescolors/getColors');
    }

    getColorsForAdmin(page?, itemsPerPage?): Observable<PaginatedResult<Color[]>> {
        const paginatedResult: PaginatedResult<Color[]> = new PaginatedResult<Color[]>();
        let params = new HttpParams();
        if (page != null && itemsPerPage != null) {
            params = params.append('pageNumber', page);
            params = params.append('pageSize', itemsPerPage);
        }
        return this.http.get<Array<Color>>(this.baseUrl + '/sizescolors/getColorsForAdmin', { observe: 'response', params })
            .pipe(
                map(response => {
                    paginatedResult.result = response.body;
                    if (response.headers.get('Pagination') != null) {
                        paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
                    }
                    return paginatedResult;
                })
            );
    }







    getSizes(): Observable<Array<Size>> {
        return this.http.get<Array<Size>>(this.baseUrl + '/sizescolors/getSizes');
    }

    getColorsBySize(size: string, prodId: number): Observable<ProductSize> {
        return this.http.get<ProductSize>(this.baseUrl + '/customers/getSizeColor/' + size + '/' + prodId);
    }

    deleteColor(id: number) {
        return this.http.delete(this.baseUrl + '/sizescolors/deleteColor/' + id);
    }

    deleteProdColor(id: number) {
        return this.http.delete(this.baseUrl + 'sizescolors/deleteProductColor/' + id);
    }


}
