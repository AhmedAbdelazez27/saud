import { ServiceDetailsComponent } from "./service-details/service-details.component";
import { ServicesListsComponent } from "./services-lists/services-lists.component";

export const servicesChildrenRoutes: any[] = [
    { path: '', redirectTo: 'List', pathMatch: 'full' },
    {
      path: 'List',
      component: ServicesListsComponent,
      pathMatch: 'full'
    },
    {
      path: 'Details/:serviceId',
      component: ServiceDetailsComponent,
      pathMatch: 'full'
    }
];
