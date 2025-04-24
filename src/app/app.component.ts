import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuSuperiorComponent } from './menu-superior/menu-superior.component';
import { HomeComponent } from './home/home.component';
import { InscricoesComponent } from './inscricoes/inscricoes.component';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada/pagina-nao-encontrada.component';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenuSuperiorComponent, HomeComponent, InscricoesComponent, PaginaNaoEncontradaComponent, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project';
}
