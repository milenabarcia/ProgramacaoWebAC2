import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InscricoesComponent } from './inscricoes/inscricoes.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'incricoes', component : InscricoesComponent},
  { path: '**', component: PaginaNaoEncontradaComponent }
];
