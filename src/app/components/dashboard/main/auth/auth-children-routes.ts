import { LoginComponent } from "./login/login.component";
import { RegisterationComponent } from "./registeration/registeration.component";


export const authChildrenRoutes: any[] = [
    { path: '', redirectTo: 'LogIn', pathMatch: 'full' },
    { path: 'LogIn',component: LoginComponent, pathMatch: 'full' },
    { path: 'Register', component: RegisterationComponent} ,

];
