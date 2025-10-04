// src/modules/cities/city.controller.js

const CityService = require('./city.service');
const { logger } = require('../../utils/logger');
const { success } = require('../../utils/response');

const CityController = {
  // GET /api/cities
  async getAllCities(req, res) {
    logger.debug('Fetching all cities');
    const cities = await CityService.getAll();
    logger.info({ count: cities.length }, '✅ Successfully fetched all cities');
    return success(res, cities); // 200
  },

  // GET /api/cities/:id
  async getCityById(req, res) {
    const { id } = req.params;
    logger.debug({ id }, 'Fetching city by ID');
    const city = await CityService.getById(id);
    logger.info({ id }, '✅ City found');
    return success(res, city); // 200
  },

  // POST /api/cities
  async createCity(req, res) {
    const { city_name, slug, province } = req.body;
    logger.debug({ city_name, province, slug }, '📥 Attempting to create new city');
    const city = await CityService.create(req.body);
    logger.info(
      { id: city.id, city_name: city.city_name, province: city.province },
      '✅ City created successfully'
    );
    return success(res, city, 201); // Created
  },

  // PUT /api/cities/:id
  async updateCity(req, res) {
    const { id } = req.params;
    const { city_name, slug, province } = req.body;
    logger.debug({ id, city_name, province, slug }, '✏️ Attempting to update city');
    const city = await CityService.update(id, req.body);
    logger.info({ id }, '✅ City updated successfully');
    return success(res, city); // 200
  },

  // DELETE /api/cities/:id
  async deleteCity(req, res) {
    const { id } = req.params;
    logger.debug({ id }, '🗑️ Attempting to delete city');
    const city = await CityService.delete(id);
    logger.info({ id }, '✅ City deleted successfully');
    return success(res, { message: 'City deleted', city }); // 200
  },
};

module.exports = CityController;