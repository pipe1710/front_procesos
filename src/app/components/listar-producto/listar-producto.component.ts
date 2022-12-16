import { Component, OnInit } from '@angular/core';
import {ProductoService} from "../../services/producto.service";
import {Category, Producto} from "../../models/producto";
import {ToastrService} from "ngx-toastr";
import {AuthService} from "../../services/auth.service";


@Component({
  selector: 'app-listar-producto',
  templateUrl: './listar-producto.component.html',
  styleUrls: ['./listar-producto.component.scss']
})
export class ListarProductoComponent implements OnInit {
  ListProducts: Producto[] = [];
  categories: Category[] = [];

  constructor(private _productoService: ProductoService,
              private toastr: ToastrService,
              private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.obtenerProductos();
  }

  obtenerProductos() {
    this._productoService.getProductos().subscribe(data => {
      this.ListProducts = data;
      console.log(data)
    }, error => {
      console.log(error);
    });
  }

  eliminarProducto(id: any) {
    this._productoService.eliminarProducto(id).subscribe(data => {
      this.toastr.error('El producto fue eliminado exitosamente', 'Producto eliminado');
      this.obtenerProductos();
    },error => {
      console.log(error);
    });
  }

  logout() {
    this.auth.logout();
  }
}
