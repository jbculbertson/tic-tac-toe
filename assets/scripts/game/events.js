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

const onChangePassword = function (event) {
  const data = getFormFields(this)
  console.log(data)
  event.preventDefault()
  api.changePassword(data)
    .then(ui.changePasswordSuccess)
    .catch(ui.changePasswordFailure)
}

const onSignOut = function (event) {
  const data = getFormFields(this)
  console.log(data)
  event.preventDefault()
  api.signOut(data)
    .then(ui.signOutSuccess)
    .catch(ui.signOutFailure)
}

let gameBoard = []
let totalMoves = 0
let winner = ''

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
    // onClearBoard()
    $('#message-banner').text(winner + ' is the winner!')
    totalMoves = 0
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
    // onClearBoard()
    $('#message-banner').text(winner + ' is the winner!')
    totalMoves = 0
  } else if (totalMoves > 8) {
    $('#message-banner').text('Game ends in a tie!')
  } else {
  }
}

// if (gameBoard[this.dataset.id] === '') {
//   $(this).text(whoseTurn)
// } else {
//   console.log('Already played')
// }
const onSelectCell = function () {
  $('#message-banner').text('Lets play')
  $(this).text(whoseTurn())
  $(this).off()
  // console.log(gameBoard[this.dataset.id])
  // if (gameBoard[this.dataset.id] === undefined || gameBoard[this.dataset.id] !== 'X' || gameBoard[this.dataset.id] !== 'O') {
  //   $(this).text(whoseTurn)
  // } else {
  //   $('.messages').text('Please click a cell that has not already been played')
  // }
  gameBoard[this.dataset.id] = whoseTurn()
  totalMoves += 1
  evaluateBoard(gameBoard)
}

const onClearBoard = function () {
  gameBoard = []
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
  onSelectCell,
  onClearBoard
}
