// src/modules/articles/article.controller.js

const ArticleService = require('./article.service');
const { logger } = require('../../utils/logger');
const { success } = require('../../utils/response');

const ArticleController = {
  // GET /api/articles
  async getAllArticles(req, res) {
    logger.debug('Fetching all articles');
    const articles = await ArticleService.getAll();
    logger.info({ count: articles.length }, '✅ Successfully fetched all articles');
    return success(res, articles); // 200
  },

  // GET /api/articles/:id
  async getArticleById(req, res) {
    const { id } = req.params;
    logger.debug({ id }, 'Fetching article by ID');
    const article = await ArticleService.getById(id);
    logger.info({ id }, '✅ Article found');
    return success(res, article); // 200
  },

  // POST /api/articles
  async createArticle(req, res) {
    const { title, slug, thumbnail, content, service_id, category_id } = req.body;
    logger.debug({ title, slug, service_id, category_id }, '📥 Attempting to create new article');
    const article = await ArticleService.create(req.body);
    logger.info({ id: article.id, title }, '✅ Article created successfully');
    return success(res, article, 201); // Created
  },

  // PUT /api/articles/:id
  async updateArticle(req, res) {
    const { id } = req.params;
    const { title, slug, thumbnail, content, service_id, category_id } = req.body;
    logger.debug({ id, title, service_id, category_id }, '✏️ Attempting to update article');
    const article = await ArticleService.update(id, req.body);
    logger.info({ id }, '✅ Article updated successfully');
    return success(res, article); // 200
  },

  // DELETE /api/articles/:id
  async deleteArticle(req, res) {
    const { id } = req.params;
    logger.debug({ id }, '🗑️ Attempting to delete article');
    const article = await ArticleService.delete(id);
    logger.info({ id }, '✅ Article deleted successfully');
    return success(res, { message: 'Article deleted', article }); // 200
  },
};

module.exports = ArticleController;