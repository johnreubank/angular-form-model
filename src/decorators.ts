import {FormFieldMetadata, FormFieldOptions} from './metadata/FormFieldMetadata';
import {FormControlMetadata, FormControlOptions} from "./metadata/FormControlMetadata";
import {AbstractControlOptions, AsyncValidatorFn, FormControl, FormGroup, ValidatorFn} from "@angular/forms";
import {formMetadataStorage} from "./storage";

/**
 * @deprecated as of 0.0.2. use FormControl
 * @param formState
 * @param {ValidatorFn | ValidatorFn[] | AbstractControlOptions | null} validatorOrOpts
 * @param {AsyncValidatorFn | AsyncValidatorFn[] | null} asyncValidator
 * @returns {(object: Object, propertyName?: string) => void}
 * @constructor
 */
export function FormField(
  formState?: any,
  validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
  const options: FormFieldOptions = {formState: formState, validatorOrOpts: validatorOrOpts, asyncValidator: asyncValidator};
  return function(object: Object, propertyName: string = '') {
    const metadata = new FormFieldMetadata(object, propertyName, options);
    formMetadataStorage.addFormFieldMetadata(metadata);
  };
}

export function FormControlOptions(
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
  const options: FormControlOptions = { validatorOrOpts: validatorOrOpts, asyncValidator: asyncValidator };
  return function(object: Object, propertyName: string = '') {
    const metadata = new FormControlMetadata(object, propertyName, options);
    formMetadataStorage.addFormControlMetadata(metadata);
  };
}

export interface FormModelType {
  toForm(): FormGroup;
}

export function FormModel<T extends {new(...args:any[]):{}}>(constructor:T) {
    return class extends constructor implements FormModelType {
        toForm(): FormGroup {
          // get any FormControls that exist on the object
          const props = Object.getOwnPropertyNames(this);
          const controls: { [name: string]: FormControl } = {};
          for (const prop of props) {
            if (formMetadataStorage.hasFormControlMetadata(this, prop)) {
              const metadata: FormControlMetadata = formMetadataStorage.findFormControlMetadata(this, prop);
              controls[prop] = new FormControl(metadata.options.validatorOrOpts, metadata.options.asyncValidator);
              continue;
            }
            controls[prop] = new FormControl();
          }
          return new FormGroup(controls);
        }
    }
}