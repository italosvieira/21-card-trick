import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Deck} from '../model/deck';
import {Shuffle} from '../model/shuffle';

@Injectable({
  providedIn: 'root',
})
export class CardTrickService {
  constructor(private http: HttpClient) {}

  async getDeck(): Promise<Deck> {
    let shuffle;

    try {
      shuffle = await this.http.get<Shuffle>('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').toPromise();
    } catch (e) {
      console.log('Error fetching new shuffled deck of cards from API.');
      throw e;
    }

    try {
      return await this.http.get<Deck>(`https://deckofcardsapi.com/api/deck/${shuffle.deck_id}/draw/?count=21`).toPromise();
    } catch (e) {
      console.log('Error fetching new deck with 21 cards from API.');
      throw e;
    }
  }

}
