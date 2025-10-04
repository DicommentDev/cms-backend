// src/modules/reviews/review.service.js

const { supabaseAdmin } = require('../../config/supabase');
const { NotFoundError, BadRequestError, DatabaseError } = require('../../utils/errors');

const ReviewService = {
  async getAll() {
    const { data, error } = await supabaseAdmin
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new DatabaseError(`Failed to fetch reviews: ${error.message}`);
    }
    return data;
  },

  async getById(id) {
    const { data, error } = await supabaseAdmin
      .from('reviews')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new NotFoundError('Review not found');
      }
      throw new DatabaseError(`Failed to fetch review: ${error.message}`);
    }
    return data;
  },

  async create(payload) {
    const { name, rating, message } = payload;

    // ✅ Validasi dasar (required, tipe) → di middleware
    // ✅ Tapi validasi **rating 1–5** adalah logika bisnis → tetap di service

    if (rating < 1 || rating > 5) {
      throw new BadRequestError('Rating must be between 1 and 5');
    }

    const { data, error } = await supabaseAdmin
      .from('reviews')
      .insert([
        {
          name: name.trim(),
          rating,
          message: message ? message.trim() : null,
        },
      ])
      .select()
      .single();

    if (error) {
      // Jika ada constraint (misal unique user+product), bisa tambah penanganan 23505
      throw new DatabaseError(`Failed to create review: ${error.message}`);
    }

    return data;
  },

  async update(id, payload) {
    const updateData = {};

    if (payload.name !== undefined) {
      updateData.name = payload.name.trim();
    }

    if (payload.rating !== undefined) {
      if (payload.rating < 1 || payload.rating > 5) {
        throw new BadRequestError('Rating must be between 1 and 5');
      }
      updateData.rating = payload.rating;
    }

    if (payload.message !== undefined) {
      updateData.message = payload.message ? payload.message.trim() : null;
    }

    const { data, error } = await supabaseAdmin
      .from('reviews')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new NotFoundError('Review not found');
      }
      throw new DatabaseError(`Failed to update review: ${error.message}`);
    }

    return data;
  },

  async delete(id) {
    const { data, error } = await supabaseAdmin
      .from('reviews')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new NotFoundError('Review not found');
      }
      throw new DatabaseError(`Failed to delete review: ${error.message}`);
    }
    return data;
  },
};

module.exports = ReviewService;