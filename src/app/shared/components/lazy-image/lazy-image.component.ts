import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrl: './lazy-image.component.css'
})
export class LazyImageComponent {

  @Input()
  url: string = "";
  @Input()
  alt: string = "";
   hasloaded:boolean=false;
  onLoad(){
   setTimeout(() => {
    this.hasloaded=true;
   }, 1000);
  }

}
