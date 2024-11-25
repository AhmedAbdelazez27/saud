import { emergencysChildrenRoutes } from "./main/emergencys/emergencys-children-routes";
import { LandingComponent } from "./main/landing/landing.component";
import { servicesChildrenRoutes } from "./main/services/services-children-routes";

export const dashBoardChildrenRoutes: any[] = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  {
    path: 'Home',
    component: LandingComponent,
    pathMatch: 'full'
  },
  {
    path: 'Services',
    loadComponent: ()=>
      import('./main/services/services.component').then((c)=>
        c.ServicesComponent
      ),
      children: servicesChildrenRoutes 
  },
  {
    path: 'Emergency',
    loadComponent: ()=>
      import('./main/emergencys/emergencys.component').then((c)=>
        c.EmergencysComponent
      ),
      children: emergencysChildrenRoutes 
  }
  
  // Errors
//   {
//     path: ':lang/Errors',
//     loadComponent: () =>
//       import('./../../components/errors/errors.component').then(
//         (c) => c.ErrorsComponent
//       ),
//     children: errorsChildrenRoutes
//   },
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