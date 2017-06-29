'use strict'
const store = require('../store')

const signUpSuccess = (data) => {
  store.user = data.user
  $('#message-banner').text('Thanks for signing up ' + store.user.email)
}
const signUpFailure = () => {
  $('#message-banner').text('We may already have an account with that email')
}

const signInSuccess = (data) => {
  store.user = data.user
  $('#message-banner').text('Welcome back ' + store.user.email)
  $('#create-game').css('display', 'block')
  $('#sign-out').css('display', 'block')
  $('#show-games').css('display', 'block')
  $('#show-one-game').css('display', 'block')
}
const signInFailure = () => {
  $('#message-banner').text('Please make sure you have the correct credentials')
}

const signOutSuccess = () => {
}
const signOutFailure = () => {
}

const changePasswordSuccess = () => {
}
const changePasswordFailure = () => {
}

const createGameSuccess = (data) => {
  store.game = data.game
  $('.gameboard').css('display', 'block')
  $('#join-game').css('display', 'block')
  $('.clear-board').css('display', 'block')
}
const createGameFailure = (error) => {
  console.error(error)
}

const showGamesSuccess = (data) => {
  $('#message-banner').text('Total number of games played is: ' + data.games.length)
}
const showGamesFailure = (error) => {
  console.error(error)
}

const showOneGameSuccess = (data) => {
  console.log(data)
}
const showOneGameFailure = (error) => {
  console.error(error)
}

const joinGameSuccess = (data) => {
  console.log(data)
}
const joinGameFailure = (error) => {
  console.error(error)
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
