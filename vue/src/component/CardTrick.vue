<template>
  <div>
    <div class="button-container">
      <button type="button" class="button" v-bind:disabled="disableButton" v-bind:style="[errorFetchingDeck ? {'backgroundColor' : ''} : {'backgroundColor': '#4e9af1'}]" v-on:click="startGame()">{{getButtonText()}}</button>
    </div>

    <div v-if="isGameStarted && gameState > 0" class="flex-container-1 margin-top-5-percent">
      <div class="flex-container-2">
        <div class="flex-container-3" v-on:click="selectRow(1)">
          <div v-for="card in firstRow">
            <img v-bind:src="card.image" class="card">
          </div>
        </div>
      </div>

      <div class="flex-container-2">
        <div class="flex-container-3" v-on:click="selectRow(2)">
          <div v-for="card in secondRow">
            <img v-bind:src="card.image" class="card">
          </div>
        </div>
      </div>

      <div class="flex-container-2">
        <div class="flex-container-3" v-on:click="selectRow(3)">
          <div v-for="card in thirdRow">
            <img v-bind:src="card.image" class="card">
          </div>
        </div>
      </div>
    </div>

    <div id="gameResult" v-if="isGameStarted && gameState === 0">
      <div class="margin-top-5-percent">
        <div class="result-item">Is this your card?</div>
        <div class="result-item">
          <img v-bind:src="secondRow[3].image">
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Shuffle} from '@/model/shuffle';
import {Deck} from '@/model/deck';
import {Card} from '@/model/card';

@Component
export default class CardTrick extends Vue {
  private deck: Deck;
  private firstRow: Card[];
  private secondRow: Card[];
  private thirdRow: Card[];
  private errorFetchingDeck = false;
  private isGameStarted = false;
  private disableButton = false;
  private gameState = 3;

  private async getDeck() {
    let shuffle: Shuffle;

    try {
      shuffle = (await (await
              fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')).json()) as Shuffle;
    } catch (e) {
      console.log('Error fetching new shuffled deck of cards from API.');
      throw e;
    }

    try {
      return (await (await
              fetch(`https://deckofcardsapi.com/api/deck/${shuffle.deck_id}/draw/?count=21`)).json()) as Deck;
    } catch (e) {
      console.log('Error fetching new deck with 21 cards from API.');
      throw e;
    }
  }

  private getButtonText(): string {
    if (this.errorFetchingDeck) {
      return 'Try Again';
    }

    if (this.isGameStarted) {
      return 'Restart Game';
    } else {
      return 'Start Game';
    }
  }

  private async startGame() {
    this.disableButton = true;
    this.gameState = 3;
    this.clearRows();

    if (this.deck === null || this.deck === undefined) {
      try {
        this.deck = await this.getDeck();
        this.errorFetchingDeck = false;
      } catch (e) {
        this.errorFetchingDeck = true;
      }
    }

    if (!this.errorFetchingDeck) {
      this.isGameStarted = true;
      this.firstRow = this.deck.cards.slice(0, 7);
      this.secondRow = this.deck.cards.slice(7, 14);
      this.thirdRow = this.deck.cards.slice(14, 21);
    }

    this.disableButton = false;
  }

  private selectRow(row: number): void {
    this.gameState--;

    if (row === 1) {
      this.shuffleCards(this.secondRow.concat(this.firstRow).concat(this.thirdRow));
    } else if (row === 2) {
      this.shuffleCards(this.firstRow.concat(this.secondRow).concat(this.thirdRow));
    } else {
      this.shuffleCards(this.firstRow.concat(this.thirdRow).concat(this.secondRow));
    }
  }

  private shuffleCards(cards: Card[]): void {
    let count = 1;
    this.clearRows();

    cards.forEach((card) => {
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
</script>

<style scoped>
.button-container {
  display: flex;
  justify-content: center;
}

.button {
  padding:1.0em 5.0em;
  margin: 4px;
  border:0.16em solid rgba(255,255,255,0);
  border-radius:2em;
  box-sizing: border-box;
  color:#FFFFFF;
  text-shadow: 0 0.04em 0.04em rgba(0,0,0,0.35);
  text-align:center;
  transition: all 0.2s;
}

.button:hover {
  border-color: rgba(255,255,255,1);
}

.flex-container-2 {
  display: flex;
  justify-content: center;
  margin-top: 3%;
}

.flex-container-3 {
  display: flex;
}

.flex-container-3:hover {
  border:0.16em solid royalblue;
}

.card {
  height: 130px;
  width: 100px;
}

.margin-top-5-percent {
  margin-top: 5%;
}

.result-item {
  display: flex;
  justify-content: center;
  color: #FFFFFF;
}

@media only screen and (max-width: 982px) {
  .flex-container-1 {
    display: flex;
    justify-content: space-evenly;
  }

  .flex-container-3 {
    display: flex;
    flex-direction: column;
  }

  .flex-container-3:hover {
    border:0;
  }

  .button:hover {
    border: 0;
  }
}
</style>
