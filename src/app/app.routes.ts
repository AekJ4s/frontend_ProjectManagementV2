import { Routes } from '@angular/router';
import { SigninPageComponent } from './views/signinPage/signinPage.components';
import { ProjectListComponent } from './views/projectlist/projectList.components';
import { ProjectCreateComponent } from './views/projectCreate/projectCreate.components';
import { ProjectUpdateComponents } from './views/projectUpdate/projectUpdate.components';
import { UploadFileComponent } from './views/uploadfile/uploadFile.components';
export const routes: Routes = [
    {path:'projectcreate',component: ProjectCreateComponent},
    {path:'projects/GetBy/:id',component: ProjectUpdateComponents},
    {path:'projectlist',component: ProjectListComponent},
    {path:'signinpage',component: SigninPageComponent},
    {path:'upload',component: UploadFileComponent},
];