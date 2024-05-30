


import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from './services/Auth.service';
import { SigninPageComponent } from './views/signinPage/signinPage.components';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone:true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    SigninPageComponent,
    CommonModule,
    RouterModule,
    FormsModule,
    RouterOutlet,
  ],
})
export class AppComponent implements OnInit {
  title = 'Project Management Angular';
  timeupdate = Date();
  timenow = new Date();
  thailandTime: string = this.timenow.toLocaleString('en-US', { timeZone: 'Asia/Bangkok' });
  checkLogin: boolean = false;
  isAuthenticated = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.authService.isAuthenticated().subscribe(authStatus => {
      this.isAuthenticated = authStatus;
      this.checkLogin = authStatus;
      console.log(this.isAuthenticated);
      if (this.isAuthenticated) {
        this.router.navigate(['/projectlist']);
      } else {
        this.router.navigate(['/signinpage']);
      }
    });
  }

  takeToken() {
    this.authService.login();
  }

  signout() {
    this.authService.logout();
  }
}
