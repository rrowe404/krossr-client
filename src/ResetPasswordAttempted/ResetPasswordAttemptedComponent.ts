import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'krossr-reset-password-attempted',
    templateUrl: './ResetPasswordAttemptedView.html'
})
export class ResetPasswordAttemptedComponent {
    message = 'If your username exists, an email will be sent to the address associated with your account.';
}
