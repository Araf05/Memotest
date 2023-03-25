const emojis = ['🕷','🐝','🐛','🦋','🐌','🐞','🐜','🪰','🦗','🪲']

/* constatntes variables que no se modifican*/

const selectors = {
    boardContainer: document.querySelector('.board-container'),
    board: document.querySelector('.board'),
    movimientos: document.querySelector('.moves'),
    tiempo: document.querySelector('.timer'),
    start: document.querySelector('#start'),
    restart: document.querySelector('#restart'),
    ganaste: document.querySelector('.win')
}

const state = {
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null
}

const dimension = selectors.board.getAttribute('data-dimension') // === 4

// CORE DEL MEMOTEST

const shuffle = array => {
    const clonedArray = [...array]

    for (let i = clonedArray.length -1; i > 0; i--) {
        const randomIndex = Math.floor( Math.random () * (i+1))
        const original = clonedArray[i]
        clonedArray[i] = clonedArray[randomIndex]
        clonedArray[randomIndex] = original
    }
    return clonedArray
}

const pickRandom = (array, items) => {
    const randomPicks = []

    for (let i = 0; i < items; i++) {
        const randomIndex = Math.floor (Math.random () * array.length)
        randomPicks.push(array[randomIndex])
        array.splice(randomIndex, 1)
    }
    return randomPicks
}

const validateDimension = () => {
    if ( dimension % 2 != 0) {
      throw new Error ('The dimension of the board must be an even number.')
    }
}

const generateGame = () => {
    validateDimension()
    const picks = pickRandom(emojis, dimension * dimension / 2)
    const items = shuffle([...picks, ...picks])
    const cards = items.reduce( (acc, element) => {
        return acc + `
            <div class='card'>
                <div class='card-front'></div>
                <div class='card-back'>
                    ${element}
                </div>
            </div>
        `
    }, "" )
    selectors.board.innerHTML = cards
}

generateGame()