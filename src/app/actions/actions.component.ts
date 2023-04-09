import { Component } from '@angular/core';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent {
  Convo = [
    {
      image: "assets/walk.png",
      alt:"I want to walk",
      TTS: "I want to walk",
    },
    {
      image: "assets/nature.png",
      alt:"Go Outside",
      TTS: "I wanna get some fresh air",
    },
    {
      image: "assets/book.png",
      alt:"Read a book",
      TTS: "I want to read a book, can you pick one for me?",
    },
    {
      image: "assets/food.png",
      alt:"I want to eat",
      TTS: "I am hungry, can you get me something to eat?",
    },
    {
      image: "assets/book.png",
      alt:"read",
      TTS: "Can you read me this?",
    },
    {
      image: "assets/walk.png",
      alt:"Cross the street",
      TTS: "Can you help me cross the street?",
    }
  ] 
  TTS(str: string){
    let msg = new SpeechSynthesisUtterance(str);
    window.speechSynthesis.speak(msg);
  }
}
