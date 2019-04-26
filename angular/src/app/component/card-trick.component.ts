import {Component, OnInit} from '@angular/core';
import {CardTrickService} from '../service/card-trick.service';

@Component({
  selector: 'app-root',
  templateUrl: './card-trick.component.html',
  styleUrls: ['./card-trick.component.scss']
})
export class CardTrickComponent implements OnInit {
  constructor(private cardTrickService: CardTrickService) {}

  deck: Deck;

  async ngOnInit() {
    this.deck = await this.cardTrickService.getDeck();
  }

}
