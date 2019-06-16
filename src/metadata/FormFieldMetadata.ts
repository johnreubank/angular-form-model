import {AbstractControlOptions, AsyncValidatorFn, ValidatorFn} from "@angular/forms";

export interface FormFieldOptions {
  formState?: any;
  validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null;
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null;
}

export class FormFieldMetadata {

  constructor(public target: Object,
              public propertyName: string,
              public options: FormFieldOptions) {

  }

}
