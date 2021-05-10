import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CameraPageComponent } from './camera-page/camera-page.component';
import { MainPageComponent } from './main-page/main-page.component';

const routes: Routes = [
  { path: '',component: MainPageComponent},
  { path: 'camera',component: CameraPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
