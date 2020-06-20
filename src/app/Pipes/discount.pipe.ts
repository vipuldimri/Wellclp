import { Pipe, PipeTransform } from '@angular/core';

// tslint:disable-next-line:use-pipe-transform-interface
@Pipe(
    { name: 'discount' }
    )
export class DiscountPipe implements PipeTransform {
    transform(value: any, Actualprice: any , SellingPrice: any ) {
        if (Actualprice <= SellingPrice) {
            return '';
        }
        const   Discount = (Math.ceil(Actualprice) - Math.ceil(SellingPrice) ) / Math.ceil(Actualprice);
        // const   Discount = (Actualprice - SellingPrice / Actualprice) * 100;
        return Math.ceil(Discount * 100)  +  '% Off';
    }

}
