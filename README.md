# angular-form-model

in your model, set any form control options. The state value of the form field upon running
ToAngularForm will match values set in the model. Fields with unset values will have null values
on the form.

example:

```
import {FormControlOptions} from 'angular-form-model/lib/decorators';

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
import {ToAngularForm} from 'angular-form-model';

class SomeComponent {

  someFunction() {

    // lets create a new form from our model
    const book: Book = new Book();
    const form: FormGroup = ToAngularForm(book);

  }

}
```
