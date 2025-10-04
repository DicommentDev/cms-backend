// src/modules/categories/category.service.js
const { supabaseAdmin } = require('../../config/supabase');
const generateSlug = require('../../helper/generateSlug');
const { NotFoundError, BadRequestError, DatabaseError } = require('../../utils/errors');

const CategoryService = {
  async getAll() {
    const { data, error } = await supabaseAdmin
      .from('categories')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new DatabaseError(`Failed to fetch categories: ${error.message}`);
    }
    return data;
  },

  async getById(id) {
    const { data, error } = await supabaseAdmin
      .from('categories')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new NotFoundError('Category not found');
      }
      throw new DatabaseError(`Failed to fetch category: ${error.message}`);
    }
    return data;
  },

  async create({ name, slug }) {
    if (!name || typeof name !== 'string' || name.trim() === '') {
      throw new BadRequestError('Category name is required and must be a non-empty string');
    }

    const finalSlug = slug || generateSlug(name.trim());

    const { data, error } = await supabaseAdmin
      .from('categories')
      .insert([{ name: name.trim(), slug: finalSlug }])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        throw new BadRequestError('Category with this slug already exists');
      }
      throw new DatabaseError(`Failed to create category: ${error.message}`);
    }

    return data;
  },

  async update(id, { name, slug }) {
    if (!id) {
      throw new BadRequestError('Category ID is required');
    }

    const updateData = {};

    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim() === '') {
        throw new BadRequestError('Category name must be a non-empty string');
      }
      updateData.name = name.trim();
    }

    if (slug !== undefined) {
      if (typeof slug !== 'string') {
        throw new BadRequestError('Slug must be a string');
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
        throw new NotFoundError('Category not found');
      }
      if (error.code === '23505') {
        throw new BadRequestError('Slug already exists');
      }
      throw new DatabaseError(`Failed to update category: ${error.message}`);
    }

    return data;
  },

  async delete(id) {
    const { data, error } = await supabaseAdmin
      .from('categories')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new NotFoundError('Category not found');
      }
      throw new DatabaseError(`Failed to delete category: ${error.message}`);
    }
    return data;
  },
};

module.exports = CategoryService;