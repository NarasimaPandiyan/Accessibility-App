import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Page1Component } from './page1/page1.component';
import { YnNComponent } from './yn-n/yn-n.component';
import { ConvoComponent } from './convo/convo.component';
import { ActionsComponent } from './actions/actions.component';
import { HygComponent } from './hyg/hyg.component';
import { DrinksComponent } from './drinks/drinks.component';
import { FoodComponent } from './food/food.component';


const routes: Routes = [
  { path: '', component: Page1Component },
  { path: 'Yes-or-No', component: YnNComponent },
  { path: 'Conversations', component: ConvoComponent },
  { path: 'Actions', component: ActionsComponent },
  { path: 'hygiene', component: HygComponent },
  { path: 'drinks', component: DrinksComponent },
  { path: 'food', component: FoodComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
