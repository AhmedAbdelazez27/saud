import { PolicesoneComponent } from "./policesone/policesone.component";
import { PolicestwoComponent } from "./policestwo/policestwo.component";



export const policesChildrenRoutes: any[] = [
    { path: '', redirectTo: 'Police', pathMatch: 'full' },
    {
      path: 'Police',
      component: PolicesoneComponent,
      pathMatch: 'full'
    },
    {
      path: 'Police2',
      component: PolicestwoComponent,
      pathMatch: 'full'
    }
];
