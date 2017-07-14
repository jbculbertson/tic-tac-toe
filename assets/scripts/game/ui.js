'use strict'
const store = require('../store')

const signUpSuccess = (data) => {
  store.user = data.user
  $('#sign-up-Modal').modal('hide')
  $('#message-banner').text('Thanks for signing up ' + store.user.email + '.  Please login.')
}
const signUpFailure = () => {
  $('#message-banner').text('We may already have an account with that email')
}

const signInSuccess = (data) => {
  store.user = data.user
  $('#sign-in-Modal').modal('hide')
  $('#message-banner').text('Welcome back ' + store.user.email + '.  Please click Create Game.')
  $('.logged-in').css('display', 'inline')
  $('#sign-up-button').hide()
  $('#sign-in-button').hide()
  $('#stats-banner').css('display', 'block')
  $('.box').text('')
  $('.box').off()
}
const signInFailure = () => {
  $('#message-banner').text('Please make sure you have the correct credentials')
}

const signOutSuccess = () => {
  $('.logged-in').css('display', 'none')
  $('#sign-up-button').show()
  $('#sign-in-button').show()
  $('#stats-banner').text('')
  // $('.box').text('')
  // $('.box').off()
  $('#message-banner').text('Thanks for playing, ' + store.user.email + '!')
  $('.gameboard').fadeOut(500).css('display', 'none')
  $('.sign-in').val('')
  $('.sign-up').val('')
}

const signOutFailure = () => {
}

const changePasswordSuccess = () => {
  $('#change-password-Modal').modal('hide')
  $('#message-banner').text('Successfully changed password')
}
const changePasswordFailure = () => {
  $('#message-banner').text('Incorrect credentials')
}

const createGameSuccess = (data) => {
  store.game = data.game
  $('#create-game-Modal').modal('hide')
  $('#message-banner').text('User ' + store.user.email + ' goes first, as X.')
  $('.gameboard').fadeIn(500).css('display', 'block')
}

const createGameFailure = () => {
}

const showGamesSuccess = (data) => {
  const evaluateBoard = function (array) {
    if ((array[0] === 'X' && array[1] === 'X' && array[2] === 'X') ||
      (array[3] === 'X' && array[4] === 'X' && array[5] === 'X') ||
      (array[6] === 'X' && array[7] === 'X' && array[8] === 'X') ||
      (array[0] === 'X' && array[3] === 'X' && array[6] === 'X') ||
      (array[1] === 'X' && array[4] === 'X' && array[7] === 'X') ||
      (array[2] === 'X' && array[5] === 'X' && array[8] === 'X') ||
      (array[0] === 'X' && array[4] === 'X' && array[8] === 'X') ||
      (array[2] === 'X' && array[4] === 'X' && array[6] === 'X')) {
      return 'X'
    } else if ((array[0] === 'O' && array[4] === 'O' && array[8] === 'O') ||
      (array[2] === 'O' && array[4] === 'O' && array[6] === 'O') ||
      (array[0] === 'O' && array[1] === 'O' && array[2] === 'O') ||
      (array[3] === 'O' && array[4] === 'O' && array[5] === 'O') ||
      (array[6] === 'O' && array[7] === 'O' && array[8] === 'O') ||
      (array[0] === 'O' && array[3] === 'O' && array[6] === 'O') ||
      (array[1] === 'O' && array[4] === 'O' && array[7] === 'O') ||
      (array[2] === 'O' && array[5] === 'O' && array[8] === 'O')) {
      return 'O'
    } else {
      return 'tie'
    }
  }

  let wins = 0
  let losses = 0
  let ties = 0
  const all = data.games.length

  for (let i = 0; i < all; i++) {
    if (evaluateBoard(data.games[i].cells) === 'X') {
      wins++
    } else if (evaluateBoard(data.games[i].cells) === 'O') {
      losses++
    } else {
      ties++
    }
  }
  $('#stats-banner').text('You\'ve played ' + data.games.length + ' games.  Your record is ' + wins + ' wins and ' + losses + ' losses.  And ' + ties + ' ties!.')
}
const showGamesFailure = () => {
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  changePasswordSuccess,
  changePasswordFailure,
  showGamesFailure,
  showGamesSuccess,
  createGameSuccess,
  createGameFailure
}
