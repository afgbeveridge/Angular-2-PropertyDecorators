import { Component } from '@angular/core';
import { LocalStorage, LocalStorageDelegatedPropertyAction } from './shared/localStorage.decorator';

@Component({
    selector: 'app-shell',
    template: `
        <div class="row">
                <div class="col-xs-12">
                    <h4>Short description</h4>
                </div>
                <div class="col-xs-6">
                    <input minlength="1" maxlength="64" [(ngModel)]="shortDescription" name="shortDescription"/>
                </div>
        </div> 
        <div class="row">
                <div class="col-xs-12">
                    <h4>Source code</h4>
                </div>
                <div class="col-xs-12">
                    <textarea cols="80" rows="10" [(ngModel)]="sourceCode" style="min-width: 100%;" name="sourceCode"></textarea>
                </div>
        </div> 
    `
})
export class AppComponent {
    @LocalStorage('XYZ') shortDescription: string;
    @LocalStorage('XYZ') sourceCode: string;
}
