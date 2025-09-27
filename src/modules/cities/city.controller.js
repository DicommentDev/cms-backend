// src/modules/cities/city.controller.js
const CityService = require('./city.service');
const { logger } = require('../../utils/logger');

const CityController = {
  // GET /api/cities
  async getAllCities(req, res) {
    logger.debug('Fetching all cities');

    try {
      const cities = await CityService.getAll();
      logger.info({ count: cities.length }, '✅ Successfully fetched all cities');
      res.status(200).json(cities);
    } catch (err) {
      logger.error({ err: err.message, stack: err.stack }, '❌ Failed to fetch cities');
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // GET /api/cities/:id
  async getByIdCity(req, res) {
    const { id } = req.params;
    logger.debug({ id }, 'Fetching city by ID');

    try {
      const city = await CityService.getById(id);
      logger.info({ id }, '✅ City found');
      res.status(200).json(city);
    } catch (err) {
      if (err.message === 'City not found') {
        logger.warn({ id }, '⚠️ City not found');
        return res.status(404).json({ error: err.message });
      }
      logger.error({ err: err.message, id }, '❌ Error fetching city by ID');
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  // POST /api/cities
  async createCity(req, res) {
    const { city_name, slug, province } = req.body;
    logger.info({ city_name, province, slug }, '📥 Attempting to create new city');

    try {
      const city = await CityService.create(req.body);
      logger.info(
        { id: city.id, city_name: city.city_name, province: city.province },
        '✅ City created successfully'
      );
      res.status(201).json(city);
    } catch (err) {
      logger.error(
        { err: err.message, payload: { city_name, province, slug } },
        '❌ Failed to create city'
      );
      res.status(400).json({ error: err.message });
    }
  },

  // PUT /api/cities/:id
  async updateCity(req, res) {
    const { id } = req.params;
    const { city_name, slug, province } = req.body;
    logger.info({ id, city_name, province, slug }, '✏️ Attempting to update city');

    try {
      const city = await CityService.update(id, req.body);
      logger.info({ id }, '✅ City updated successfully');
      res.status(200).json(city);
    } catch (err) {
      if (err.message === 'City not found') {
        logger.warn({ id }, '⚠️ City not found during update');
        return res.status(404).json({ error: err.message });
      }
      logger.error({ err: err.message, id }, '❌ Failed to update city');
      res.status(400).json({ error: err.message });
    }
  },

  // DELETE /api/cities/:id
  async deleteCity(req, res) {
    const { id } = req.params;
    logger.info({ id }, '🗑️ Attempting to delete city');

    try {
      const city = await CityService.delete(id);
      logger.info({ id }, '✅ City deleted successfully');
      res.status(200).json({ message: 'City deleted', city });
    } catch (err) {
      if (err.message === 'City not found') {
        logger.warn({ id }, '⚠️ City not found during deletion');
        return res.status(404).json({ error: err.message });
      }
      logger.error({ err: err.message, id }, '❌ Failed to delete city');
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = CityController;