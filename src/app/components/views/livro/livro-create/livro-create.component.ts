import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { LivroService } from '../livro.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Livro } from '../livro.model';

@Component({
  selector: 'app-livro-create',
  templateUrl: './livro-create.component.html',
  styleUrls: ['./livro-create.component.scss']
})
export class LivroCreateComponent implements OnInit {

  id_cat: String = '';

  titulo = new FormControl('', [Validators.minLength(3)]);
  nome_autor = new FormControl('', [Validators.minLength(3)]);
  texto = new FormControl('', [Validators.minLength(10)]);
  
  constructor(
    private service: LivroService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {  
    this.id_cat = this.route.snapshot.paramMap.get('id_cat')!;
  }

  create(): void {
    const livro = this.service.setLivroDefault(this.titulo.value, this.nome_autor.value, this.texto.value);

    this.service.create(livro, this.id_cat).subscribe((response) => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem('Livro criado com sucesso!');
    }, err => {
      this.router.navigate([`categorias/${this.id_cat}/livros`]);
      this.service.mensagem('Erro ao criar novo livro!');
    })
  }

  calcel(): void {
    this.router.navigate([`categorias/${this.id_cat}/livros`]);
  }

  getMessage() {
    if (this.titulo.invalid) {
      return 'O campo TÍTULO deve conter entre 3 e 100 caracteres';
    }
    else if (this.nome_autor.invalid) {
      return 'O campo NOME DO AUTOR deve conter entre 3 e 100 caracteres';
    }
    else if (this.texto.invalid) {
      return 'O campo TEXTO deve conter entre 10 e 100 caracteres';
    }
    return false;
  }

}
