import { AmbulanceInnerComponent } from "./ambulance-inner/ambulance-inner.component";
import { FoodInnerComponent } from "./food-inner/food-inner.component";
import { ServiceDetailsComponent } from "./service-details/service-details.component";
import { ServicesListsComponent } from "./services-lists/services-lists.component";
import { TransportInnerComponent } from "./transport-inner/transport-inner.component";
import { VolunteerInnerComponent } from "./volunteer-inner/volunteer-inner.component";

export const servicesChildrenRoutes: any[] = [
    { path: '', redirectTo: 'List', pathMatch: 'full' },
    {
      path: 'List',
      component: ServicesListsComponent,
      pathMatch: 'full'
    },
    {
      path: 'ClothesDetails',
      component: ServiceDetailsComponent,
      pathMatch: 'full'
    },
    {
      path: 'FoodDetails',
      component: FoodInnerComponent,
      pathMatch: 'full'
    },
    {
      path: 'VolunteerDetails',
      component: VolunteerInnerComponent,
      pathMatch: 'full'
    },
    {
      path: 'TransportDetails',
      component: TransportInnerComponent,
      pathMatch: 'full'
    },
    {
      path: 'AmbulanceDetails',
      component: AmbulanceInnerComponent,
      pathMatch: 'full'
    }
];
