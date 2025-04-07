'use strict'

const Content = use('App/Models/Content')
const Env = use('Env')
const axios = require('axios')

class ChatbotController {
  async handle ({ request, response }) {
    const { query } = request.post()
    if (!query) {
      return response.status(400).json({ error: 'Query is required.' })
    }

    try {
      const contents = await Content.find({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { text: { $regex: query, $options: 'i' } }
        ]
      })

      if (contents.length > 0) {
        const randomIndex = Math.floor(Math.random() * contents.length)
        return response.json({ response: contents[randomIndex].text })
      }

      const aiServiceUrl = Env.get('AI_SERVICE_URL')
      const aiServiceKey = Env.get('AI_SERVICE_KEY')

      if (aiServiceUrl && aiServiceKey) {
        try {
          const aiResponse = await axios.post(
            aiServiceUrl,
            { query },
            { headers: { 'Authorization': `Bearer ${aiServiceKey}` } }
          )
          return response.json({ response: aiResponse.data.response })
        } catch (aiError) {
          console.error('AI Service Error:', aiError.response ? aiError.response.data : aiError.message)
          return response.status(500).json({ error: 'Failed to get response from AI service.' })
        }
      } else {
        return response.json({ response: "Sorry, I don't have an answer for that." })
      }
    } catch (error) {
      console.error('Chatbot error:', error)
      return response.status(500).json({ error: 'Failed to process chatbot query.' })
    }
  }
}

module.exports = ChatbotController