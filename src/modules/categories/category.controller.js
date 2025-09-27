// src/modules/categories/category.controller.js
const CategoryService = require('./category.service');
const { logger } = require('../../utils/logger');

const CategoryController = {
  // GET /api/categories
  async getAllCategories(req, res) {
    logger.debug('Fetching all categories');

    try {
      const categories = await CategoryService.getAll();
      logger.info({ count: categories.length }, '✅ Successfully fetched all categories');
      res.status(200).json(categories);
    } catch (err) {
      logger.error({ err: err.message, stack: err.stack }, '❌ Failed to fetch categories');
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // GET /api/categories/:id
  async getByIdCategory(req, res) {
    const { id } = req.params;
    logger.debug({ id }, 'Fetching category by ID');

    try {
      const category = await CategoryService.getById(id);
      logger.info({ id }, '✅ Category found');
      res.status(200).json(category);
    } catch (err) {
      if (err.message === 'Category not found') {
        logger.warn({ id }, '⚠️ Category not found');
        return res.status(404).json({ error: err.message });
      }
      logger.error({ err: err.message, id }, '❌ Error fetching category by ID');
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // POST /api/categories
  async createCategory(req, res) {
    const { name, slug } = req.body;
    logger.info({ name, slug }, '📥 Attempting to create new category');

    try {
      const category = await CategoryService.create(req.body);
      logger.info({ id: category.id, name, slug: category.slug }, '✅ Category created successfully');
      res.status(201).json(category);
    } catch (err) {
      logger.error(
        { err: err.message, payload: { name, slug } },
        '❌ Failed to create category'
      );
      res.status(400).json({ error: err.message });
    }
  },

  // PUT /api/categories/:id
  async updateCategory(req, res) {
    const { id } = req.params;
    const { name, slug } = req.body;
    logger.info({ id, name, slug }, '✏️ Attempting to update category');

    try {
      const category = await CategoryService.update(id, req.body);
      logger.info({ id }, '✅ Category updated successfully');
      res.status(200).json(category);
    } catch (err) {
      if (err.message === 'Category not found') {
        logger.warn({ id }, '⚠️ Category not found during update');
        return res.status(404).json({ error: err.message });
      }
      logger.error({ err: err.message, id }, '❌ Failed to update category');
      res.status(400).json({ error: err.message });
    }
  },

  // DELETE /api/categories/:id
  async deleteCategory(req, res) {
    const { id } = req.params;
    logger.info({ id }, '🗑️ Attempting to delete category');

    try {
      const category = await CategoryService.delete(id);
      logger.info({ id }, '✅ Category deleted successfully');
      res.status(200).json({ message: 'Category deleted', category });
    } catch (err) {
      if (err.message === 'Category not found') {
        logger.warn({ id }, '⚠️ Category not found during deletion');
        return res.status(404).json({ error: err.message });
      }
      logger.error({ err: err.message, id }, '❌ Failed to delete category');
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = CategoryController;