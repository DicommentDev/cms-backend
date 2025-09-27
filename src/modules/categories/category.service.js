// src/modules/categories/category.service.js
const { supabaseAdmin } = require('../../config/supabase')
const generateSlug = require('../../helper/generateSlug')

const CategoryService = {
  async getAll() {
    const { data, error } = await supabaseAdmin
      .from('categories')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw new Error(error.message)
    return data
  },

  async getById(id) {
    const { data, error } = await supabaseAdmin
      .from('categories')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        throw new Error('Review not found')
      }
      throw new Error(error.message)
    }
    return data
  },

  async create({ name, slug }) {
    if (!name || typeof name !== 'string' || name.trim() === '') {
      throw new Error('Category name is required and must be a non-empty string');
    }

    const finalSlug = slug || generateSlug(name);

    const { data, error } = await supabaseAdmin
      .from('categories')
      .insert([
        {
          name: name.trim(),
          slug: finalSlug,
        },
      ])
      .select()
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  },

  async update(id, { name, slug }) {
    if (!id) {
      throw new Error('Category ID is required');
    }

    const updateData = {};

    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim() === '') {
        throw new Error('Category name must be a non-empty string');
      }
      updateData.name = name.trim();
    }

    if (slug !== undefined) {
      if (typeof slug !== 'string') {
        throw new Error('Slug must be a string');
      }
      updateData.slug = slug.trim();
    }

    if (name !== undefined && slug === undefined) {
      updateData.slug = generateSlug(name.trim());
    }

    const { data, error } = await supabaseAdmin
      .from('categories')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new Error('Category not found');
      }
      throw new Error(error.message);
    }

    return data;
  },

  async delete(id) {
    const { data, error } = await supabaseAdmin
      .from('categories')
      .delete()
      .eq('id', id)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        throw new Error('Review not found')
      }
      throw new Error(error.message)
    }
    return data
  },
}

module.exports = CategoryService