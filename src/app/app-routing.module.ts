import {NgModule} from '@angular/core';
import {Router, RouterModule, Routes} from '@angular/router';
import { CamundaCockpit } from './camunda-cockpit/camunda-cockpit.component';

const routes: Routes = [
  {
    path: 'camunda-cockpit',
    component: CamundaCockpit,
    data: {
      title: 'Camunda Cockpit',
      recht: ['ROLE_ADMIN'],
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor(
    private router: Router,
  ) {
    // errorHandler on error route to home
    this.router.errorHandler = () => {
      this.router.navigate(['']);
    };
  }
}
