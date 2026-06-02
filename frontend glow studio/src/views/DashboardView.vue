<template>
  <main class="min-h-screen bg-[#FAF7F2] text-stone-900">
    <Navbar />

    <section class="mx-auto max-w-7xl px-6 pt-32 pb-20">
      <div class="mb-10">
        <p class="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-stone-600 shadow-sm">
          User Dashboard
        </p>

        <h1 class="text-5xl font-bold tracking-tight">Welcome back, Rasyidah ✨</h1>

        <p class="mt-4 text-stone-600">
          Track your wellness progress, upcoming class, and booking activity.
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-4">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="rounded-[2rem] bg-white p-6 shadow-sm"
        >
          <div class="text-4xl">{{ stat.icon }}</div>
          <p class="mt-4 text-sm text-stone-500">{{ stat.label }}</p>
          <h2 class="mt-1 text-3xl font-bold">{{ stat.value }}</h2>
        </div>
      </div>

      <div class="mt-8 grid gap-8 lg:grid-cols-3">
        <div class="rounded-[2.5rem] bg-white p-8 shadow-xl lg:col-span-2">
          <p class="text-sm font-semibold uppercase tracking-widest text-stone-500">
            Upcoming Class
          </p>

          <div class="mt-6 rounded-[2rem] bg-[#FAF7F2] p-6">
            <div class="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 class="text-3xl font-bold">Slow Flow Pilates</h2>
                <p class="mt-2 text-stone-600">Monday, 10 June • 8:00 AM</p>
                <p class="mt-1 text-stone-600">Instructor: Maya Collins</p>
              </div>

              <RouterLink
                to="/booking-history"
                class="rounded-full bg-stone-900 px-6 py-3 text-center text-sm font-semibold text-white"
              >
                View History
              </RouterLink>
            </div>
          </div>
        </div>

        <div class="rounded-[2.5rem] bg-stone-900 p-8 text-white shadow-xl">
          <p class="text-sm text-stone-300">Wellness Progress</p>

          <div class="mt-8 flex h-44 w-44 items-center justify-center rounded-full border-[14px] border-[#A8BBA3] mx-auto">
            <div class="text-center">
              <p class="text-4xl font-bold">72%</p>
              <p class="text-sm text-stone-300">Monthly Goal</p>
            </div>
          </div>

          <p class="mt-8 text-center text-sm text-stone-300">
            You are 3 classes away from completing your monthly goal.
          </p>
        </div>
      </div>
    </section>

    <Footer />
    <MobileBottomNav />
  </main>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import MobileBottomNav from '../components/MobileBottomNav.vue'

const stats = [
  { label: 'Total Bookings', value: '12', icon: '📅' },
  { label: 'Glow Streak', value: '5', icon: '🔥' },
  { label: 'Favourite Class', value: 'Flow', icon: '🌿' },
  { label: 'Membership', value: 'Student', icon: '🎓' },
]
</script>