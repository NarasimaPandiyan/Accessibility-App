import { Component } from '@angular/core';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.scss']
})
export class FoodComponent {
  food  = [
    {
      image: "assets/eat.png",
      alt:"I wanna eat",
      TTS: "I wanna eat",
    },
    {
      image: "assets/rice.png",
      alt:"rice",
      TTS: "rice",
    },
    {
      image: "assets/noodles.png",
      alt:"noodles",
      TTS: "noodles",
    },
    {
      image: "assets/chicken.png",
      alt:"chicken",
      TTS: "chicken",
    },
    {
      image: "assets/salad.png",
      alt:"salad",
      TTS: "salad",
    },
    {
      image: "assets/dosa.png",
      alt:"dosa",
      TTS: "dosa",
    }
  ] 
  TTS(str: string){
    let msg = new SpeechSynthesisUtterance(str);
    window.speechSynthesis.speak(msg);
  }
}
