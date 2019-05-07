let deck
let firstRow = []
let secondRow = []
let thirdRow = []
let errorFetchingDeck = false
let gameState = 3

async function getDeck () {
  if (deck === null || deck === undefined) {
    let shuffle
    errorFetchingDeck = false

    try {
      shuffle = await (await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')).json()
    } catch (e) {
      onDeckFetchError('Error fetching new shuffled deck of cards from API.')
    }

    try {
      deck = await (await fetch(`https://deckofcardsapi.com/api/deck/${shuffle.deck_id}/draw/?count=21`)).json()
    } catch (e) {
      onDeckFetchError('Error fetching new deck with 21 cards from API.')
    }
  }
}

// eslint-disable-next-line no-unused-vars
async function startGame () {
  document.getElementById('overlay').onclick = null
  document.getElementById('startGameButton').disabled = true

  gameState = 3
  clearRows()
  clearGameResult()
  clearGameRows()

  await getDeck()

  if (!errorFetchingDeck) {
    firstRow = deck.cards.slice(0, 7)
    secondRow = deck.cards.slice(7, 14)
    thirdRow = deck.cards.slice(14, 21)
    creatGameRows()
    document.getElementById('startGameButton').style.backgroundColor = '#4e9af1'
    document.getElementById('startGameButton').textContent = 'Restart Game'
  }

  document.getElementById('startGameButtonContainer').style.display = 'flex'
  document.getElementById('gameMainContent').style.display = null
  document.getElementById('overlay').style.display = 'none'
  document.getElementById('startGameButton').disabled = false
}

// eslint-disable-next-line no-unused-vars
function selectRow (row) {
  gameState--

  if (row === 1) {
    shuffleCards(secondRow.concat(firstRow).concat(thirdRow))
  } else if (row === 2) {
    shuffleCards(firstRow.concat(secondRow).concat(thirdRow))
  } else {
    shuffleCards(firstRow.concat(thirdRow).concat(secondRow))
  }

  clearGameRows()

  if (gameState === 0) {
    displayGameResult()
  } else {
    creatGameRows()
  }
}

function shuffleCards (cards) {
  let count = 1
  clearRows()

  cards.forEach((card) => {
    if (count === 1) {
      firstRow.push(card)
      count++
    } else if (count === 2) {
      secondRow.push(card)
      count++
    } else {
      thirdRow.push(card)
      count = 1
    }
  })
}

function clearRows () {
  firstRow = []
  secondRow = []
  thirdRow = []
}

function displayGameResult () {
  const img = document.createElement('img')
  img.src = secondRow[3].image
  document.getElementById('gameResult').appendChild(img)
  document.getElementById('containerGameResult').style.display = 'block'
  document.getElementById('gameMainContent').style.display = 'none'
}

function clearGameResult () {
  const gameResult = document.getElementById('gameResult')

  if (gameResult.hasChildNodes()) {
    gameResult.removeChild(gameResult.childNodes[0])
  }

  document.getElementById('containerGameResult').style.display = 'none'
}

function clearGameRows () {
  const firstRowCards = document.getElementById('firstRowCards')
  const secondRowCards = document.getElementById('secondRowCards')
  const thirdRowCards = document.getElementById('thirdRowCards')

  while (firstRowCards.firstChild) {
    firstRowCards.removeChild(firstRowCards.firstChild)
  }

  while (secondRowCards.firstChild) {
    secondRowCards.removeChild(secondRowCards.firstChild)
  }

  while (thirdRowCards.firstChild) {
    thirdRowCards.removeChild(thirdRowCards.firstChild)
  }
}

function creatGameRows () {
  const firstRowCards = document.getElementById('firstRowCards')
  const secondRowCards = document.getElementById('secondRowCards')
  const thirdRowCards = document.getElementById('thirdRowCards')

  firstRow.forEach(c => {
    firstRowCards.appendChild(createCardElement(c))
  })

  secondRow.forEach(c => {
    secondRowCards.appendChild(createCardElement(c))
  })

  thirdRow.forEach(c => {
    thirdRowCards.appendChild(createCardElement(c))
  })
}

function createCardElement (card) {
  const div = document.createElement('div')
  const img = document.createElement('img')
  img.src = card.image
  img.className = 'card'
  div.appendChild(img)
  return div
}

function onDeckFetchError (msg) {
  errorFetchingDeck = true
  document.getElementById('startGameButton').style.backgroundColor = '#4A4A4A'
  document.getElementById('startGameButton').textContent = 'Try Again'
  console.log(msg)
}