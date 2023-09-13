import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento-service.service';

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

  constructor(private service: PensamentoService) { }

  ngOnInit(): void {
    this.listarPensamentos()
  }

  listarPensamentos() {
    this.service.listar(this.paginaAtual, this.filtro).subscribe((pensamentos) => {
      this.listaPensamentos = pensamentos;
    });
  }

  carregarMaisPensamentos() {
    this.service.listar(++this.paginaAtual, this.filtro)
      .subscribe(pensamentos => {
        this.listaPensamentos.push(...pensamentos);
        if(!pensamentos.length) {
          this.temMaisPensamento = false;
        }
      })
  }

  pesquisarPensamentos() {
    this.temMaisPensamento = true;
    this.paginaAtual = 1;
    this.service.listar(this.paginaAtual, this.filtro)
      .subscribe(listaPensamentos => {
        this.listaPensamentos = listaPensamentos
      })
  }

}
