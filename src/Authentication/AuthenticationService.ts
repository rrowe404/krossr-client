import { Inject, Injectable } from '@angular/core';
import { UserViewModel } from '@krossr/types';

/**
 * This should handle all interaction with the user information available to the client
 */
@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    private _user: UserViewModel;

    /** Accessed directly from the templates for user info */
    get user() {
        return this._user;
    }

    /** Set the user object */
    public signIn(user: UserViewModel) {
        this._user = user;
    }

    /**
     * Signing in a null user is the same thing as signing out.
     */
    public signOut() {
        this.signIn(null);
    }
}
