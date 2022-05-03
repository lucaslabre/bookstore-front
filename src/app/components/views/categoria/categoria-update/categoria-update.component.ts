import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Categoria } from '../categoria.model';
import { CategoriaService } from '../categoria.service';

@Component({
  selector: 'app-categoria-update',
  templateUrl: './categoria-update.component.html',
  styleUrls: ['./categoria-update.component.scss']
})
export class CategoriaUpdateComponent implements OnInit {

  categoria: Categoria = {
    id: '',
    nome: '',
    descricao: ''
  }

  constructor(
    private service: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.categoria.id = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  findById(): void {
    this.service.findById(this.categoria.id!).subscribe((response) => {
      this.categoria = response;
    });
  }

  update(): void {
    this.service.update(this.categoria).subscribe((response) => {
      this.router.navigate(['/categorias']);
      this.service.mensagem('Categoria atualizada com sucesso!');
    }, err => {
      this.service.mensagem('Verifique se todos os campos estão preenchidos corretamente.')
    })
  }

  cancel(): void {
    this.router.navigate(['categorias']);
  }

}
