'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')

$(() => {
  setAPIOrigin(location, config)
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
require('./example')

const gameEvents = require('./game/events')

// On document ready
$(() => {
  $('#0').on('click', gameEvents.onSelectCell)
  $('#1').on('click', gameEvents.onSelectCell)
  $('#2').on('click', gameEvents.onSelectCell)
  $('#3').on('click', gameEvents.onSelectCell)
  $('#4').on('click', gameEvents.onSelectCell)
  $('#5').on('click', gameEvents.onSelectCell)
  $('#6').on('click', gameEvents.onSelectCell)
  $('#7').on('click', gameEvents.onSelectCell)
  $('#8').on('click', gameEvents.onSelectCell)
  $('#sign-up').on('submit', gameEvents.onSignUp)
  $('#sign-in').on('submit', gameEvents.onSignIn)
  $('#change-password').on('submit', gameEvents.onChangePassword)
  $('#sign-out-button').on('click', gameEvents.onSignOut)
  $('#create-game-button').on('click', gameEvents.onCreateGame)
  $('#message-banner').text('Play a quick game!  Please login or create account in order to store data')
})
