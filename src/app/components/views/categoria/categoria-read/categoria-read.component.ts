import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../categoria.service';
import { Categoria } from '../categoria.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria-read',
  templateUrl: './categoria-read.component.html',
  styleUrls: ['./categoria-read.component.scss']
})
export class CategoriaReadComponent implements OnInit {

  categorias: Categoria[] = [];
  
  displayedColumns: string[] = ['id', 'nome', 'descricao', 'livros', 'acoes'];

  constructor(
    private service: CategoriaService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(): void {
    this.service.findAll().subscribe(response => {
      console.log(response);
      this.categorias = response;
    })
  }

  navegarParaCategoriaCreate(): void {
    this.router.navigate(["categorias/create"])
  }

}
