# angular-form-model

in your model, add a decorator above any properties you want on a form that would be created using that model.
decorator's arguments are identical to new FormControl(arguments) NOTE: next version will set the form value equal to
the object value, but defaults are set to null for everything right now

example:

```
import {FormControlOptions, FormModel} from 'angular-form-model/lib/decorators';

@FormModel
export class Book {

  @FormControlOptions({ updateOn: 'blur' })
  title = 'Wild Thornberries';

  author = 'Nigel Thornberry';

}
```

to create an angular dynamic form using our model

```
import {Book} from './book.model';
import {FormGroup} from '@angular/forms';
import {FormModel} from 'angular-form-model';

class SomeComponent {

  someFunction() {

    // lets create a new form from our model
    const book: Partial<Book & FormModelType> = new Book();
    const form: FormGroup = book.toForm();

  }

}
```
