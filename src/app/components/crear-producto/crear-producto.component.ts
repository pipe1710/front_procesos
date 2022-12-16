import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category, Producto } from '../../models/producto';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductoService } from '../../services/producto.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: [ './crear-producto.component.scss' ]
})
export class CrearProductoComponent implements OnInit {
  productForm: FormGroup;
  titulo = 'Crear Producto';
  id: string | null;
  categories: Category[] = [];

  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private _prouctoService: ProductoService,
              private _category: CategoryService,
              private aRouter: ActivatedRoute) {

    this.productForm = this.fb.group({
      articleCode: [ '', Validators.required ],
      articleName: [ '', Validators.required ],
      articleDescription: [ '', Validators.required ],
      category: [ '', Validators.required ],
      articleSalePrice: [ '', Validators.required ],
      articleStock: [ '', Validators.required ],
      articlePurchasePrice: [ '', Validators.required ],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.esEditar();
    this.getCategories();
  }

  getCategories() {
    this._category.getAll().subscribe(data => {
      this.categories = data;
    }, error => {
      console.log(error);
    });
  }

  agregarProducto() {
    if (this.productForm.invalid){
      this.toastr.error('Datos incompletos...', 'Error');
      return;
    }

    const PRODUCTO: Producto = {
      articleCode: this.productForm.get('articleCode')?.value,
      articleName: this.productForm.get('articleName')?.value,
      articleDescription: this.productForm.get('articleDescription')?.value,
      articleStock: this.productForm.get('articleStock')?.value,
      category: {
        categoryId: this.productForm.get('category')?.value
      },
      articleSalePrice: this.productForm.get('articleSalePrice')?.value,
      articlePurchasePrice: this.productForm.get('articlePurchasePrice')?.value,
    }

    if (this.id !== null) {
      this._prouctoService.editarProducto(this.id, PRODUCTO).subscribe(data => {
        this.toastr.success('Producto actualizado exitosamente', 'Producto actualizado');
        this.router.navigate([ '/list_product' ]);
      }, error => {
        this.toastr.error('Tenemos probemas, reintente mas tarde...', 'Error');
      });
    } else {
      this._prouctoService.guardarProducto(PRODUCTO).subscribe(data => {
        this.toastr.success('Producto agregado exitosamente', 'Producto agregado');
        this.router.navigate([ '/list_product' ]);
      }, error => {
        this.toastr.error('Tenemos probemas, reintente mas tarde...', 'Error');
      });
    }
  }

  esEditar() {
    if (this.id !== null) {
      this.titulo = 'Editar Producto';
      this._prouctoService.obtenerProducto(this.id).subscribe(data => {
        this.productForm.setValue({
          articleCode: data.articleCode,
          articleName: data.articleName,
          articleDescription: data.articleDescription,
          category: data.category.categoryId,
          articleSalePrice: data.articleSalePrice,
          articleStock: data.articleStock,
          articlePurchasePrice: data.articlePurchasePrice,
        });
      });
    }
  }
}
