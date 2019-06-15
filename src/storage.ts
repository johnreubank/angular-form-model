/**
 * Default metadata storage is used as singleton and can be used to storage all metadatas.
 */
import {FormMetadataStorage} from './metadata/MetadataStorage';

export const formMetadataStorage = new FormMetadataStorage();
