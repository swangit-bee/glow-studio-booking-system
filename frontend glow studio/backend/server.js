/* global process, require */

const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { createClient } = require('@supabase/supabase-js')

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

app.get('/', (req, res) => {
  res.json({ message: 'Glow Studio API is running' })
})

// =====================
// CLASSES API
// =====================

app.get('/api/classes', async (req, res) => {
  const { data, error } = await supabase
    .from('classes')
    .select('*')
    .order('id', { ascending: true })

  if (error) return res.status(500).json({ error: error.message })

  res.json(data)
})

app.get('/api/classes/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('classes')
    .select('*')
    .eq('id', req.params.id)
    .single()

  if (error) return res.status(404).json({ error: error.message })

  res.json(data)
})

app.post('/api/classes', async (req, res) => {
  const { name, level, duration, price, slots, instructor, description, image_url } = req.body

  const { data, error } = await supabase
    .from('classes')
    .insert([
      {
        name,
        level,
        duration,
        price,
        slots,
        instructor,
        description,
        image_url,
      },
    ])
    .select()

  if (error) return res.status(500).json({ error: error.message })

  res.status(201).json(data[0])
})

app.put('/api/classes/:id', async (req, res) => {
  const { name, level, duration, price, slots, instructor, description, image_url } = req.body

  const { data, error } = await supabase
    .from('classes')
    .update({
      name,
      level,
      duration,
      price,
      slots,
      instructor,
      description,
      image_url,
    })
    .eq('id', req.params.id)
    .select()

  if (error) return res.status(500).json({ error: error.message })

  res.json(data[0])
})

app.delete('/api/classes/:id', async (req, res) => {
  const { error } = await supabase.from('classes').delete().eq('id', req.params.id)

  if (error) return res.status(500).json({ error: error.message })

  res.json({ message: 'Class deleted successfully' })
})

// =====================
// INSTRUCTORS API
// =====================

app.get('/api/instructors', async (req, res) => {
  const { data, error } = await supabase
    .from('instructors')
    .select('*')
    .order('id', { ascending: true })

  if (error) return res.status(500).json({ error: error.message })

  res.json(data)
})

app.get('/api/instructors/:id', async (req, res) => {
  const { data, error } = await supabase
    .from('instructors')
    .select('*')
    .eq('id', req.params.id)
    .single()

  if (error) return res.status(404).json({ error: error.message })

  res.json(data)
})

app.post('/api/instructors', async (req, res) => {
  const { name, specialty, experience, rating, signature_class, bio, image_url } = req.body

  const { data, error } = await supabase
    .from('instructors')
    .insert([
      {
        name,
        specialty,
        experience,
        rating,
        signature_class,
        bio,
        image_url,
      },
    ])
    .select()

  if (error) return res.status(500).json({ error: error.message })

  res.status(201).json(data[0])
})

app.put('/api/instructors/:id', async (req, res) => {
  const { name, specialty, experience, rating, signature_class, bio, image_url } = req.body

  const { data, error } = await supabase
    .from('instructors')
    .update({
      name,
      specialty,
      experience,
      rating,
      signature_class,
      bio,
      image_url,
    })
    .eq('id', req.params.id)
    .select()

  if (error) return res.status(500).json({ error: error.message })

  res.json(data[0])
})

app.delete('/api/instructors/:id', async (req, res) => {
  const { error } = await supabase.from('instructors').delete().eq('id', req.params.id)

  if (error) return res.status(500).json({ error: error.message })

  res.json({ message: 'Instructor deleted successfully' })
})

// =====================
// BOOKINGS API
// =====================

app.post('/api/bookings', async (req, res) => {
  const {
    customer_name,
    email,
    class_id,
    class_name,
    instructor,
    booking_date,
    booking_time,
    notes,
  } = req.body

  const { data, error } = await supabase
    .from('bookings')
    .insert([
      {
        customer_name,
        email,
        class_id,
        class_name,
        instructor,
        booking_date,
        booking_time,
        notes,
        status: 'Upcoming',
      },
    ])
    .select()

  if (error) return res.status(500).json({ error: error.message })

  res.status(201).json(data[0])
})

app.get('/api/bookings', async (req, res) => {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) return res.status(500).json({ error: error.message })

  res.json(data)
})

app.put('/api/bookings/:id', async (req, res) => {
  const { status } = req.body

  const { data, error } = await supabase
    .from('bookings')
    .update({ status })
    .eq('id', req.params.id)
    .select()

  if (error) return res.status(500).json({ error: error.message })

  res.json(data[0])
})

app.delete('/api/bookings/:id', async (req, res) => {
  const { error } = await supabase.from('bookings').delete().eq('id', req.params.id)

  if (error) return res.status(500).json({ error: error.message })

  res.json({ message: 'Booking deleted successfully' })
})

// =====================
// START SERVER
// =====================

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Glow Studio backend running on port ${PORT}`)
})