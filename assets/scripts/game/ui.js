'use strict'
const store = require('../store')

const signUpSuccess = (data) => {
  store.user = data.user
  // $('#sign-up-Modal').modal('hide')
  // $('#message-banner').text('Thanks for signing up ' + store.user.email + '.  Please login.')
}
const signUpFailure = () => {
  $('#message-banner').text('We may already have an account with that email')
  $('.sign-up').val('')
  $('#sign-up-Modal').modal('hide')
}

const signInSuccess = (data) => {
  store.user = data.user
  $('#sign-up-Modal').modal('hide')
  $('#sign-in-Modal').modal('hide')
  $('#message-banner').text('Welcome back ' + store.user.email + '.  Please click Create Game.')
  $('.logged-in').css('display', 'inline')
  $('#sign-up-button').hide()
  $('#sign-in-button').hide()
  $('#stats-banner').css('display', 'block')
  $('#stats-banner-two').css('display', 'block')
  $('#stats-banner-three').css('display', 'block')
  $('#stats-banner-four').css('display', 'block')
  $('#stats-banner-five').css('display', 'block')
  $('.box').text('')
  $('.box').off()
}
const signInFailure = () => {
  $('#sign-in-Modal').modal('hide')
  $('.sign-in').val('')
  $('#message-banner').text('Please make sure you have the correct credentials')
}

const signOutSuccess = () => {
  $('.logged-in').css('display', 'none')
  $('#sign-up-button').show()
  $('#sign-in-button').show()
  $('#stats-banner').text('')
  $('#stats-banner-two').text('')
  $('#stats-banner-three').text('')
  $('#stats-banner-four').text('')
  $('#stats-banner-five').text('')
  // $('.box').text('')
  // $('.box').off()
  $('#message-banner').text('Thanks for playing!')
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
  $('#stats-banner').text('You\'ve played ' + data.games.length + ' games.')
  $('#stats-banner-two').text('You have ' + wins + ' wins!')
  $('#stats-banner-three').text('You have ' + losses + ' losses.')
  $('#stats-banner-four').text('And ' + ties + ' ties!')
  $('#stats-banner-gve').text('You have ' + wins + ' wins!')
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
