'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const api = require('./api')
const ui = require('./ui')

const onSignUp = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.signUp(data)
    .then(ui.signUpSuccess)
    .catch(ui.signUpFailure)
}

const onSignIn = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.signIn(data)
    .then(ui.signInSuccess)
    .catch(ui.signInFailure)
}

const onCreateGame = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  $('.box').off()
  gameBoard = []
  totalMoves = 0
  gameOver = false
  $('.box').text('')
  $('#0').on('click', onSelectCell)
  $('#1').on('click', onSelectCell)
  $('#2').on('click', onSelectCell)
  $('#3').on('click', onSelectCell)
  $('#4').on('click', onSelectCell)
  $('#5').on('click', onSelectCell)
  $('#6').on('click', onSelectCell)
  $('#7').on('click', onSelectCell)
  $('#8').on('click', onSelectCell)
  api.createGame(data)
    .then(ui.createGameSuccess)
    .catch(ui.createGameFailure)
  api.showGames(data)
    .then(ui.showGamesSuccess)
    .catch(ui.showGamesFailure)
}

const onChangePassword = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const onSignOut = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.signOut(data)
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

// const onShowGames = function (event) {
//   const data = getFormFields(this)
//   event.preventDefault()
//   api.showGames(data)
//     .then(ui.showGamesSuccess)
//     .catch(ui.showGamesFailure)
// }

const updateGame = function (data) {
  event.preventDefault()
  api.updateGame(data)
    .then(ui.updateGameSuccess)
    .catch(ui.updateGameFailure)
}

let gameBoard = []
let totalMoves = 0
let winner = ''
let gameOver = false
let turn = ''

const whoseTurn = function (num) {
  if (num % 2 === 0) {
    turn = 'X'
  } else {
    turn = 'O'
  }
}

const evaluateBoard = function (array) {
  if ((array[0] === 'X' && array[1] === 'X' && array[2] === 'X') ||
    (array[3] === 'X' && array[4] === 'X' && array[5] === 'X') ||
    (array[6] === 'X' && array[7] === 'X' && array[8] === 'X') ||
    (array[0] === 'X' && array[3] === 'X' && array[6] === 'X') ||
    (array[1] === 'X' && array[4] === 'X' && array[7] === 'X') ||
    (array[2] === 'X' && array[5] === 'X' && array[8] === 'X') ||
    (array[0] === 'X' && array[4] === 'X' && array[8] === 'X') ||
    (array[2] === 'X' && array[4] === 'X' && array[6] === 'X')) {
    winner = 'X'
    $('.box').off()
    $('#message-banner').text(winner + ' is the winner!')
    totalMoves = 0
    gameOver = true
  } else if ((array[0] === 'O' && array[4] === 'O' && array[8] === 'O') ||
    (array[2] === 'O' && array[4] === 'O' && array[6] === 'O') ||
    (array[0] === 'O' && array[1] === 'O' && array[2] === 'O') ||
    (array[3] === 'O' && array[4] === 'O' && array[5] === 'O') ||
    (array[6] === 'O' && array[7] === 'O' && array[8] === 'O') ||
    (array[0] === 'O' && array[3] === 'O' && array[6] === 'O') ||
    (array[1] === 'O' && array[4] === 'O' && array[7] === 'O') ||
    (array[2] === 'O' && array[5] === 'O' && array[8] === 'O')) {
    winner = 'O'
    $('.box').off()
    $('#message-banner').text(winner + ' is the winner!')
    totalMoves = 0
    gameOver = true
  } else if (totalMoves >= 8) {
    $('#message-banner').text('Game ends in a tie!')
    $('.box').off()
    totalMoves = 0
    gameOver = true
  } else {
    $('#message-banner').text('Game is in session!')
  }
}

const onSelectCell = function (event) {
  $('#message-banner').text('Lets play')
  $(this).off()
  whoseTurn(totalMoves)
  $(this).text(turn)
  gameBoard[this.dataset.id] = turn
  console.log(totalMoves)
  evaluateBoard(gameBoard)
  totalMoves++
  const index = this.dataset.id
  const value = turn
  const isOver = gameOver
  const data = {
    "game": {
      "cell": {
        "index": index,
        "value": value
      },
      "over": isOver
    }
  }
  updateGame(data)
}

module.exports = {
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  onCreateGame,
  // onShowGames
  onSelectCell,
  updateGame
}
