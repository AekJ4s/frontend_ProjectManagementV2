import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStatus = new BehaviorSubject<boolean>(this.hasToken());

  private hasToken(): boolean {
    return !!localStorage.getItem('authToken');
  }

  isAuthenticated() {
    return this.authStatus.asObservable();
  }

  login() {
    localStorage.setItem('authToken', 'your-token'); // จำลองการล็อกอิน
    this.authStatus.next(true);
  }

  logout() {
    localStorage.removeItem('authToken');
    this.authStatus.next(false);
  }
}
