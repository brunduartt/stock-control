import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EntityService } from '../entity-service/entity.service';

@Component({
  templateUrl: './delete-dialog.component.html'
})
export class DeleteEntityDialog<T> {
  deleteText: string | undefined;
  entityService: EntityService<T> | undefined;
  entityId: number | undefined;
  constructor(
    public activeModal: NgbActiveModal,
  ) {
      
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(): void {
    this.entityService!.delete(this.entityId!).subscribe(() => {
      this.activeModal.close();
    });
  }
}
