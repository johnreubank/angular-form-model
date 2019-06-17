import {AbstractControlOptions, AsyncValidatorFn, ValidatorFn} from "@angular/forms";
import {ClassPropertyMetadata} from "metadata-registry/lib/metadata/ClassPropertyMetadata";

export interface FormControlOptions {
  validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null;
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null;
}

export class FormControlMetadata extends ClassPropertyMetadata {

  constructor(public target: Object,
              public propertyName: string,
              public options: FormControlOptions) {
    super(target, propertyName);
  }

}
