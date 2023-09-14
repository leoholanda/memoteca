import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pensamentos',
  templateUrl: './listar-pensamentos.component.html',
  styleUrls: ['./listar-pensamentos.component.css']
})
export class ListarPensamentosComponent implements OnInit {

  listaPensamentos: Pensamento[] = [];
  paginaAtual: number = 1;
  temMaisPensamento: boolean = true;
  filtro: string = '';
  favoritos: boolean = false;
  listaFavoritos: Pensamento[] = [];
  titulo: string = 'Meu Mural';

  constructor(
    private service: PensamentoService,
    private router: Router) { }

  ngOnInit(): void {
    this.listarPensamentos()
  }

  listarPensamentos() {
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe((pensamentos) => {
      this.listaPensamentos = pensamentos;
    });
  }

  listarFavoritos() {
    this.temMaisPensamento = true;
    this.paginaAtual = 1;
    this.favoritos = true;
    this.titulo = 'Meus Favoritos';

    this.service.listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe((pensamentos) => {
        this.listaPensamentos = pensamentos;
        this.listaFavoritos = pensamentos;
      });
  }

  carregarMaisPensamentos() {
    this.service.listar(++this.paginaAtual, this.filtro, this.favoritos)
      .subscribe(pensamentos => {
        this.listaPensamentos.push(...pensamentos);
        if(!pensamentos.length) {
          this.temMaisPensamento = false;
        }
      });
  }

  pesquisarPensamentos() {
    this.temMaisPensamento = true;
    this.paginaAtual = 1;
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos)
      .subscribe(listaPensamentos => {
        this.listaPensamentos = listaPensamentos
      });
  }

  recarregarComponente() {
    this.favoritos = false;
    this.paginaAtual = 1;

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload'
    this.router.navigate([this.router.url])
  }

}
