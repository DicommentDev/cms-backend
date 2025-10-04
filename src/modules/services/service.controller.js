// src/modules/services/service.controller.js

const ServiceService = require('./service.service');
const { logger } = require('../../utils/logger');
const { success } = require('../../utils/response');

const ServiceController = {
  // GET /api/services
  async getAllServices(req, res) {
    logger.debug('Fetching all services');
    const services = await ServiceService.getAll();
    logger.info({ count: services.length }, '✅ Successfully fetched all services');
    return success(res, services); // 200
  },

  // GET /api/services/:id
  async getServiceById(req, res) {
    const { id } = req.params;
    logger.debug({ id }, 'Fetching service by ID');
    const service = await ServiceService.getById(id);
    logger.info({ id }, '✅ Service found');
    return success(res, service); // 200
  },

  // POST /api/services
  async createService(req, res) {
    const { name, slug, description } = req.body;
    logger.debug({ name, slug }, '📥 Attempting to create new service');
    const service = await ServiceService.create(req.body);
    logger.info({ id: service.id, name }, '✅ Service created successfully');
    return success(res, service, 201); // Created
  },

  // PUT /api/services/:id
  async updateService(req, res) {
    const { id } = req.params;
    const { name, slug, description } = req.body;
    logger.debug({ id, name, slug }, '✏️ Attempting to update service');
    const service = await ServiceService.update(id, req.body);
    logger.info({ id }, '✅ Service updated successfully');
    return success(res, service); // 200
  },

  // DELETE /api/services/:id
  async deleteService(req, res) {
    const { id } = req.params;
    logger.debug({ id }, '🗑️ Attempting to delete service');
    const service = await ServiceService.delete(id);
    logger.info({ id }, '✅ Service deleted successfully');
    return success(res, { message: 'Service deleted', service }); // 200
  },
};

module.exports = ServiceController;