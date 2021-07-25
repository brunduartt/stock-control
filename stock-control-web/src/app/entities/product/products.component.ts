import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router, Data } from '@angular/router';
import { Subscription, combineLatest } from 'rxjs';
import { IProduct, Product } from './product.model';
import { ProductService } from './product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteEntityDialog } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { ITEMS_PER_PAGE } from 'src/app/app-contants';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'product',
  templateUrl: './products.component.html',
  styleUrls: ['./product.scss']
})
export class ProductsComponent implements OnInit {
  products?: IProduct[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  searchForm = this.fb.group({
    'name': [],
    'id': []
  });
  constructor(
    protected productService: ProductService,
    protected activatedRoute: ActivatedRoute,
    protected modalService: NgbModal,
    protected router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((data) => {
      if(data.get('page') != null) {
        this.page = Number.parseInt(data.get('page')!); 
      } else {
        this.page = 1;
      }
      this.loadPage();
    })
  }


  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page || 1;

    this.productService
      .query({
        ...this.searchForm.value,
        page: pageToLoad - 1,
        size: this.itemsPerPage,
      })
      .subscribe(
        (res: HttpResponse<IProduct[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError()
      );
  }

  deleteProduct(entity: IProduct): void {
    const modalRef = this.modalService.open(DeleteEntityDialog, { size: 'lg', backdrop: 'static' });
    const component = modalRef.componentInstance as DeleteEntityDialog<Product>;
    component.deleteText = "Produto " + entity.name + " (ID: "+entity.id +")"; 
    component.entityId = entity.id;
    component.entityService = this.productService;
    modalRef.closed.subscribe((res) => {
      this.loadPage();
    })

  }


  protected onSuccess(data: IProduct[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.products = data || [];
    console.log(this.products);
    this.router.navigate(['/product'], {
      queryParams: {
        page: this.page,
      }
    });
  }

  protected onError() {

  }
}
