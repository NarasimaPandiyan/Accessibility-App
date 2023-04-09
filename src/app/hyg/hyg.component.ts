import { Component } from '@angular/core';

@Component({
  selector: 'app-hyg',
  templateUrl: './hyg.component.html',
  styleUrls: ['./hyg.component.scss']
})
export class HygComponent {
  hyg = [
    {
      image: "assets/bath.png",
      alt:"Bath",
      TTS: "I gonna take bath",
    },
    {
      image: "assets/brush.png",
      alt:"brush",
      TTS: "I gonna brush my teeth",
    },
    {
      image: "assets/wash.png",
      alt:"wash",
      TTS: "I wanna wash my",
    },
    {
      image: "assets/face.png",
      alt:"face",
      TTS: "face",
    },
    {
      image: "assets/washing.png",
      alt:"hand",
      TTS: "hands",
    },
    {
      image: "assets/hair-washing.png",
      alt:"Hair",
      TTS: "Hair",
    }
  ] 
  TTS(str: string){
    let msg = new SpeechSynthesisUtterance(str);
    window.speechSynthesis.speak(msg);
  }
}
