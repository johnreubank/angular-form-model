/**
 * Storage all library metadata.
 */
import {FormFieldMetadata} from './FormFieldMetadata';
import 'reflect-metadata';

export class FormMetadataStorage {

  // -------------------------------------------------------------------------
  // Properties
  // -------------------------------------------------------------------------

  private _formFieldMetadatas = new Map<Object, Map<string, FormFieldMetadata>>();

  // -------------------------------------------------------------------------
  // Adder Methods
  // -------------------------------------------------------------------------

  addFormFieldMetadata(metadata: FormFieldMetadata) {
    if (!this._formFieldMetadatas.has(metadata.target)) {
      this._formFieldMetadatas.set(metadata.target, new Map<string, FormFieldMetadata>());
    }

    (this._formFieldMetadatas.get(metadata.target) as Map<string, FormFieldMetadata>).set(metadata.propertyName, metadata);

  }

  // -------------------------------------------------------------------------
  // Public Methods
  // -------------------------------------------------------------------------

  findFormFieldMetadata(target: Object, propertyName: string): FormFieldMetadata {
    return this.findMetadata(this._formFieldMetadatas, target, propertyName);
  }

  getFormFieldMetadatas(target: Object): FormFieldMetadata[] {
    console.log(this._formFieldMetadatas);
    return this.getMetadata(this._formFieldMetadatas, target);
  }

  getFormFields(target: Object): string[] {
    return this.getFormFieldMetadatas(target)
      .map(metadata => metadata.propertyName);
  }

  clear() {
    this._formFieldMetadatas.clear();
  }

  // -------------------------------------------------------------------------
  // Private Methods
  // -------------------------------------------------------------------------

  private getMetadata<T extends { target: Object, propertyName: string }>(metadatas: Map<Object, Map<string, T>>, target: Object): T[] {

    if (!this._formFieldMetadatas.has(target)) {
      target = Object.getPrototypeOf(target);
    }

    if (!this._formFieldMetadatas.has(target)) {
      console.log('fuck');
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
