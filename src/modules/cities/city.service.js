// src/modules/cities/city.service.js
const { supabaseAdmin } = require('../../config/supabase')
const generateSlug = require('../../helper/generateSlug')

const CityService = {
    async getAll() {
        const { data, error } = await supabaseAdmin
        .from('cities')
        .select('*')
        .order('created_at', { ascending: false })

        if (error) throw new Error(error.message)
        return data
    },

    async getById(id) {
        const { data, error } = await supabaseAdmin
        .from('cities')
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

    async create({ city_name, slug, province }) {
        if (!city_name || typeof city_name !== 'string' || city_name.trim() === '') {
        throw new Error('City name is required and must be a non-empty string')
        }

        if (!province || typeof province !== 'string' || province.trim() === '') {
        throw new Error('Province is required and must be a non-empty string')
        }

        const finalSlug = slug || generateSlug(city_name)

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
        .single()

        if (error) {
        throw new Error(error.message)
        }

        return data
    },

    async update(id, { city_name, slug, province }) {
        if (!id) {
        throw new Error('City ID is required')
        }

        const updateData = {}

        if (city_name !== undefined) {
        if (typeof city_name !== 'string' || city_name.trim() === '') {
            throw new Error('City name must be a non-empty string')
        }
        updateData.city_name = city_name.trim()
        }

        if (slug !== undefined) {
        if (typeof slug !== 'string') {
            throw new Error('Slug must be a string')
        }
        updateData.slug = slug.trim()
        }

        if (province !== undefined) {
        if (typeof province !== 'string' || province.trim() === '') {
            throw new Error('Province must be a non-empty string')
        }
        updateData.province = province.trim()
        }

        if (city_name !== undefined && slug === undefined) {
        updateData.slug = generateSlug(city_name.trim())
        }

        const { data, error } = await supabaseAdmin
        .from('cities')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

        if (error) {
        if (error.code === 'PGRST116') {
            throw new Error('City not found')
        }
        throw new Error(error.message)
        }

        return data
    },

    async delete(id) {
        const { data, error } = await supabaseAdmin
        .from('cities')
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

module.exports = CityService