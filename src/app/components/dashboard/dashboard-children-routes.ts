import { aboutChildrenRoutes } from "./main/about/about-children-routes";
import { authChildrenRoutes } from "./main/auth/auth-children-routes";
import { CartComponent } from "./main/cart/cart.component";
import { ContactUsComponent } from "./main/contact-us/contact-us.component";
import { councilsHallsChildrenRoutes } from "./main/councils-halls/councilsHalls-children-routes";
import { donationsChildrenRoutes } from "./main/donations/donations-children-routes";
import { emergencysChildrenRoutes } from "./main/emergencys/emergencys-children-routes";
import { LandingComponent } from "./main/landing/landing.component";
import { MediaComponent } from "./main/media/media.component";
import { policesChildrenRoutes } from "./main/polices/polices-children-routes";
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
  },
  {
    path: 'CouncilsHall',
    loadComponent: ()=>
      import('./main/councils-halls/councils-halls.component').then((c)=>
        c.CouncilsHallsComponent
      ),
      children: councilsHallsChildrenRoutes 
  },
  {
    path: 'Cart',
    component: CartComponent,
    pathMatch: 'full'
  },
  {
    path: 'Donations',
    loadComponent: ()=>
      import('./main/donations/donations.component').then((c)=>
        c.DonationsComponent
      ),
      children: donationsChildrenRoutes 
  },
  {
    path: 'AboutUs',
    loadComponent: ()=>
      import('./main/about/about.component').then((c)=>
        c.AboutComponent
      ),
      children: aboutChildrenRoutes 
  },
  {
    path: 'Polices',
    loadComponent: ()=>
      import('./main/polices/polices.component').then((c)=>
        c.PolicesComponent
      ),
      children: policesChildrenRoutes 
  },
  {
    path: 'Auth',
    loadComponent: ()=>
      import('./main/auth/auth.component').then((c)=>
        c.AuthComponent
      ),
      children: authChildrenRoutes 
  },
  {
    path: 'ContactUs',
    component: ContactUsComponent,
    pathMatch: 'full'
  },
  {
    path: 'MediaCenter',
    component: MediaComponent,
    pathMatch: 'full'
  },
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