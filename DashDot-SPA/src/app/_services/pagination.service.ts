import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  constructor() { }

  getPages(_totalPages: number, currentPage: number = 1) {
    const totalPages = _totalPages;
    let startPage: number, endPage: number;
    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }
    const pages = Array.from(Array(endPage + 1).keys());
    pages.splice(0, startPage);
    return pages;
  }

  parseEnum(_enum): Array<any> {
    const map: { id: number; name: string }[] = [];
    for (const n in _enum) {
      if (typeof _enum[n] === 'number') {
        map.push({ id: <any>_enum[n], name: n });
      }
    }
    return map;
  }
}

export class PagedData<T> {
  totalRows: number;
  page: number;
  pageSize: number;
  order: string;
  status: string;
  search: string;
  pages: Array<number>;
  totalPages: number;
  rows: Array<T>;

  constructor() {
    this.rows = new Array<T>();
    this.search = "";
  }
}
