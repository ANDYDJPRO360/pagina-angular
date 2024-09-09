import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  //selector: 'app-root',
  //standalone: true,
  selector: 'my app',
templateUrl:'index.html',
styleUrl:'global_styles.css'
  
})
export class App {
  name = 'Andy';
  img='https://cdn2.thecatapi.com/images/49f.gif';
  //img='https://thecatapi.com/api/images/get?format=src&type=gif';
}

//export class App {
  //name = 'Andy';
//}

bootstrapApplication(App);
