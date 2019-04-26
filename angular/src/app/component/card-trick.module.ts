import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CardTrickComponent } from './card-trick.component';

@NgModule({
  declarations: [
    CardTrickComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [CardTrickComponent]
})
export class CardTrickModule {}
