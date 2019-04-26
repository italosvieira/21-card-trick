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
  firstRow: Array<Card>;
  secondRow: Array<Card>;
  thirdRow: Array<Card>;
  errorFetchingDeck = false;
  isGameStarted = false;

  async ngOnInit() {
    try {
      this.deck = await this.cardTrickService.getDeck();
    } catch (e) {
      this.errorFetchingDeck = true;
    }
  }

  startGame(): void {
    if (!this.isGameStarted && !this.errorFetchingDeck) {
      this.isGameStarted = true;
      this.firstRow = this.deck.cards.slice(0, 7);
      this.secondRow = this.deck.cards.slice(7, 14);
      this.thirdRow = this.deck.cards.slice(14, 21);
    }
  }

  restartGame(): void {
    this.isGameStarted = false;
    this.clearRows();
  }

  selectRow(row: number): void {
    if (row === 1) {
      this.shuffleCards(this.secondRow.concat(this.firstRow).concat(this.thirdRow));
    } else if (row === 2) {
      this.shuffleCards(this.firstRow.concat(this.secondRow).concat(this.thirdRow));
    } else {
      this.shuffleCards(this.firstRow.concat(this.thirdRow).concat(this.secondRow));
    }
  }

  shuffleCards(cards: Array<Card>): void {
    let count = 1;
    this.clearRows();

    cards.forEach(card => {
      if (count === 1) {
        this.firstRow.push(card);
        count++;
      }  else if (count === 2) {
        this.secondRow.push(card);
        count++;
      } else {
        this.thirdRow.push(card);
        count = 1;
      }
    });
  }

  clearRows(): void {
    this.firstRow = new Array<Card>();
    this.secondRow = new Array<Card>();
    this.thirdRow = new Array<Card>();
  }
}
