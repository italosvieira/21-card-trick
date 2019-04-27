import {Card} from './card';

export interface Deck {
  deck_id: string;
  remaining: number;
  success: boolean;
  cards: Card[];
}
