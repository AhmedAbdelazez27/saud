import { EmergencyDetailsComponent } from "./emergency-details/emergency-details.component";
import { EmergencyListsComponent } from "./emergency-lists/emergency-lists.component";


export const emergencysChildrenRoutes: any[] = [
    { path: '', redirectTo: 'List', pathMatch: 'full' },
    {
      path: 'List',
      component: EmergencyListsComponent,
      pathMatch: 'full'
    },
    {
      path: 'Details/:emergencyId',
      component: EmergencyDetailsComponent,
      pathMatch: 'full'
    }
];
