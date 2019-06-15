/**
 * Marks property as included in the process of transformation. By default it includes the property for both
 * constructorToPlain and plainToConstructor transformations, however you can specify on which of transformation types
 * you want to skip this property.
 */
import {formMetadataStorage} from './storage';
import {AsyncValidatorFn, ValidatorFn} from '@angular/forms/src/directives/validators';
import {AbstractControlOptions} from '@angular/forms/src/model';
import {FormFieldMetadata, FormFieldOptions} from './metadata/FormFieldMetadata';

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
