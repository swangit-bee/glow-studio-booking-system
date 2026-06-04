<template>
  <main class="min-h-screen bg-[#FAF7F2] p-6 text-stone-900">
    <Navbar />

    <section class="mx-auto max-w-7xl px-6 pt-32 pb-12">
      <div class="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p class="mb-3 inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-stone-600 shadow-sm">
            Manage Bookings
          </p>

          <h1 class="text-4xl font-bold">Booking Management</h1>
          <p class="mt-2 text-stone-600">View, update, cancel, and delete user bookings.</p>
        </div>

        <RouterLink to="/admin" class="rounded-full bg-white px-5 py-3 text-sm font-semibold shadow-sm">
          Back to Admin
        </RouterLink>
      </div>

      <div class="mb-8 grid gap-4 md:grid-cols-2">
        <input
          v-model="search"
          type="text"
          placeholder="Search customer or class..."
          class="input"
        />

        <select v-model="selectedStatus" class="input">
          <option value="">All Status</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div v-if="loading" class="rounded-[2rem] bg-white p-8 text-center text-stone-600 shadow-sm">
        Loading bookings...
      </div>

      <div v-else class="space-y-5">
        <div
          v-for="booking in filteredBookings"
          :key="booking.id"
          class="rounded-[2rem] bg-white p-6 shadow-sm"
        >
          <div class="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div class="flex flex-wrap items-center gap-3">
                <h2 class="text-2xl font-bold">{{ booking.class_name }}</h2>

                <span
                  class="rounded-full px-3 py-1 text-xs font-semibold"
                  :class="statusClass(booking.status)"
                >
                  {{ booking.status }}
                </span>
              </div>

              <p class="mt-2 text-stone-600">
                {{ booking.customer_name }} • {{ booking.email }}
              </p>

              <p class="mt-1 text-sm text-stone-500">
                {{ booking.booking_date }} • {{ booking.booking_time }} • Instructor:
                {{ booking.instructor || 'Not assigned' }}
              </p>
            </div>

            <div class="flex flex-wrap gap-3">
              <button
                @click="updateStatus(booking.id, 'Upcoming')"
                class="rounded-full bg-blue-100 px-5 py-3 text-sm font-semibold text-blue-700"
              >
                Upcoming
              </button>

              <button
                @click="updateStatus(booking.id, 'Completed')"
                class="rounded-full bg-green-100 px-5 py-3 text-sm font-semibold text-green-700"
              >
                Complete
              </button>

              <button
                @click="updateStatus(booking.id, 'Cancelled')"
                class="rounded-full bg-red-100 px-5 py-3 text-sm font-semibold text-red-700"
              >
                Cancel
              </button>

              <button
                @click="deleteBooking(booking.id)"
                class="rounded-full bg-stone-900 px-5 py-3 text-sm font-semibold text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="!loading && filteredBookings.length === 0"
        class="mt-8 rounded-[2rem] bg-white p-8 text-center text-stone-600 shadow-sm"
      >
        No bookings found.
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import Navbar from '../../components/Navbar.vue'

const API_URL = import.meta.env.VITE_API_URL

const search = ref('')
const selectedStatus = ref('')
const bookings = ref([])
const loading = ref(true)

const loadBookings = async () => {
  try {
    loading.value = true

    const response = await fetch(`${API_URL}/api/bookings`)

    if (!response.ok) {
      throw new Error('Failed to load bookings')
    }

    bookings.value = await response.json()
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const filteredBookings = computed(() => {
  return bookings.value.filter((booking) => {
    const keyword = search.value.toLowerCase()

    const matchSearch =
      booking.customer_name.toLowerCase().includes(keyword) ||
      booking.class_name.toLowerCase().includes(keyword) ||
      booking.email.toLowerCase().includes(keyword)

    const matchStatus = selectedStatus.value === '' || booking.status === selectedStatus.value

    return matchSearch && matchStatus
  })
})

const statusClass = (status) => {
  if (status === 'Upcoming') return 'bg-blue-100 text-blue-700'
  if (status === 'Completed') return 'bg-green-100 text-green-700'
  return 'bg-red-100 text-red-700'
}

const updateStatus = async (id, status) => {
  try {
    const response = await fetch(`${API_URL}/api/bookings/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to update booking')
    }

    const selectedBooking = bookings.value.find((booking) => booking.id === id)

    if (selectedBooking) {
      selectedBooking.status = status
    }
  } catch (error) {
    console.error(error)
  }
}

const deleteBooking = async (id) => {
  const confirmed = confirm('Delete this booking?')

  if (!confirmed) return

  try {
    const response = await fetch(`${API_URL}/api/bookings/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Failed to delete booking')
    }

    bookings.value = bookings.value.filter((booking) => booking.id !== id)
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  loadBookings()
})
</script>