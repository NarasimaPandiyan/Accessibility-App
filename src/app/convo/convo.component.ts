import { Component } from '@angular/core';

@Component({
  selector: 'app-convo',
  templateUrl: './convo.component.html',
  styleUrls: ['./convo.component.scss']
})
export class ConvoComponent {
  Convo = [
    {
      image: "assets/greeting.png",
      alt:"Greetings",
      TTS: "Hi, How are you?",
    },
    {
      image: "assets/intro.png",
      alt:"Introduction",
      TTS: "My name is John Doe, I am 20 years old",
    },
    {
      image: "assets/speech-bubble.png",
      alt:"Greetings 2",
      TTS: "Glad to meet you",
    },
    {
      image: "assets/speech-bubble.png",
      alt:"What’s up?",
      TTS: "What’s up?",
    },
    {
      image: "assets/speech-bubble.png",
      alt:"I’m sorry, I don’t understand. Could you please repeat that?",
      TTS: "I’m sorry, I don’t understand. Could you please repeat that?",
    },
    {
      image: "assets/speech-bubble.png",
      alt:"Have a good day!",
      TTS: "Have a good day!",
    }
  ] 
  TTS(str: string){
    let msg = new SpeechSynthesisUtterance(str);
    window.speechSynthesis.speak(msg);
  }
}
