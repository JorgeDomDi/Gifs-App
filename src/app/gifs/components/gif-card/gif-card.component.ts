import { Component, Input, OnInit } from '@angular/core';
import { Gif } from '../../interface/gifs.interfaces';

@Component({
  selector: 'app-gif-card',
  templateUrl: './gif-card.component.html',
  styleUrl: './gif-card.component.css'
})
export class GifCardComponent implements OnInit{

@Input()
gif!:Gif;
ngOnInit(): void {
  if(!this.gif) throw new Error('Gif property is required')
}
}
