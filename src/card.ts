export class Card {
    front: {
        text: string;
    }
    back: {
        text: string;
    }
    dueDate: Date;
    ease: number;

    constructor(front: string, back: string) {
        this.front = {text: front};
        this.back = {text: back};
        this.dueDate = new Date();
        this.dueDate.setHours(0,0,0); //Cards update at midnight
        this.ease = 1.0;
    }
}

export class Deck {
    cards: Card[];

    constructor() {
        this.cards = [];
    }
}

export function addCard(deck: Deck, card: Card) {
    if (!deck || !deck.cards) return {cards: [card]};
    return {cards: [...deck.cards, card]};
}