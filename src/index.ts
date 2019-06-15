import {AbstractControl, AsyncValidatorFn, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import {formMetadataStorage} from './storage';
import {FormFieldMetadata} from './metadata/FormFieldMetadata';
import {AbstractControlOptions} from '@angular/forms/src/model';

export interface FormGroupOptions {
  validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null;
  asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null;
}

export class FormModel {

  private form: FormGroup;

  constructor(model: Object|Function, options: FormGroupOptions = {validatorOrOpts: null, asyncValidator: null}) {

    this.form = new FormGroup(this.getControls(model), options.validatorOrOpts, options.asyncValidator);

  }

  get(): FormGroup {
    return this.form;
  }

  populate(data: any): FormModel {

    const metadatas: FormFieldMetadata[] = formMetadataStorage.getFormFieldMetadatas(data);
    for (const metadata of metadatas) {
      const field = metadata.propertyName;
      if (data[field] && this.form.get(field) !== null) {
        (this.form.get(field) as AbstractControl).setValue(data[field]);
      }
    }

    return this;

  }

  private getControls(model: Object): { [name: string]: FormControl } {

    const controls: { [name: string]: FormControl } = {};
    const metadatas: FormFieldMetadata[] = formMetadataStorage.getFormFieldMetadatas(model);

    for (const metadata of metadatas) {
      const options = metadata.options;
      controls[metadata.propertyName] = new FormControl(options.formState, options.validatorOrOpts, options.asyncValidator);
    }

    return controls;

  }

}
