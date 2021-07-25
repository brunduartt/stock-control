import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EntityService } from "src/app/shared/entity-service/entity.service";
import { IProduct } from "./product.model";

@Injectable({ providedIn: 'root' })
export class ProductService extends EntityService<IProduct> {
    constructor(protected http: HttpClient) {
        super(http, 'product');
    }
}