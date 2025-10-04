// src/modules/articles/article.routes.js
const express = require('express')
const router = express.Router()
const ArticleController = require('./article.controller')
const { validateCreate, validateUpdate } = require('./article.validation')

router.get('/', ArticleController.getAllArticles)
router.get('/:id', ArticleController.getArticleById)
router.post('/', validateCreate, ArticleController.createArticle)
router.put('/:id', validateUpdate, ArticleController.updateArticle)
router.delete('/:id', ArticleController.deleteArticle)

module.exports = router