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
        <div class="rounded-[2.5rem] bg-white p-8 shadow-xl lg:col-span-2">
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
                :class="
                  booking.date === date
                    ? 'border-stone-900 bg-stone-900 text-white'
                    : 'border-stone-200 bg-[#FAF7F2] text-stone-700'
                "
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
                :class="
                  booking.time === time
                    ? 'border-stone-900 bg-stone-900 text-white'
                    : 'border-stone-200 bg-[#FAF7F2] text-stone-700'
                "
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
              :readonly="!!currentUser"
              class="rounded-2xl border border-stone-200 bg-[#FAF7F2] px-5 py-4 outline-none focus:ring-2 focus:ring-stone-900"
            />

            <input
              v-model="booking.email"
              type="email"
              placeholder="Email address"
              :readonly="!!currentUser"
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
            @click="goToHistory"
            class="mt-6 rounded-full bg-stone-900 px-8 py-3 text-sm font-semibold text-white"
          >
            View Booking History
          </button>
        </div>
      </div>
    </section>

    <Footer />
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

const API_URL = import.meta.env.VITE_API_URL

const route = useRoute()
const router = useRouter()

const error = ref('')
const showModal = ref(false)
const classes = ref([])
const currentUser = ref(null)

const booking = ref({
  className: '',
  date: '',
  time: '',
  name: '',
  email: '',
  notes: '',
})

const dates = ['Mon 10', 'Tue 11', 'Wed 12', 'Thu 13']
const times = ['8:00 AM', '10:00 AM', '2:00 PM', '6:00 PM']

onMounted(async () => {
  try {
    currentUser.value = JSON.parse(localStorage.getItem('glowUser'))

    if (currentUser.value) {
      booking.value.name = currentUser.value.name
      booking.value.email = currentUser.value.email
    }

    const response = await fetch(`${API_URL}/api/classes`)

    if (!response.ok) throw new Error('Failed to load classes')

    const data = await response.json()
    classes.value = data

    const classId = route.query.classId

    if (classId) {
      const selectedClass = data.find((item) => item.id === Number(classId))
      if (selectedClass) booking.value.className = selectedClass.name
    }
  } catch (err) {
    console.error(err)
    error.value = 'Failed to load classes. Please make sure backend is running.'
  }
})

const confirmBooking = async () => {
  if (!currentUser.value) {
    error.value = 'Please login before making a booking.'

    setTimeout(() => {
      router.push('/login')
    }, 500)

    return
  }

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

  try {
    const selectedClass = classes.value.find(
      (item) => item.name === booking.value.className,
    )

    if (!selectedClass) {
      error.value = 'Selected class is not valid.'
      return
    }

    const response = await fetch(`${API_URL}/api/bookings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customer_name: booking.value.name,
        email: booking.value.email,
        class_id: selectedClass.id,
        class_name: booking.value.className,
        instructor: selectedClass.instructor,
        booking_date: booking.value.date,
        booking_time: booking.value.time,
        notes: booking.value.notes,
      }),
    })

    if (!response.ok) throw new Error('Booking failed')

    error.value = ''
    showModal.value = true
  } catch (err) {
    console.error(err)
    error.value = 'Failed to create booking. Please try again.'
  }
}

const goToHistory = () => {
  showModal.value = false
  router.push('/booking-history')
}
</script>