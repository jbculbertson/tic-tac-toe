'use strict'
const store = require('../store')

const signUpSuccess = (data) => {
  store.user = data.user
  $('#message-banner').text('Thanks for signing up ' + store.user.email + '.  Please login.')
}
const signUpFailure = () => {
  $('#message-banner').text('We may already have an account with that email')
}

const signInSuccess = (data) => {
  store.user = data.user
  $('#message-banner').text('Welcome back ' + store.user.email + '.  Please click Create Game.')
  $('.logged-in').css('display', 'inline')
  $('#sign-up-button').hide()
  $('#sign-in-button').hide()
  $('#stats-banner').css('display', 'block')
}
const signInFailure = () => {
  $('#message-banner').text('Please make sure you have the correct credentials')
}

const signOutSuccess = () => {
}

const signOutFailure = () => {
}

const changePasswordSuccess = () => {
  $('#message-banner').text('Successfully changed password')
}
const changePasswordFailure = () => {
  $('#message-banner').text('Incorrect credentials')
}

const createGameSuccess = (data) => {
  store.game = data.game
  $('#message-banner').text('User ' + store.user.email + ' goes first, as X')
  $('.gameboard').fadeIn(500).css('display', 'block')
}

const createGameFailure = () => {
}

const showGamesSuccess = (data) => {
  $('#stats-banner').text('You\'ve played ' + data.games.length + ' games.')
}
const showGamesFailure = () => {
}

const showOneGameSuccess = () => {
}
const showOneGameFailure = () => {
}

const joinGameSuccess = () => {
}
const joinGameFailure = () => {
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
  showOneGameFailure,
  showOneGameSuccess,
  createGameSuccess,
  createGameFailure,
  joinGameSuccess,
  joinGameFailure
}
