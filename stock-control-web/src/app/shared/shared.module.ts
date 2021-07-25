import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FaIconLibrary, FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxCurrencyModule } from "ngx-currency";
import { CurrencyFormat } from "./currency-format-pipe/currency-format-pipe";
import { DeleteEntityDialog } from "./delete-dialog/delete-dialog.component";
import { fontAwesomeIcons } from "./font-awesome-icons/font-awesome-icons";
import { InputValidationComponent } from "./input-validation/input-validation.component";


@NgModule({
  imports: [
    HttpClientModule,
    FontAwesomeModule,
    NgbModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCurrencyModule
  ], 
  declarations: [
    DeleteEntityDialog,
    CurrencyFormat,
    InputValidationComponent
  ],
  entryComponents: [
    DeleteEntityDialog
  ],
  exports: [
    CurrencyFormat,
    InputValidationComponent,
    CommonModule,
    FontAwesomeModule,
    NgbModule,
    NgxCurrencyModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class SharedModule { 
  constructor(library: FaIconLibrary) {
    library.addIcons(...fontAwesomeIcons);
  }

}
