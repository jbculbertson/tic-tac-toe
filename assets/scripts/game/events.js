'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const api = require('./api')
const ui = require('./ui')
const store = require('../store')

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

const onCreateGame = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.createGame(data)
    .then(ui.createGameSuccess)
    .catch(ui.createGameFailure)
}

const onShowGames = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.showGames(data)
    .then(ui.showGamesSuccess)
    .catch(ui.showGamesFailure)
}

const onShowOneGame = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.showOneGame(data)
    .then(ui.showOneGameSuccess)
    .catch(ui.showOneGameFailure)
}

const onJoinGame = function (event) {
  const data = getFormFields(this)
  event.preventDefault()
  api.joinGame(data)
    .then(ui.joinGameSuccess)
    .catch(ui.joinGameFailure)
}

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

const whoseTurn = function (array) {
  if (totalMoves % 2 === 0) {
    return 'X'
  } else {
    return 'O'
  }
}
const evaluateBoard = function () {
  if ((gameBoard[0] === 'X' && gameBoard[1] === 'X' && gameBoard[2] === 'X') ||
    (gameBoard[3] === 'X' && gameBoard[4] === 'X' && gameBoard[5] === 'X') ||
    (gameBoard[6] === 'X' && gameBoard[7] === 'X' && gameBoard[8] === 'X') ||
    (gameBoard[0] === 'X' && gameBoard[3] === 'X' && gameBoard[6] === 'X') ||
    (gameBoard[1] === 'X' && gameBoard[4] === 'X' && gameBoard[7] === 'X') ||
    (gameBoard[2] === 'X' && gameBoard[5] === 'X' && gameBoard[8] === 'X') ||
    (gameBoard[0] === 'X' && gameBoard[4] === 'X' && gameBoard[8] === 'X') ||
    (gameBoard[2] === 'X' && gameBoard[4] === 'X' && gameBoard[6] === 'X')) {
    winner = 'X'
    $('.box').off()
    $('#message-banner').text(winner + ' is the winner!')
    totalMoves = 0
    gameOver = true
  } else if ((gameBoard[0] === 'O' && gameBoard[4] === 'O' && gameBoard[8] === 'O') ||
    (gameBoard[2] === 'O' && gameBoard[4] === 'O' && gameBoard[6] === 'O') ||
    (gameBoard[0] === 'O' && gameBoard[1] === 'O' && gameBoard[2] === 'O') ||
    (gameBoard[3] === 'O' && gameBoard[4] === 'O' && gameBoard[5] === 'O') ||
    (gameBoard[6] === 'O' && gameBoard[7] === 'O' && gameBoard[8] === 'O') ||
    (gameBoard[0] === 'O' && gameBoard[3] === 'O' && gameBoard[6] === 'O') ||
    (gameBoard[1] === 'O' && gameBoard[4] === 'O' && gameBoard[7] === 'O') ||
    (gameBoard[2] === 'O' && gameBoard[5] === 'O' && gameBoard[8] === 'O')) {
    winner = 'O'
    $('.box').off()
    $('#message-banner').text(winner + ' is the winner!')
    totalMoves = 0
    gameOver = true
  } else if (totalMoves > 8) {
    $('#message-banner').text('Game ends in a tie!')
    totalMoves = 0
    gameOver = true
  } else {
    $('#message-banner').text('Game is in session!')
  }
}

const onSelectCell = function (event) {
  $('#message-banner').text('Lets play')
  $(this).text(whoseTurn())
  $(this).off()
  gameBoard[this.dataset.id] = whoseTurn()
  evaluateBoard(gameBoard)
  const index = this.dataset.id
  const value = whoseTurn()
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
  totalMoves += 1
}

const onClearBoard = function () {
  gameBoard = []
  totalMoves = 0
  gameOver = false
  $('#0').on('click', onSelectCell).text('')
  $('#1').on('click', onSelectCell).text('')
  $('#2').on('click', onSelectCell).text('')
  $('#3').on('click', onSelectCell).text('')
  $('#4').on('click', onSelectCell).text('')
  $('#5').on('click', onSelectCell).text('')
  $('#6').on('click', onSelectCell).text('')
  $('#7').on('click', onSelectCell).text('')
  $('#8').on('click', onSelectCell).text('')
}

module.exports = {
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  onCreateGame,
  onShowGames,
  onShowOneGame,
  onSelectCell,
  onClearBoard,
  onJoinGame,
  updateGame
}
