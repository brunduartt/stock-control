import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { ProductDetailComponent } from "./detail/product-detail.component";
import { productRoutes } from "./product.route";
import { ProductsComponent } from "./products.component";

@NgModule({
    imports: [
        SharedModule,
        RouterModule.forChild(productRoutes)
    ],
    declarations: [
      ProductsComponent,
      ProductDetailComponent
    ],
  })
  export class ProductModule {}
  