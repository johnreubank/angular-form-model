/**
 * Storage all library metadata.
 */
import {FormFieldMetadata} from './FormFieldMetadata';
import 'reflect-metadata';
import {FormControlMetadata} from "./FormControlMetadata";

export class FormMetadataStorage {

  // -------------------------------------------------------------------------
  // Properties
  // -------------------------------------------------------------------------

  private _formFieldMetadatas = new Map<Object, Map<string, FormFieldMetadata>>();
  private _formControlMetadatas = new Map<Object, Map<string, FormControlMetadata>>();

  // -------------------------------------------------------------------------
  // Adder Methods
  // -------------------------------------------------------------------------

  addFormFieldMetadata(metadata: FormFieldMetadata) {
    if (!this._formFieldMetadatas.has(metadata.target)) {
      this._formFieldMetadatas.set(metadata.target, new Map<string, FormFieldMetadata>());
    }

    (this._formFieldMetadatas.get(metadata.target) as Map<string, FormFieldMetadata>).set(metadata.propertyName, metadata);

  }

  addFormControlMetadata(metadata: FormControlMetadata) {

    if (!this._formControlMetadatas.has(metadata.target)) {
      this._formControlMetadatas.set(metadata.target, new Map<string, FormControlMetadata>());
    }

    (this._formControlMetadatas.get(metadata.target) as Map<string, FormControlMetadata>).set(metadata.propertyName, metadata);

  }

  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------

  findFormFieldMetadata(target: Object, propertyName: string): FormFieldMetadata {
    return this.findMetadata(this._formFieldMetadatas, target, propertyName);
  }

  getFormFieldMetadatas(target: Object): FormFieldMetadata[] {
    return this.getMetadata(this._formFieldMetadatas, target);
  }

  getFormFields(target: Object): string[] {
    return this.getFormFieldMetadatas(target)
      .map(metadata => metadata.propertyName);
  }

  findFormControlMetadata(target: Object, propertyName: string): FormControlMetadata {
    return this.findMetadata(this._formControlMetadatas, target, propertyName);
  }

  getFormControlMetadatas(target: Object): FormControlMetadata[] {
    return this.getMetadata(this._formControlMetadatas, target);
  }

  hasFormControlMetadata(target: Object, propertyName: string): boolean {
    if (!(this._formControlMetadatas.has(target))) {
      return false;
    }
    if (!((this._formControlMetadatas.get(target) as Map<string, FormControlMetadata>).has(propertyName))) {
      return false;
    }
    return true;
  }


  clear() {
    this._formFieldMetadatas.clear();
    this._formControlMetadatas.clear();
  }

  // -------------------------------------------------------------------------
  // Private Methods
  // -------------------------------------------------------------------------

  private getMetadata<T extends { target: Object, propertyName: string }>(metadatas: Map<Object, Map<string, T>>, target: Object): T[] {

    if (!this._formFieldMetadatas.has(target)) {
      target = Object.getPrototypeOf(target);
    }

    const metadataFromTargetMap = metadatas.get(target);

    let metadataFromTarget: T[] = [];

    if (metadataFromTargetMap) {
      metadataFromTarget = Array.from(metadataFromTargetMap.values()).filter(meta => meta.propertyName !== undefined);
    }

    return metadataFromTarget;

  }

  private findMetadata<T extends { target: Object, propertyName: string }>(metadatas: Map<Object, Map<string, T>>, target: Object, propertyName: string): T {

    target = Object.getPrototypeOf(target);

    const metadataFromTargetMap = metadatas.get(target);
    if (metadataFromTargetMap) {
      const metadataFromTarget = metadataFromTargetMap.get(propertyName);
      if (metadataFromTarget) {
        return metadataFromTarget;
      }
    }

    throw new Error('Could not find metadata');

  }


}
