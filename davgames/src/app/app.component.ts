import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'davgames';
  cargado:boolean = false;
  apareceScrollUp:boolean=false;
  ngOnInit(){
    setTimeout(() => {
      this.cargado = true;
    }, 100);
  }

  @HostListener('window:scroll', [])
  onWindowScroll(){
    console.log(document.documentElement.scrollTop)
    if(document.documentElement.scrollTop>= 400){
      this.apareceScrollUp=true
    }
    else{
      this.apareceScrollUp=false
    }
  }

  scrollUp(){
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  
}
