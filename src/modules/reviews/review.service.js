// src/modules/reviews/review.service.js
const { supabaseAdmin } = require('../../config/supabase')

const ReviewService = {
  async getAll() {
    const { data, error } = await supabaseAdmin
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw new Error(error.message)
    return data
  },

  async getById(id) {
    const { data, error } = await supabaseAdmin
      .from('reviews')
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

  async create({ name, rating, message }) {
    if (!name || rating === undefined || rating < 1 || rating > 5) {
      throw new Error('Invalid input: name and rating (1-5) are required')
    }

    const { data, error } = await supabaseAdmin
      .from('reviews')
      .insert([
        {
          name,
          rating,
          message: message || null,
        },
      ])
      .select()
      .single()

    if (error) throw new Error(error.message)
    return data
  },

  async update(id, { name, rating, message }) {
    const updateData = {}
    if (name !== undefined) updateData.name = name
    if (rating !== undefined) {
      if (rating < 1 || rating > 5) throw new Error('Rating must be between 1 and 5')
      updateData.rating = rating
    }
    if (message !== undefined) updateData.message = message

    const { data, error } = await supabaseAdmin
      .from('reviews')
      .update(updateData)
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

  async delete(id) {
    const { data, error } = await supabaseAdmin
      .from('reviews')
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

module.exports = ReviewService