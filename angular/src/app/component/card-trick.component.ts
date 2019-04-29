import {Component, OnInit} from '@angular/core';
import {CardTrickService} from '../service/card-trick.service';
import {isNullOrUndefined} from 'util';
import {Card} from '../model/card';
import {Deck} from '../model/deck';

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
  disableButton = false;
  gameState = 3;
  displayOverlay = true;

  ngOnInit(): void {
    this.getDeckFromAPI();
  }

  async getDeckFromAPI() {
    if (isNullOrUndefined(this.deck)) {
      try {
        this.deck = await this.cardTrickService.getDeck();
        this.errorFetchingDeck = false;
      } catch (e) {
        this.errorFetchingDeck = true;
      }
    }
  }

  getButtonColor(): string {
    if (this.errorFetchingDeck) {
      return '';
    } else {
      return '#4e9af1';
    }
  }

  private getButtonText(): string {
    if (this.errorFetchingDeck) {
      return 'Try Again';
    } else {
      return 'Restart Game';
    }
  }

  isDisplayOverlay() {
    if (this.displayOverlay) {
      return 'block';
    } else {
      return 'none';
    }
  }

  async startGame() {
    this.disableButton = true;
    this.displayOverlay = false;
    this.gameState = 3;
    this.clearRows();

    await this.getDeckFromAPI();

    if (!this.errorFetchingDeck) {
      this.isGameStarted = true;
      this.firstRow = this.deck.cards.slice(0, 7);
      this.secondRow = this.deck.cards.slice(7, 14);
      this.thirdRow = this.deck.cards.slice(14, 21);
    }

    this.disableButton = false;
  }

  selectRow(row: number): void {
    this.gameState--;

    if (row === 1) {
      this.shuffleCards(this.secondRow.concat(this.firstRow).concat(this.thirdRow));
    } else if (row === 2) {
      this.shuffleCards(this.firstRow.concat(this.secondRow).concat(this.thirdRow));
    } else {
      this.shuffleCards(this.firstRow.concat(this.thirdRow).concat(this.secondRow));
    }
  }

  private shuffleCards(cards: Array<Card>): void {
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

  private clearRows(): void {
    this.firstRow = new Array<Card>();
    this.secondRow = new Array<Card>();
    this.thirdRow = new Array<Card>();
  }
}
