# angular-form-model

in your model, add a decorator above any properties you want on a form that would be created using that model.
decorator's arguments are identical to new FormControl(arguments)

example:

```
import {FormField} from 'angular-form-model/lib/decorators';

export class Book {

  @FormField('', { updateOn: 'blur' })
  title = '20 Steps to Success';

  @FormField('John Eubank')
  author = 'John Eubank';

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
    let book = new Book();
    let bookFormModel: FormModel = new FormModel(book);
    let bookForm: FormGroup = bookFormModel.get();

    // ** populate functionality is still pretty raw ** /
    // lets say we want to hydrate our form using a model's data
    let response = new Book();
    response.title = 'Wild Thornberries';
    response.author = 'Nigel Thornberry';
    let hydratedBookFormModel: FormModel = new FormModel(response).populate(response);
    let hydratedBookForm = hydratedBookFormModel.get();
  
  }

}
```
