/**
 * Marks property as included in the process of transformation. By default it includes the property for both
 * constructorToPlain and plainToConstructor transformations, however you can specify on which of transformation types
 * you want to skip this property.
 */
import {formMetadataStorage} from './storage';
import {AsyncValidatorFn, ValidatorFn} from '@angular/forms/src/directives/validators';
import {AbstractControlOptions, FormControl, FormGroup} from '@angular/forms/src/model';
import {FormFieldMetadata, FormFieldOptions} from './metadata/FormFieldMetadata';
import {FormControlMetadata, FormControlOptions} from "./metadata/FormControlMetadata";

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

export function FormModel<T extends {new(...args:any[]):{}}>(constructor:T) {
    return class extends constructor {
        public toForm(): FormGroup {
          // get any FormControls that exist on the object
          const props = Object.getOwnPropertyNames(constructor);
          const controls: { [name: string]: FormControl } = {};
          for (const prop in props) {
            if (formMetadataStorage.hasFormControlMetadata(constructor, prop)) {
              const metadata: FormControlMetadata = formMetadataStorage.findFormControlMetadata(constructor, prop);
              controls[prop] = new FormControl(metadata.options.validatorOrOpts, metadata.options.asyncValidator);
              continue;
            }
            controls[prop] = new FormControl();
          }
          return new FormGroup(controls);
        }
    }
}