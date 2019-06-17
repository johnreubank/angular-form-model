import {FormControl, FormGroup} from "@angular/forms";
import {FormControlMetadata} from "./metadata/FormControlMetadata";
import {metadataRegistry} from "metadata-registry";

export interface AnonymousClass {
    [value: string]: any;
}

export function ToAngularForm(object: Object): FormGroup {
    // get any FormControls that exist on the object
    const props = Object.getOwnPropertyNames(object);
    const controls: { [name: string]: FormControl } = {};
    for (const prop of props) {
        if (metadataRegistry.hasPropertyMetadata('formControl', object, prop)) {
            const metadata: FormControlMetadata = metadataRegistry.getPropertyMetadata('formControl', object, prop) as FormControlMetadata;
            controls[prop] = new FormControl((object as AnonymousClass)[prop], metadata.options.validatorOrOpts, metadata.options.asyncValidator);
            continue;
        }
        controls[prop] = new FormControl((object as AnonymousClass)[prop]);
    }
    return new FormGroup(controls);
}