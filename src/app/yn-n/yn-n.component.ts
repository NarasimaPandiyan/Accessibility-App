import { Component } from '@angular/core';

@Component({
  selector: 'app-yn-n',
  templateUrl: './yn-n.component.html',
  styleUrls: ['./yn-n.component.scss']
})
export class YnNComponent {
  YrN = [
    {
    image: "assets/yes.png",
    alt:"Yes",
    TTS: "Yes",
    },
    {
    image: "assets/no.png",
    alt:"No",
    TTS: "No",
    },
    {
      image: "assets/maybe.png",
      alt:"Maybe",
      TTS: "Maybe",
    },
    {
      image: "assets/ok.png",
      alt:"OK",
      TTS: "OK",
    },
    {
      image: "assets/stop.png",
      alt:"Stop",
      TTS: "Stop",
    },
    {
      image: "assets/please.png",
      alt:"Please",
      TTS: "Please",
    }
  ] 
  TTS(str: string){
    let msg = new SpeechSynthesisUtterance(str);
    window.speechSynthesis.speak(msg);
  }
}
