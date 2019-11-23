import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: [ './navbar.component.css' ]
})
export class NavbarComponent implements OnInit {
	private isLoggedIn: boolean;
	private loggedInUser: string;
	private showRegistration: boolean;

	constructor(private authService: AuthService, private router: Router, private flashMessage: FlashMessagesService) {}

	ngOnInit() {
		this.authService.getAuthState().subscribe((auth) => {
			auth ? ((this.isLoggedIn = true), (this.loggedInUser = auth.email)) : (this.isLoggedIn = false);
		});
	}

	onLogoutClick() {
		this.authService.logout();
		this.flashMessage.show('You are now logged out', {
			timeout: 4000,
			cssClass: 'alert-success'
		});
		this.router.navigate([ '/login' ]);
	}
}
