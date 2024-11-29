import { CouncilsHallDetailsComponent } from "./councils-hall-details/councils-hall-details.component";
import { CouncilsHallListsComponent } from "./councils-hall-lists/councils-hall-lists.component";
import { HallsDetialsComponent } from "./halls-detials/halls-detials.component";



export const councilsHallsChildrenRoutes: any[] = [
    { path: '', redirectTo: 'List', pathMatch: 'full' },
    {
      path: 'List',
      component: CouncilsHallListsComponent,
      pathMatch: 'full'
    },
    {
      path: 'CouncilDetails/:councilId',
      component: CouncilsHallDetailsComponent,
      pathMatch: 'full'
    },
    {
      path: 'HallsDetails/:hallId',
      component: HallsDetialsComponent,
      pathMatch: 'full'
    }
];
