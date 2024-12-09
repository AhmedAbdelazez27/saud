import { DonationsDetailsComponent } from "./donations-details/donations-details.component";
import { DonationsListComponent } from "./donations-list/donations-list.component";


export const donationsChildrenRoutes: any[] = [
    { path: '', redirectTo: 'List', pathMatch: 'full' },
    {
      path: 'List',
      component: DonationsListComponent,
      pathMatch: 'full'
    },
    {
      path: 'Details/:donationId',
      component: DonationsDetailsComponent,
      pathMatch: 'full'
    }
];
