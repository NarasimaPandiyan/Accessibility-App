import { Component } from '@angular/core';

@Component({
  selector: 'app-page1',
  templateUrl: './page1.component.html',
  styleUrls: ['./page1.component.scss']
})


export class Page1Component {
  Page1= [
    {
    image: "assets/YnN.png",
    alt:"Yes or NO",
    TTS: "Yes or NO",
    route: "/Yes-or-No"
  },
  {
    image: "assets/convo.png",
    alt:"Conversation",
    TTS: "Conversations",
    route: "/Conversations"
  },
  {
    image: "assets/Actions.png",
    alt:"Actions",
    TTS: "Actions",
    route: "/Actions"
  },
  {
    image: "assets/hygienic.png",
    alt:"Hygiene",
    TTS: "Hygiene",
    route: "/hygiene"
  },
  {
    image: "assets/drink.png",
    alt:"Drinks",
    TTS: "Drinks",
    route: "/drinks"
  },
  {
    image: "assets/food.png",
    alt:"Food",
    TTS: "Food",
    route: "/food"
  }
];

TTS(str: string){
  let msg = new SpeechSynthesisUtterance(str);
  window.speechSynthesis.speak(msg);
}
}
