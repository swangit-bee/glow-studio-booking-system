<template>
  <main class="min-h-screen bg-[#FAF7F2] text-stone-900">
    <Navbar />

    <section class="mx-auto max-w-7xl px-6 pt-32 pb-20">
      <div class="mb-10">
        <p class="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-stone-600 shadow-sm">
          Booking Calendar
        </p>

        <h1 class="text-5xl font-bold tracking-tight">Reserve your session</h1>

        <p class="mt-4 max-w-2xl text-stone-600">
          Select your preferred class, date, and time slot to complete your Pilates booking.
        </p>
      </div>

      <div class="grid gap-8 lg:grid-cols-3">
        <div class="lg:col-span-2 rounded-[2.5rem] bg-white p-8 shadow-xl">
          <label class="block text-sm font-semibold text-stone-600">Choose Class</label>
          <select
            v-model="booking.className"
            class="mt-3 w-full rounded-2xl border border-stone-200 bg-[#FAF7F2] px-5 py-4 outline-none focus:ring-2 focus:ring-stone-900"
          >
            <option value="">Select class</option>
            <option v-for="item in classes" :key="item.id" :value="item.name">
              {{ item.name }} — RM {{ item.price }}
            </option>
          </select>

          <div class="mt-8">
            <label class="block text-sm font-semibold text-stone-600">Choose Date</label>
            <div class="mt-3 grid gap-3 md:grid-cols-4">
              <button
                v-for="date in dates"
                :key="date"
                @click="booking.date = date"
                class="rounded-2xl border px-4 py-4 text-sm font-semibold transition"
                :class="booking.date === date ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-200 bg-[#FAF7F2] text-stone-700'"
              >
                {{ date }}
              </button>
            </div>
          </div>

          <div class="mt-8">
            <label class="block text-sm font-semibold text-stone-600">Choose Time</label>
            <div class="mt-3 grid gap-3 md:grid-cols-4">
              <button
                v-for="time in times"
                :key="time"
                @click="booking.time = time"
                class="rounded-2xl border px-4 py-4 text-sm font-semibold transition"
                :class="booking.time === time ? 'border-stone-900 bg-stone-900 text-white' : 'border-stone-200 bg-[#FAF7F2] text-stone-700'"
              >
                {{ time }}
              </button>
            </div>
          </div>

          <div class="mt-8 grid gap-4 md:grid-cols-2">
            <input
              v-model="booking.name"
              type="text"
              placeholder="Full name"
              class="rounded-2xl border border-stone-200 bg-[#FAF7F2] px-5 py-4 outline-none focus:ring-2 focus:ring-stone-900"
            />

            <input
              v-model="booking.email"
              type="email"
              placeholder="Email address"
              class="rounded-2xl border border-stone-200 bg-[#FAF7F2] px-5 py-4 outline-none focus:ring-2 focus:ring-stone-900"
            />
          </div>

          <textarea
            v-model="booking.notes"
            placeholder="Any notes? Example: first time joining Pilates"
            class="mt-4 w-full rounded-2xl border border-stone-200 bg-[#FAF7F2] px-5 py-4 outline-none focus:ring-2 focus:ring-stone-900"
            rows="4"
          ></textarea>

          <p v-if="error" class="mt-4 text-sm font-semibold text-red-600">
            {{ error }}
          </p>

          <button
            @click="confirmBooking"
            class="mt-6 rounded-full bg-stone-900 px-8 py-4 text-sm font-semibold text-white transition hover:bg-stone-700"
          >
            Confirm Booking
          </button>
        </div>

        <aside class="rounded-[2.5rem] bg-stone-900 p-8 text-white shadow-xl">
          <p class="text-sm text-stone-300">Booking Summary</p>

          <h2 class="mt-4 text-3xl font-bold">
            {{ booking.className || 'No class selected' }}
          </h2>

          <div class="mt-8 space-y-4 text-sm">
            <div class="flex justify-between border-b border-white/10 pb-3">
              <span class="text-stone-300">Date</span>
              <span>{{ booking.date || '-' }}</span>
            </div>

            <div class="flex justify-between border-b border-white/10 pb-3">
              <span class="text-stone-300">Time</span>
              <span>{{ booking.time || '-' }}</span>
            </div>

            <div class="flex justify-between border-b border-white/10 pb-3">
              <span class="text-stone-300">Name</span>
              <span>{{ booking.name || '-' }}</span>
            </div>

            <div class="flex justify-between">
              <span class="text-stone-300">Status</span>
              <span>Pending Confirmation</span>
            </div>
          </div>
        </aside>
      </div>

      <div
        v-if="showModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-6"
      >
        <div class="max-w-md rounded-[2rem] bg-white p-8 text-center shadow-2xl">
          <div class="text-6xl">✨</div>
          <h2 class="mt-4 text-3xl font-bold">Booking Confirmed</h2>
          <p class="mt-3 text-stone-600">
            Your {{ booking.className }} session has been reserved.
          </p>

          <button
            @click="showModal = false"
            class="mt-6 rounded-full bg-stone-900 px-8 py-3 text-sm font-semibold text-white"
          >
            Done
          </button>
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

const error = ref('')
const showModal = ref(false)

const booking = ref({
  className: '',
  date: '',
  time: '',
  name: '',
  email: '',
  notes: '',
})

const classes = [
  { id: 1, name: 'Slow Flow Pilates', price: 38 },
  { id: 2, name: 'Core Sculpt', price: 45 },
  { id: 3, name: 'Flex & Restore', price: 35 },
  { id: 4, name: 'Power Reformer', price: 55 },
]

const dates = ['Mon 10', 'Tue 11', 'Wed 12', 'Thu 13']
const times = ['8:00 AM', '10:00 AM', '2:00 PM', '6:00 PM']

const confirmBooking = () => { 
  if (
    !booking.value.className ||
    !booking.value.date ||
    !booking.value.time ||
    !booking.value.name ||
    !booking.value.email
  ) {
    error.value = 'Please complete all required booking details.'
    return
  }

  error.value = ''
  showModal.value = true
}
</script>