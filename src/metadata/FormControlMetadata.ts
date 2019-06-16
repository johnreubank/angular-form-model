import {AbstractControlOptions} from '@angular/forms/src/model';
import {AsyncValidatorFn, ValidatorFn} from '@angular/forms/src/directives/validators';

export interface FormControlOptions {
  validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null;
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null;
}

export class FormControlMetadata {

  constructor(public target: Object,
              public propertyName: string,
              public options: FormControlOptions) {

  }

}
