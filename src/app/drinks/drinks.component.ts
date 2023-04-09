import { Component } from '@angular/core';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.scss']
})
export class DrinksComponent {
  drinks  = [
    {
      image: "assets/drinker.png",
      alt:"I wanna drink",
      TTS: "I wanna drink",
    },
    {
      image: "assets/water.png",
      alt:"water",
      TTS: "water",
    },
    {
      image: "assets/tea.png",
      alt:"tea",
      TTS: "tea",
    },
    {
      image: "assets/coffee.png",
      alt:"coffee",
      TTS: "coffee",
    },
    {
      image: "assets/juice.png",
      alt:"juice",
      TTS: "juice",
    },
    {
      image: "assets/redbull.png",
      alt:"Red Bull",
      TTS: "Red Bull",
    }
  ] 
  TTS(str: string){
    let msg = new SpeechSynthesisUtterance(str);
    window.speechSynthesis.speak(msg);
  }
}
