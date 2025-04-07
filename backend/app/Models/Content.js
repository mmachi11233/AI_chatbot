'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ContentSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Content', ContentSchema)