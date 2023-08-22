import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CitiesComponent } from "./components/cities/cities.component";
import { CityDetailsComponent } from "./components/city-details/city-details.component";

const routes: Routes = [
  { path: 'cities', component: CitiesComponent },
  { path: 'cities/:id', component: CityDetailsComponent },
  { path: '**', redirectTo: 'cities' },
  { path: '', redirectTo: 'cities', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}