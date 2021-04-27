import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {ProductsProviderService} from '../../../../core/services/state-providers';


@Component({
  selector: 'app-delete-product-modal',
  templateUrl: './delete-product-modal.component.html',
  styleUrls: ['./delete-product-modal.component.scss']
})
export class DeleteProductModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public id: number,
    public dialogRef: MatDialogRef<DeleteProductModalComponent>,
    private productsProviderService: ProductsProviderService
  ) {}

  delete(): void {
    this.productsProviderService.deleteProduct(this.id);
    this.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}
