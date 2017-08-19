import { Component, Input, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'error-messages',
  templateUrl: 'error-messages.html'
})
export class ErrorMessagesComponent {

  @Input('control') control: FormControl;
  errorMessages: any;

  constructor(public zone: NgZone) {

    this.errorMessages = {
    'required': 'This field must not be empty',
    'emailInUse': 'Sorry, you can\'t use this email address',
    'usernameInUse': 'Sorry, you can\'t use this username',
    'maxlength': 'Sorry, this field must be less than 30 characters',
    'pattern': 'Sorry, this field can only contain numbers letters'
    };

  }

  get errorMessage() {

    for(let error in this.control.errors) {
      if (this.control.errors.hasOwnProperty(error) && (this.control.touched || (this.control.asyncValidator !== null && !this.control.pristine))){
        return this.errorMessages[error];
      }
    }
    return null;
  }

}
