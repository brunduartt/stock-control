import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlContainer, ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'input-v',
  templateUrl: './input-validation.component.html',
  providers: [
      {
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => InputValidationComponent),
          multi: true,
      },
  ]
})
export class InputValidationComponent implements ControlValueAccessor {
    @Input() formControl!: FormControl;
    @Input() formControlName!: string;
    @Input() type!: string;

    constructor(private controlContainer: ControlContainer) {

    }

    writeValue(obj: any): void {
        this.value = obj;
    }
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    get control():FormControl {
        return this.formControl || this.controlContainer.control!.get(this.formControlName)
    }

    get value(): any {
        return this.control.value;
    }

    set value(value: any) {
        this.control.setValue(value);
    }

    onChange: any = () => {};
    onTouched: any = () => {};
}
