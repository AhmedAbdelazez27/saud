import { GeneralComponent } from "./general/general.component";
import { MemberComponent } from "./member/member.component";
import { StrategyComponent } from "./strategy/strategy.component";


export const aboutChildrenRoutes: any[] = [
    { path: '', redirectTo: 'General', pathMatch: 'full' },
    {
      path: 'General',
      component: GeneralComponent,
      pathMatch: 'full'
    },
    {
      path: 'Member',
      component: MemberComponent,
      pathMatch: 'full'
    },
    {
      path: 'Strategy',
      component: StrategyComponent,
      pathMatch: 'full'
    }
];
