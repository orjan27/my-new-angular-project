import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../../app/_models';
import { UserService, AuthenticationService } from '../../app/_services';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
    loading = false;
    users: User[];
    loggedInUser: User;

    constructor(private userService: UserService, private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
        this.loggedInUser = this.authenticationService.currentUserValue;
    }
}