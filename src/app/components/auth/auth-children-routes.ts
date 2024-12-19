// Services

import { RegisterationComponent } from "../dashboard/main/auth/registeration/registeration.component";
import { LoginComponent } from "./login/login.component";



export const authChildrenRoutes: any[] = [
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  { path: '', redirectTo: 'Register', pathMatch: 'full' },
  {
    path: 'Login',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'Register',
    component: RegisterationComponent,
    pathMatch: 'full'  },
//   {
//     path: 'Errors',
//     loadComponent: () =>
//       import('./../../components/errors/errors.component').then(
//         (c) => c.ErrorsComponent
//       ),
//     children: errorsChildrenRoutes
//   },
//   { path: '**', redirectTo: '/en/Errors' } // Redirect all unknown paths to '/Errors'
];