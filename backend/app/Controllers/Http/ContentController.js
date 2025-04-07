'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const Content = use('App/Models/Content')
/**
 * Resourceful controller for interacting with contents
 */
class ContentController {
  async index ({ response }) {
    const contents = await Content.find({})
    return response.json(contents)
  }

  async store ({ request, response }) {
    const { title, text } = request.post()
    const content = new Content({ title, text })
    await content.save()
    return response.status(201).json(content)
  }

  async show ({ params, response }) {
    const content = await Content.findById(params.id)
    if (!content) {
      return response.status(404).json({ message: 'Content not found' })
    }
    return response.json(content)
  }

  async update ({ params, request, response }) {
    const content = await Content.findById(params.id)
    if (!content) {
      return response.status(404).json({ message: 'Content not found' })
    }
    const { title, text } = request.post()
    content.title = title
    content.text = text
    content.updatedAt = Date.now()
    await content.save()
    return response.json(content)
  }

  async destroy ({ params, response }) {
    const content = await Content.findById(params.id)
    if (!content) {
      return response.status(404).json({ message: 'Content not found' })
    }
    await content.remove()
    return response.status(204).send()
  }
}
module.exports = ContentController