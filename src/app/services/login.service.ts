import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { Login, User } from '../../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly http = inject(HttpClient);

  private readonly currentUserSubject =
    new BehaviorSubject<User | null>(this.getStoredUser());

  readonly currentUser$ = this.currentUserSubject.asObservable();

  login(login: Login) {
    return this.http
      .post<User>('https://dummyjson.com/auth/login', login)
      .pipe(
        tap(user => {
          this.currentUserSubject.next(user);
          localStorage.setItem('user', JSON.stringify(user));
        })
      );
  }

  logout() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('user');
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  get token(): string | null {
    return this.currentUser?.accessToken ?? null;
  }

  get isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  private getStoredUser(): User | null {
    const user = localStorage.getItem('user');

    return user ? JSON.parse(user) : null;
  }
}