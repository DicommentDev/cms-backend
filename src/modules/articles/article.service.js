// src/modules/articles/article.service.js

const { supabaseAdmin } = require('../../config/supabase');
const generateSlug = require('../../helper/generateSlug');
const { NotFoundError, BadRequestError, DatabaseError } = require('../../utils/errors');

const ArticleService = {
  async getAll() {
    const { data, error } = await supabaseAdmin
      .from('articles')
      .select(`
        id,
        title,
        slug,
        thumbnail,
        content,
        service_id,
        category_id,
        created_at
      `)
      .order('created_at', { ascending: false });

    if (error) {
      throw new DatabaseError(`Failed to fetch articles: ${error.message}`);
    }
    return data;
  },

  async getById(id) {
    const { data, error } = await supabaseAdmin
      .from('articles')
      .select(`
        id,
        title,
        slug,
        thumbnail,
        content,
        service_id,
        category_id,
        created_at
      `)
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new NotFoundError('Article not found');
      }
      throw new DatabaseError(`Failed to fetch article: ${error.message}`);
    }
    return data;
  },

  async create(payload) {
    const { title, slug, thumbnail, content, service_id, category_id } = payload;

    // Validasi dasar → akan di-handle di middleware
    // Tapi jika ada logika bisnis (misal: slug wajib), bisa ditambahkan di sini

    const finalSlug = slug || generateSlug(title.trim());

    const { data, error } = await supabaseAdmin
      .from('articles')
      .insert([
        {
          title: title.trim(),
          slug: finalSlug,
          thumbnail: thumbnail || null,
          content: content || null,
          service_id: service_id || null,
          category_id: category_id || null,
        },
      ])
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        throw new BadRequestError('Article with this slug already exists');
      }
      throw new DatabaseError(`Failed to create article: ${error.message}`);
    }

    return data;
  },

  async update(id, payload) {
    const updateData = {};

    if (payload.title !== undefined) {
      updateData.title = payload.title.trim();
    }

    if (payload.slug !== undefined) {
      updateData.slug = payload.slug.trim();
    }

    if (payload.thumbnail !== undefined) {
      updateData.thumbnail = payload.thumbnail || null;
    }

    if (payload.content !== undefined) {
      updateData.content = payload.content || null;
    }

    if (payload.service_id !== undefined) {
      updateData.service_id = payload.service_id || null;
    }

    if (payload.category_id !== undefined) {
      updateData.category_id = payload.category_id || null;
    }

    // Jika title diupdate tapi slug tidak disediakan, generate ulang
    if (payload.title !== undefined && payload.slug === undefined) {
      updateData.slug = generateSlug(payload.title.trim());
    }

    const { data, error } = await supabaseAdmin
      .from('articles')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new NotFoundError('Article not found');
      }
      if (error.code === '23505') {
        throw new BadRequestError('Slug already exists');
      }
      throw new DatabaseError(`Failed to update article: ${error.message}`);
    }

    return data;
  },

  async delete(id) {
    const { data, error } = await supabaseAdmin
      .from('articles')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new NotFoundError('Article not found');
      }
      throw new DatabaseError(`Failed to delete article: ${error.message}`);
    }
    return data;
  },
};

module.exports = ArticleService;