import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	constructor(private afAuth: AngularFireAuth) {}

	// Sign In
	login(email: string, password: string) {
		return new Promise((resolve, reject) => {
			this.afAuth.auth
				.signInWithEmailAndPassword(email, password)
				.then((userData) => resolve(userData), (err) => reject(err));
		});
	}

	// Check if user is logged in
	getAuthState() {
		return this.afAuth.authState.pipe(map((auth) => auth));
	}

	// Sign Out
	logout() {
		return this.afAuth.auth.signOut();
	}
}
