import {FormFieldMetadata, FormFieldOptions} from './metadata/FormFieldMetadata';
import {FormControlMetadata, FormControlOptions} from "./metadata/FormControlMetadata";
import {AbstractControlOptions, AsyncValidatorFn, FormControl, FormGroup, ValidatorFn} from "@angular/forms";
import {metadataRegistry} from "metadata-registry";

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
    const key = 'formField';
    if (metadataRegistry.registerPropertyMetadata(key)) {
      const metadata = new FormFieldMetadata(object, propertyName, options);
        metadataRegistry.addPropertyMetadata(key, metadata);
    }
  };
}

export function FormControlOptions(
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null) {
  const options: FormControlOptions = { validatorOrOpts: validatorOrOpts, asyncValidator: asyncValidator };
  return function(object: Object, propertyName: string = '') {
    const key = 'formControlOptions';
    if (metadataRegistry.registerPropertyMetadata(key)) {
      const metadata = new FormControlMetadata(object, propertyName, options);
        metadataRegistry.addPropertyMetadata(key, metadata);
    }
  };
}