import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { ProductsComponent } from './products.component';
import { ProductDetailComponent } from './detail/product-detail.component';
import { IProduct, Product } from './product.model';
import { ProductService } from './product.service';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { first } from 'rxjs/operators';
@Injectable({ providedIn: 'root' })
export class ProductResolve implements Resolve<IProduct> {
  constructor(private service: ProductService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProduct> | Observable<never> {
    const id = route.params['id'];
    console.log(id);
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((res: HttpResponse<IProduct>) => {
          if(res.body) {
            return of(res.body);
          }
          return EMPTY;
        })
      );
    }
    return of(new Product());
  }
}

export const productRoutes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    data: {
      pageTitle: 'Produtos'
    },
  },
  {
    path: 'new',
    component: ProductDetailComponent,
    data: {
      pageTitle: "Novo produto"
    }
  },
  {
    path: 'edit/:id',
    component: ProductDetailComponent,
    resolve: {
      product: ProductResolve
    },
    data: {
      pageTitle: "Editar produto"
    }
  }
  
];
