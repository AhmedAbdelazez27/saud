import { CouncilsHallDetailsComponent } from "./councils-hall-details/councils-hall-details.component";
import { CouncilsHallListsComponent } from "./councils-hall-lists/councils-hall-lists.component";



export const councilsHallsChildrenRoutes: any[] = [
    { path: '', redirectTo: 'List', pathMatch: 'full' },
    {
      path: 'List',
      component: CouncilsHallListsComponent,
      pathMatch: 'full'
    },
    {
      path: 'Details/:emergencyId',
      component: CouncilsHallDetailsComponent,
      pathMatch: 'full'
    }
];
