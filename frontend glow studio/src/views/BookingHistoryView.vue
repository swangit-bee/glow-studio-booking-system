<template>
  <main class="min-h-screen bg-[#FAF7F2] text-stone-900">
    <Navbar />

    <section class="mx-auto max-w-7xl px-6 pt-32 pb-20">
      <div class="mb-10">
        <p class="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-stone-600 shadow-sm">
          Booking History
        </p>

        <h1 class="text-5xl font-bold tracking-tight">
          Your wellness timeline
        </h1>

        <p class="mt-4 text-stone-600">
          View your upcoming, completed, and cancelled Pilates bookings.
        </p>
      </div>

      <div v-if="loading" class="rounded-3xl bg-white p-10 text-center shadow-sm">
        <p class="text-stone-600">Loading bookings...</p>
      </div>

      <div v-else-if="error" class="rounded-3xl bg-red-50 p-10 text-center shadow-sm">
        <p class="font-semibold text-red-700">{{ error }}</p>
      </div>

      <div v-else-if="!currentUser" class="rounded-3xl bg-white p-10 text-center shadow-sm">
        <h2 class="text-2xl font-bold">Please login first</h2>
        <p class="mt-3 text-stone-600">
          Login to view your booking history.
        </p>

        <RouterLink
          to="/login"
          class="mt-5 inline-block rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white"
        >
          Go to Login
        </RouterLink>
      </div>

      <div v-else-if="bookings.length === 0" class="rounded-3xl bg-white p-10 text-center shadow-sm">
        <h2 class="text-2xl font-bold">No bookings yet</h2>
        <p class="mt-3 text-stone-600">
          You have not booked any Pilates sessions yet.
        </p>

        <RouterLink
          to="/classes"
          class="mt-5 inline-block rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white"
        >
          Explore Classes
        </RouterLink>
      </div>

      <div v-else class="space-y-5">
        <div
          v-for="booking in bookings"
          :key="booking.id"
          class="rounded-[2rem] bg-white p-6 shadow-sm"
        >
          <div class="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div class="flex flex-wrap items-center gap-3">
                <h2 class="text-2xl font-bold">
                  {{ booking.class_name }}
                </h2>

                <span
                  class="rounded-full px-3 py-1 text-xs font-semibold"
                  :class="statusClass(booking.status)"
                >
                  {{ booking.status }}
                </span>
              </div>

              <p class="mt-2 text-stone-600">
                {{ booking.booking_date }} • {{ booking.booking_time }}
              </p>

              <p class="mt-1 text-sm text-stone-500">
                Instructor: {{ booking.instructor || 'Not assigned' }}
              </p>

              <p class="mt-1 text-sm text-stone-500">
                Booked by: {{ booking.customer_name }} • {{ booking.email }}
              </p>
            </div>

            <div class="flex gap-3">
              <RouterLink
                to="/classes"
                class="rounded-full bg-[#FAF7F2] px-5 py-3 text-sm font-semibold text-stone-700"
              >
                Rebook
              </RouterLink>

              <button
                v-if="booking.status === 'Upcoming'"
                @click="cancelBooking(booking.id)"
                class="rounded-full bg-red-100 px-5 py-3 text-sm font-semibold text-red-700"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

const currentUser = ref(null)
const bookings = ref([])
const loading = ref(true)
const error = ref('')

const loadBookings = async () => {
  try {
    currentUser.value = JSON.parse(localStorage.getItem('glowUser'))

    if (!currentUser.value) {
      loading.value = false
      return
    }

    const response = await fetch('http://localhost:5000/api/bookings')

    if (!response.ok) {
      throw new Error('Failed to load bookings')
    }

    const data = await response.json()

    bookings.value = data.filter(
      (booking) => booking.email === currentUser.value.email,
    )
  } catch (err) {
    console.error(err)
    error.value = 'Failed to load booking history. Please make sure the backend is running.'
  } finally {
    loading.value = false
  }
}

const statusClass = (status) => {
  if (status === 'Upcoming') return 'bg-blue-100 text-blue-700'
  if (status === 'Completed') return 'bg-green-100 text-green-700'
  return 'bg-red-100 text-red-700'
}

const cancelBooking = async (id) => {
  try {
    const response = await fetch(`http://localhost:5000/api/bookings/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 'Cancelled',
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to cancel booking')
    }

    const selectedBooking = bookings.value.find((booking) => booking.id === id)

    if (selectedBooking) {
      selectedBooking.status = 'Cancelled'
    }
  } catch (err) {
    console.error(err)
    error.value = 'Failed to cancel booking.'
  }
}

onMounted(() => {
  loadBookings()
})
</script>