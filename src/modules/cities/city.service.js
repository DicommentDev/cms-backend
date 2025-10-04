// src/modules/cities/city.service.js

const { supabaseAdmin } = require('../../config/supabase');
const generateSlug = require('../../helper/generateSlug');
const { NotFoundError, BadRequestError, DatabaseError } = require('../../utils/errors');

const CityService = {
  async getAll() {
    const { data, error } = await supabaseAdmin
      .from('cities')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new DatabaseError(`Failed to fetch cities: ${error.message}`);
    }
    return data;
  },

  async getById(id) {
    const { data, error } = await supabaseAdmin
      .from('cities')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new NotFoundError('City not found');
      }
      throw new DatabaseError(`Failed to fetch city: ${error.message}`);
    }
    return data;
  },

  async create(payload) {
    const { city_name, province, slug } = payload;

    // ✅ Catatan: Validasi dasar (required, tipe data) harus di-handle di middleware
    // Service hanya fokus pada logika bisnis & akses data

    const finalSlug = slug || generateSlug(city_name.trim());

    const { data, error } = await supabaseAdmin
      .from('cities')
      .insert([
        {
          city_name: city_name.trim(),
          slug: finalSlug,
          province: province.trim(),
        },
      ])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        throw new BadRequestError('City with this slug already exists');
      }
      throw new DatabaseError(`Failed to create city: ${error.message}`);
    }

    return data;
  },

  async update(id, payload) {
    const updateData = {};

    if (payload.city_name !== undefined) {
      updateData.city_name = payload.city_name.trim();
    }

    if (payload.province !== undefined) {
      updateData.province = payload.province.trim();
    }

    if (payload.slug !== undefined) {
      updateData.slug = payload.slug.trim();
    }

    // Jika city_name diupdate tapi slug tidak disediakan, generate ulang
    if (payload.city_name !== undefined && payload.slug === undefined) {
      updateData.slug = generateSlug(payload.city_name.trim());
    }

    const { data, error } = await supabaseAdmin
      .from('cities')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new NotFoundError('City not found');
      }
      if (error.code === '23505') {
        throw new BadRequestError('Slug already exists');
      }
      throw new DatabaseError(`Failed to update city: ${error.message}`);
    }

    return data;
  },

  async delete(id) {
    const { data, error } = await supabaseAdmin
      .from('cities')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new NotFoundError('City not found');
      }
      throw new DatabaseError(`Failed to delete city: ${error.message}`);
    }
    return data;
  },
};

module.exports = CityService;