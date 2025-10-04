// src/modules/services/service.service.js

const { supabaseAdmin } = require('../../config/supabase');
const generateSlug = require('../../helper/generateSlug');
const { NotFoundError, BadRequestError, DatabaseError } = require('../../utils/errors');

const ServiceService = {
  async getAll() {
    const { data, error } = await supabaseAdmin
      .from('services')
      .select(`
        id,
        name,
        slug,
        description,
        created_at
      `)
      .order('created_at', { ascending: false });

    if (error) {
      throw new DatabaseError(`Failed to fetch services: ${error.message}`);
    }
    return data;
  },

  async getById(id) {
    const { data, error } = await supabaseAdmin
      .from('services')
      .select(`
        id,
        name,
        slug,
        description,
        created_at
      `)
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new NotFoundError('Service not found');
      }
      throw new DatabaseError(`Failed to fetch service: ${error.message}`);
    }
    return data;
  },

  async create(payload) {
    const { name, slug, description } = payload;

    // Validasi dasar → akan di-handle di middleware
    // Tapi jika ada logika bisnis (misal: slug wajib), bisa ditambahkan di sini

    const finalSlug = slug || generateSlug(name.trim());

    const { data, error } = await supabaseAdmin
      .from('services')
      .insert([
        {
          name: name.trim(),
          slug: finalSlug,
          description: description || null,
        },
      ])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        throw new BadRequestError('Service with this slug already exists');
      }
      throw new DatabaseError(`Failed to create service: ${error.message}`);
    }

    return data;
  },

  async update(id, payload) {
    const updateData = {};

    if (payload.name !== undefined) {
      updateData.name = payload.name.trim();
    }

    if (payload.slug !== undefined) {
      updateData.slug = payload.slug.trim();
    }

    if (payload.description !== undefined) {
      updateData.description = payload.description || null;
    }

    // Jika name diupdate tapi slug tidak disediakan, generate ulang
    if (payload.name !== undefined && payload.slug === undefined) {
      updateData.slug = generateSlug(payload.name.trim());
    }

    const { data, error } = await supabaseAdmin
      .from('services')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new NotFoundError('Service not found');
      }
      if (error.code === '23505') {
        throw new BadRequestError('Slug already exists');
      }
      throw new DatabaseError(`Failed to update service: ${error.message}`);
    }

    return data;
  },

  async delete(id) {
    const { data, error } = await supabaseAdmin
      .from('services')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new NotFoundError('Service not found');
      }
      throw new DatabaseError(`Failed to delete service: ${error.message}`);
    }
    return data;
  },
};

module.exports = ServiceService;