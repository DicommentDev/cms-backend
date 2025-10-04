// src/modules/categories/category.controller.js
const CategoryService = require('./category.service');
const { logger } = require('../../utils/logger');
const { success } = require('../../utils/response'); // Hanya butuh `success`

const CategoryController = {
  // GET /api/categories
  async getAllCategories(req, res) {
    logger.debug('Fetching all categories');
    const categories = await CategoryService.getAll();
    logger.info({ count: categories.length }, '✅ Successfully fetched all categories');
    return success(res, categories); // 200
  },

  // GET /api/categories/:id
  async getCategoryById(req, res) {
    const { id } = req.params;
    logger.debug({ id }, 'Fetching category by ID');
    const category = await CategoryService.getById(id);
    logger.info({ id }, '✅ Category found');
    return success(res, category); // 200
  },

  // POST /api/categories
  async createCategory(req, res) {
    const { name, slug } = req.body;
    logger.debug({ name, slug }, '📥 Attempting to create new category');
    const category = await CategoryService.create(req.body);
    logger.info({ id: category.id, name, slug: category.slug }, '✅ Category created successfully');
    return success(res, category, 201); // Created
  },

  // PUT /api/categories/:id
  async updateCategory(req, res) {
    const { id } = req.params;
    const { name, slug } = req.body;
    logger.debug({ id, name, slug }, '✏️ Attempting to update category');
    const category = await CategoryService.update(id, req.body);
    logger.info({ id }, '✅ Category updated successfully');
    return success(res, category); // 200
  },

  // DELETE /api/categories/:id
  async deleteCategory(req, res) {
    const { id } = req.params;
    logger.debug({ id }, '🗑️ Attempting to delete category');
    const category = await CategoryService.delete(id);
    logger.info({ id }, '✅ Category deleted successfully');
    return success(res, { message: 'Category deleted', category }); // 200
  },
};

module.exports = CategoryController;