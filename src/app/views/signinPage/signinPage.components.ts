import { Component, output } from "@angular/core";
import User from "../../models/user";
import { LoginServices } from "../../services/Login.service";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { ProjectListComponent } from "../projectlist/projectList.components";
import { CommonModule } from "@angular/common";
import { AuthService } from "../../services/Auth.service";
import { ProjectCreateComponent } from "../projectCreate/projectCreate.components";

@Component({
    selector: 'signinPage',
    standalone: true,
    templateUrl: './signinPage.components.html',
    styleUrl: './signinPage.components.css',
    imports: [ProjectCreateComponent,ProjectListComponent,FormsModule,CommonModule]
})

export class SigninPageComponent{
    loginby = new User();
    isLoggedIn = false;
    onsub : boolean = false;
    seterr:boolean = false;
    constructor(private loginService: LoginServices, private router: Router,private authService: AuthService) { }
    
    onsubCheck(){
        this.onsub = !this.onsub
    }
    onSubmit(){
        this.loginService.Login(this.loginby).subscribe(
            (result) => {
                localStorage.setItem('Bearer', result.data.BearerToken);
                localStorage.setItem('UserId', result.data.UserId);
                localStorage.setItem('UserName', result.data.UserName);
                this.authService.login();
                this.router.navigate(['projectlist']);

            },
            (error:any) => {
                console.error(error);
                this.seterr=true;
            }
        );
    }

  
}