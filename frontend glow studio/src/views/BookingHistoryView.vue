<template>
  <main class="min-h-screen bg-[#FAF7F2] text-stone-900">
    <Navbar />

    <section class="mx-auto max-w-7xl px-6 pt-32 pb-20">
      <div class="mb-10">
        <p class="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-stone-600 shadow-sm">
          Booking History
        </p>

        <h1 class="text-5xl font-bold tracking-tight">Your wellness timeline</h1>

        <p class="mt-4 text-stone-600">
          View upcoming, completed, and cancelled Pilates bookings.
        </p>
      </div>

      <div class="space-y-5">
        <div
          v-for="booking in bookings"
          :key="booking.id"
          class="rounded-[2rem] bg-white p-6 shadow-sm"
        >
          <div class="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div>
              <div class="flex items-center gap-3">
                <h2 class="text-2xl font-bold">{{ booking.className }}</h2>

                <span
                  class="rounded-full px-3 py-1 text-xs font-semibold"
                  :class="statusClass(booking.status)"
                >
                  {{ booking.status }}
                </span>
              </div>

              <p class="mt-2 text-stone-600">
                {{ booking.date }} • {{ booking.time }}
              </p>

              <p class="mt-1 text-sm text-stone-500">
                Instructor: {{ booking.instructor }}
              </p>
            </div>

            <div class="flex gap-3">
              <button
                class="rounded-full bg-[#FAF7F2] px-5 py-3 text-sm font-semibold text-stone-700"
              >
                Rebook
              </button>

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
    <MobileBottomNav />
  </main>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import MobileBottomNav from '../components/MobileBottomNav.vue'

const bookings = ref([
  {
    id: 1,
    className: 'Slow Flow Pilates',
    date: 'Monday, 10 June',
    time: '8:00 AM',
    instructor: 'Maya Collins',
    status: 'Upcoming',
  },
  {
    id: 2,
    className: 'Core Sculpt',
    date: 'Friday, 7 June',
    time: '6:00 PM',
    instructor: 'Sofia Tan',
    status: 'Completed',
  },
  {
    id: 3,
    className: 'Flex & Restore',
    date: 'Wednesday, 5 June',
    time: '10:00 AM',
    instructor: 'Aina Rahman',
    status: 'Cancelled',
  },
])

const statusClass = (status) => {
  if (status === 'Upcoming') return 'bg-blue-100 text-blue-700'
  if (status === 'Completed') return 'bg-green-100 text-green-700'
  return 'bg-red-100 text-red-700'
}

const cancelBooking = (id) => {
  const selectedBooking = bookings.value.find((booking) => booking.id === id)

  if (selectedBooking) {
    selectedBooking.status = 'Cancelled'
  }
}
</script>