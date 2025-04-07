'use strict'

const Route = use('Route')

Route.group(() => {
  Route.resource('contents', 'ContentController').apiOnly()
  Route.post('chatbot', 'ChatbotController.handle')
}).prefix('api')
