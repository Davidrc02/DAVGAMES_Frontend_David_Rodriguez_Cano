import { Component } from '@angular/core';

@Component({
  selector: 'app-ventana-modal',
  templateUrl: './ventana-modal.component.html',
  styleUrls: ['./ventana-modal.component.scss']
})
export class VentanaModalComponent {
  showModal: boolean = false;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.showModal = true;
    }, 500);
  }

  hideModal() {
    this.showModal = false;
  }
}
