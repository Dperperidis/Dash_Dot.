import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'sortSize'
})
export class ArraySortPipe implements PipeTransform{
    transform(array: Array<any>, args: string): Array<string> {
        array.sort((a: any, b: any) => {
          if (a.id < b.id) {
            return -1;
          } else if (a.id > b.id) {
            return 1;
          } else {
            return 0;
          }
        });
        return array;
      }
}