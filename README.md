# Angular 2 property decorators
The purpose of this project is to provide extensible property decoration for Angular 2. 

Download, build and test. Short blog item [here](http://tb-it.blogspot.co.nz/2016/10/angular-2-using-decorators-for-property.html).

# Example

The properties shortDescription and sourceCode will be automatically serialized and deserialized to window.localStorage.

    import { Component } from '@angular/core';
    import { LocalStorage } from './shared/localStorage.decorator';

    @Component({
        selector: 'app-shell',
        template: '...'
    })
    export class AppComponent {
        @LocalStorage('XYZ') shortDescription: string;
        @LocalStorage('XYZ') sourceCode: string;
    }

Screen grab:

![](blog-image.PNG)

# License
This project is released under the [MIT license](https://opensource.org/licenses/MIT)