import { Component } from '@angular/core';
import { tap } from 'rxjs';
import { Videojuego } from 'src/app/core/interfaces/videojuego';
import { VideojuegosService } from 'src/app/core/services/videojuegos.service';
import { AfterViewInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
	selector: 'app-videojuegos',
	templateUrl: './videojuegos.component.html',
	styleUrls: ['./videojuegos.component.scss'],
})
export class VideojuegosComponent {
	videojuegos!: Videojuego[] | null;
	videojuegosOrdenados!: Videojuego[] | null;
	videojuegosMostrados!: Videojuego[] | null;
	ordenacionActiva: string = 'videojuego_DES';
	paginaActiva: number = 1;

	constructor(private videojuegosService: VideojuegosService) { }

	ngOnInit() {
		this.getVideojuegos();
	}

	ngAfterViewInit(): void {
		window.scrollTo(0, 200); // Desplaza la ventana al borde superior
	}

	getVideojuegos(): void {
		this.videojuegosService
			.getVideojuegos()
			.pipe(
				tap((response: Videojuego[]) => {
					this.videojuegos = response;
					this.mostrarOrdenados(this.ordenacionActiva);
				})
			)
			.subscribe();
	}

	mostrarOrdenados(ordenacionActiva: string) {
		if (this.videojuegos) {
			this.videojuegosOrdenados = this.videojuegos;
			switch (ordenacionActiva) {
				case 'consola_DES':
					this.videojuegosOrdenados.sort((a, b) =>
						a.nombreConsola.localeCompare(b.nombreConsola)
					);
					break;
				case 'consola_ASC':
					this.videojuegosOrdenados.sort((a, b) =>
						b.nombreConsola.localeCompare(a.nombreConsola)
					);
					break;
				case 'videojuego_DES':
					this.videojuegosOrdenados.sort((a, b) =>
						a.nombreVideojuego.localeCompare(b.nombreVideojuego)
					);
					break;
				case 'videojuego_ASC':
					this.videojuegosOrdenados.sort((a, b) =>
						b.nombreVideojuego.localeCompare(a.nombreVideojuego)
					);
					break;
				case 'lanzamiento_DES':
					this.videojuegosOrdenados.sort(
						(a, b) =>
							new Date(a.fechaLanzamiento).getTime() -
							new Date(b.fechaLanzamiento).getTime()
					);
					break;
				case 'lanzamiento_ASC':
					this.videojuegosOrdenados.sort(
						(a, b) =>
							new Date(b.fechaLanzamiento).getTime() -
							new Date(a.fechaLanzamiento).getTime()
					);
					break;
				case 'precio_DES':
					this.videojuegosOrdenados.sort((a, b) => a.precio - b.precio);
					break;
				case 'precio_ASC':
					this.videojuegosOrdenados.sort((a, b) => b.precio - a.precio);
					break;
				case 'stock_DES':
					this.videojuegosOrdenados.sort((a, b) => a.stock - b.stock);
					break;
				case 'stock_ASC':
					this.videojuegosOrdenados.sort((a, b) => b.stock - a.stock);
					break;
				default:
					this.videojuegosOrdenados.sort((a, b) =>
						a.nombreConsola.localeCompare(b.nombreConsola)
					);
					break;
			}

			this.mostrarVideojuegos();


		}
	}

	mostrarVideojuegos() {

		if (this.videojuegosOrdenados) {
			var elementosPorPagina = 10;
			var paginaActiva = this.paginaActiva;
			var indiceInicio = (paginaActiva - 1) * elementosPorPagina;
			var indiceFin = indiceInicio + elementosPorPagina;
			this.videojuegosMostrados = this.videojuegosOrdenados.slice(indiceInicio, indiceFin);
			this.ngAfterViewInit();
		}
	}

	cambiarOrdenacion(ordenacion: string) {
		if (ordenacion == this.ordenacionActiva.split("_")[0]) {
			if (this.ordenacionActiva.split("_")[1] == "ASC") {
				this.ordenacionActiva = ordenacion + "_DES"
			} else {
				this.ordenacionActiva = ordenacion + "_ASC"
			}
		} else {
			this.ordenacionActiva = ordenacion + "_DES";
		}
		this.mostrarOrdenados(this.ordenacionActiva);
	}

	eliminarVideojuego(nombreVideojuego: string | undefined, consola: string) {


		Swal.fire({
			title: '¿Está seguro que desea borrar a este videojuego?',
			icon: 'warning',
			showDenyButton: true,
			confirmButtonColor: 'goldenrod',
			background: '#474747',
			color: '#ffffff',
			denyButtonColor: '#d33',
			confirmButtonText: 'Sí',
			denyButtonText: "Cancelar"
		}).then((result) => {
			if (result.isConfirmed && nombreVideojuego && consola) {
				this.videojuegosService
					.eliminarVideojuego(nombreVideojuego, consola)
					.pipe(
						tap((response) => {
							if (response) {
								this.getVideojuegos();
							}
						})
					)
					.subscribe();
			}
			else if (result.isDenied) {
				Swal.fire({
					background: '#474747',
					color: '#ffffff',
					title: 'No se ha borrado el videojuego',
					icon: 'info',
					confirmButtonColor: 'goldenrod'
				})
			}
		});
	}


	public roundToInteger(value: number): number {
	return Math.floor(value);
}

cambiaPagina(pagina: number) {
	if (this.videojuegosOrdenados) {
		if (pagina >= 1 && pagina <= (this.roundToInteger(this.videojuegosOrdenados.length / 10) + 1)) {
			this.paginaActiva = pagina;
			this.mostrarOrdenados(this.ordenacionActiva);
		}
	}
}
}
