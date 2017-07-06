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
  $('#create-game-button').css('display', 'inline')
  $('#sign-out-button').css('display', 'inline')
  $('#show-games-button').css('display', 'inline')
  $('#change-password-button').css('display', 'inline')
  $('#sign-up-button').hide()
  $('#sign-in-button').hide()
}
const signInFailure = () => {
  $('#message-banner').text('Please make sure you have the correct credentials')
}

const signOutSuccess = () => {
  $('#message-banner').text('See you next time')
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
  $('#message-banner').text('Let\'s Play!')
  $('#stats-banner').css('display', 'inline')
  $('#stats-banner').text('Stats go here')
  $('.gameboard').fadeIn(500).css('display', 'inline')
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
