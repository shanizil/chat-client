import { Component, OnInit } from '@angular/core';
import  { DataService } from '../../data.service';
import { NgModel } from '@angular/forms';
import { Message } from '../../model/Message'
@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css']
})
export class ChatBotComponent implements OnInit {

messages:Message []= [];
result;
questionNum:number=1 ;
mess:string [];
corectAnswer:number [];
content="";
yes:boolean=false;


   constructor(private newService : DataService) { }
  ngOnInit() {
      let message = new Message("ברוכים הבאים , אני מומחה וירטואלי");
      this.messages.push(message);
       this.newService.getQuestionById( this.questionNum,(results) => {
         this.messages.push(
        new Message(results)
      );
      // this.newService.getQuestionById( this.questionNum,(results) => {
      // this.result = results;
      // this.messages.push(this.result);
       this.corectAnswer = new Array();
  });
}

send(content){
   this.yes=true;
  let message = new Message(content)
  this.messages.push(message)
  this.mess=content;
  console.log("mess",this.mess);
  this.content="";
  var j=0;
  if(this.mess.includes("לא")){
      this.questionNum++;
    
       this.corectAnswer.push(1);
      console.log("this.corectAnswer",this.corectAnswer)
       j++;
     this.newService.getQuestionById( this.questionNum,(results) => {
         this.messages.push(
        new Message(results)
      );
});
    
     return this.mess;
    
 }
  if(this.mess.includes("כן") || this.mess.includes("ברור")){
      this.questionNum++;
      this.corectAnswer.push(5);
      console.log("this.corectAnswer",this.corectAnswer)
      j++;
     this.newService.getQuestionById( this.questionNum,(results) => {
         this.messages.push(
        new Message(results)
      );
});
     
 }
 
 else{
     let message = new Message ("לא הבנתי אותך, אנא נסה שנית")
     this.messages.push(message);
 }
}
handleSubmit(event) {
    if (event.keyCode === 13) {
      this.send(this.content);
    }
  }
}


