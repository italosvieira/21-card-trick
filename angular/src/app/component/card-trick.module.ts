import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CardTrickComponent } from './card-trick.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    CardTrickComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [CardTrickComponent]
})
export class CardTrickModule {}
