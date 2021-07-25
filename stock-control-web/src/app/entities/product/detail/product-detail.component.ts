import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { DeleteEntityDialog } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { IProduct, Product } from '../product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
    isSaving = false;
    form = this.fb.group({
        id: [],
        name: [null, [Validators.required]],
        amount: [null, [Validators.required, Validators.min(0)]],
        unitValue: [null, [Validators.required, Validators.min(0)]],
    });

    constructor(
        private fb: FormBuilder,
        private activatedRoute: ActivatedRoute,
        private productService: ProductService,
        private router: Router,
        private modalService: NgbModal
    ) {

    }

    ngOnInit() {
        this.activatedRoute.data.subscribe(data => {
            console.log(data);
            const product = data['product'];
            if(product) {
                this.updateForm(product);
            }
        });
    }

    updateForm(product: IProduct) {
        this.form.patchValue({
            id: product.id,
            name: product.name,
            amount: product.amount,
            unitValue: product.unitValue
        })
    }

    save() {
        console.log(this.form);
        if(this.form.valid && !this.isSaving) {
            this.isSaving = true;
            const product = this.createFromForm();
            console.log(product);
            if(product.id) {
                this.onSaveSubscribe(this.productService.update(product));
            } else {
                this.onSaveSubscribe(this.productService.create(product));
            }
        }
    }

    onSaveSubscribe(res: Observable<HttpResponse<IProduct>>) {
        res.subscribe(
            (res) => this.onSuccess(),
            (error) => this.onError()
        );
    }

    goBack() {
        window.history.back();
    }

    onSuccess() {
        this.isSaving = false;
        this.goBack();
    }

    onError() {
        this.isSaving = false;
    }

    createFromForm():IProduct {
        return {
            ...new Product(),
            id: this.form.get('id')!.value,
            name: this.form.get('name')!.value,
            amount: this.form.get('amount')!.value,
            unitValue: this.form.get('unitValue')!.value
        }
    }
    
    deleteProduct(): void {
        const modalRef = this.modalService.open(DeleteEntityDialog, { size: 'lg', backdrop: 'static' });
        const component = modalRef.componentInstance as DeleteEntityDialog<Product>;
        component.deleteText = "Produto " + this.form.get('name')!.value + " (ID: "+this.form.get('id')!.value +")"; 
        component.entityId = this.form.get('id')!.value;
        component.entityService = this.productService;
        modalRef.closed.subscribe((res) => {
          this.goBack();
        })
      }
}
