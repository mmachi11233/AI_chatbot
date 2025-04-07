

'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Welcome to my Adonijs backend!' }
})

Route.group(() => {
  Route.resource('contents', 'ContentController').apiOnly()
  Route.post('chatbot', 'ChatbotController.handle')
}).prefix('api')

