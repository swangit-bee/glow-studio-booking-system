<template>
  <main class="min-h-screen bg-[#FAF7F2] text-stone-900">
    <Navbar />

    <section class="mx-auto max-w-7xl px-6 pt-32 pb-20">
      <div class="mb-10">
        <p class="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-stone-600 shadow-sm">
          User Dashboard
        </p>

        <h1 class="text-5xl font-bold tracking-tight">
          Welcome back, {{ currentUser?.name || 'Glow Member' }} ✨
        </h1>

        <p class="mt-4 text-stone-600">
          Track your wellness progress, upcoming class, and booking activity.
        </p>
      </div>

      <div v-if="loading" class="rounded-3xl bg-white p-10 text-center shadow-sm">
        Loading dashboard...
      </div>

      <template v-else>
        <div class="grid gap-6 md:grid-cols-4">
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="rounded-[2rem] bg-white p-6 shadow-sm"
          >
            <component
              :is="stat.icon"
              class="h-10 w-10 text-stone-900"
/>
            <p class="mt-4 text-sm text-stone-500">{{ stat.label }}</p>
            <h2 class="mt-1 text-3xl font-bold">{{ stat.value }}</h2>
          </div>
        </div>

        <div class="mt-8 grid gap-8 lg:grid-cols-3">
          <div class="rounded-[2.5rem] bg-white p-8 shadow-xl lg:col-span-2">
            <p class="text-sm font-semibold uppercase tracking-widest text-stone-500">
              Upcoming Class
            </p>

            <div v-if="upcomingBooking" class="mt-6 rounded-[2rem] bg-[#FAF7F2] p-6">
              <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 class="text-3xl font-bold">
                    {{ upcomingBooking.class_name }}
                  </h2>

                  <p class="mt-2 text-stone-600">
                    {{ upcomingBooking.booking_date }} • {{ upcomingBooking.booking_time }}
                  </p>

                  <p class="mt-1 text-stone-600">
                    Instructor: {{ upcomingBooking.instructor || 'Not assigned' }}
                  </p>
                </div>

                <RouterLink
                  to="/booking-history"
                  class="rounded-full bg-stone-900 px-6 py-3 text-center text-sm font-semibold text-white"
                >
                  View History
                </RouterLink>
              </div>
            </div>

            <div v-else class="mt-6 rounded-[2rem] bg-[#FAF7F2] p-6">
              <h2 class="text-2xl font-bold">No upcoming class yet</h2>
              <p class="mt-2 text-stone-600">
                Book your first Pilates session and start your wellness journey.
              </p>

              <RouterLink
                to="/classes"
                class="mt-5 inline-block rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white"
              >
                Explore Classes
              </RouterLink>
            </div>
          </div>

          <div class="rounded-[2.5rem] bg-stone-900 p-8 text-white shadow-xl">
            <p class="text-sm text-stone-300">Wellness Progress</p>

            <div class="mx-auto mt-8 flex h-44 w-44 items-center justify-center rounded-full border-[14px] border-[#A8BBA3]">
              <div class="text-center">
                <p class="text-4xl font-bold">{{ progressPercentage }}%</p>
                <p class="text-sm text-stone-300">Monthly Goal</p>
              </div>
            </div>

            <p class="mt-8 text-center text-sm text-stone-300">
              {{ progressMessage }}
            </p>

            <div
              v-if="membership"
              class="mt-8 rounded-2xl bg-white/10 p-5 text-center"
            >
              <p class="text-sm text-stone-300">
                Active Membership
              </p>

              <h3 class="mt-2 text-xl font-bold">
                {{ membership.planName }}
              </h3>

              <p class="mt-1 text-sm text-stone-300">
                RM {{ membership.price }} {{ membership.period }}
              </p>
            </div>
          </div>
        </div>
      </template>
    </section>

    <Footer />
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

import {
  CalendarDays,
  CheckCircle,
  Heart,
  Crown,
} from 'lucide-vue-next'

const API_URL = import.meta.env.VITE_API_URL

const currentUser = ref(null)
const bookings = ref([])
const loading = ref(true)
const membership = ref(null)

const loadDashboard = async () => {
  try {
    currentUser.value = JSON.parse(localStorage.getItem('glowUser'))

    const savedMembership = JSON.parse(localStorage.getItem('glowMembership'))

    if (
      savedMembership &&
      currentUser.value &&
      savedMembership.userEmail === currentUser.value.email
    ) {
      membership.value = savedMembership
    }

    if (!currentUser.value) {
      loading.value = false
      return
    }

    const response = await fetch(`${API_URL}/api/bookings`)

    if (!response.ok) {
      throw new Error('Failed to load bookings')
    }

    const data = await response.json()

    bookings.value = data.filter(
      (booking) => booking.email === currentUser.value.email,
    )
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const upcomingBooking = computed(() => {
  return bookings.value.find((booking) => booking.status === 'Upcoming')
})

const completedBookings = computed(() => {
  return bookings.value.filter((booking) => booking.status === 'Completed')
})

const favouriteClass = computed(() => {
  if (bookings.value.length === 0) return 'None'

  const count = {}

  bookings.value.forEach((booking) => {
    count[booking.class_name] = (count[booking.class_name] || 0) + 1
  })

  return Object.entries(count).sort((a, b) => b[1] - a[1])[0][0]
})

const progressPercentage = computed(() => {
  const monthlyGoal = 4
  return Math.min(
    Math.round((completedBookings.value.length / monthlyGoal) * 100),
    100,
  )
})

const progressMessage = computed(() => {
  const monthlyGoal = 4
  const remaining = monthlyGoal - completedBookings.value.length

  if (remaining <= 0) {
    return 'You completed your monthly wellness goal. Amazing work!'
  }

  return `You are ${remaining} class${remaining > 1 ? 'es' : ''} away from completing your monthly goal.`
})

const stats = computed(() => {
  return [
    {
      label: 'Total Bookings',
      value: bookings.value.length,
      icon: CalendarDays,
    },
    {
      label: 'Completed',
      value: completedBookings.value.length,
      icon: CheckCircle,
    },
    {
      label: 'Favourite Class',
      value: favouriteClass.value,
      icon: Heart,
    },
    {
      label: 'Membership',
      value: membership.value ? membership.value.planName : 'No Plan',
      icon: Crown,
    },
  ]
})

onMounted(() => {
  loadDashboard()
})
</script>