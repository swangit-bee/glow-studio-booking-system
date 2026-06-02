<template>
  <main class="min-h-screen bg-[#FAF7F2] text-stone-900">
    <Navbar />

    <section class="mx-auto max-w-7xl px-6 pt-32 pb-20">
      <RouterLink to="/classes" class="mb-8 inline-block text-sm font-semibold text-stone-600">
        ← Back to Classes
      </RouterLink>

      <div v-if="classItem" class="grid gap-10 lg:grid-cols-2">
        <div class="rounded-[2.5rem] bg-white p-6 shadow-xl">
          <div class="flex h-[420px] items-center justify-center rounded-[2rem] bg-gradient-to-br from-[#F5EFE6] to-[#D9C5B2]/40">
            <span class="text-9xl">{{ classItem.icon }}</span>
          </div>
        </div>

        <div>
          <span class="rounded-full bg-[#A8BBA3]/30 px-4 py-2 text-sm font-semibold">
            {{ classItem.level }}
          </span>

          <h1 class="mt-6 text-5xl font-bold tracking-tight">
            {{ classItem.name }}
          </h1>

          <p class="mt-5 text-lg leading-8 text-stone-600">
            {{ classItem.description }}
          </p>

          <div class="mt-8 grid grid-cols-2 gap-4">
            <div class="rounded-3xl bg-white p-5 shadow-sm">
              <p class="text-sm text-stone-500">Duration</p>
              <p class="text-xl font-bold">{{ classItem.duration }}</p>
            </div>

            <div class="rounded-3xl bg-white p-5 shadow-sm">
              <p class="text-sm text-stone-500">Price</p>
              <p class="text-xl font-bold">RM {{ classItem.price }}</p>
            </div>

            <div class="rounded-3xl bg-white p-5 shadow-sm">
              <p class="text-sm text-stone-500">Instructor</p>
              <p class="text-xl font-bold">{{ classItem.instructor }}</p>
            </div>

            <div class="rounded-3xl bg-white p-5 shadow-sm">
              <p class="text-sm text-stone-500">Available Slots</p>
              <p class="text-xl font-bold">{{ classItem.slots }} left</p>
            </div>
          </div>

          <div class="mt-8 rounded-[2rem] bg-white p-6 shadow-sm">
            <h2 class="text-xl font-bold">Class Benefits</h2>
            <ul class="mt-4 space-y-3 text-stone-600">
              <li v-for="benefit in classItem.benefits" :key="benefit">
                ✨ {{ benefit }}
              </li>
            </ul>
          </div>

          <RouterLink
            :to="`/booking?classId=${classItem.id}`"
            class="mt-8 block rounded-full bg-stone-900 py-4 text-center font-semibold text-white transition hover:bg-stone-700"
          >
            Book This Class
          </RouterLink>
        </div>
      </div>

      <div v-else class="rounded-3xl bg-white p-10 text-center shadow-sm">
        <h1 class="text-3xl font-bold">Class not found</h1>
        <RouterLink to="/classes" class="mt-4 inline-block text-stone-600">
          Return to Classes
        </RouterLink>
      </div>
    </section>

    <Footer />
    <MobileBottomNav />
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import MobileBottomNav from '../components/MobileBottomNav.vue'

const route = useRoute()

const classes = [
  {
    id: 1,
    name: 'Slow Flow Pilates',
    level: 'Beginner',
    duration: '45 min',
    price: 38,
    slots: 4,
    icon: '🌿',
    instructor: 'Maya Collins',
    description:
      'A calm beginner-friendly session focused on breathing, posture, and slow movement.',
    benefits: ['Improve posture', 'Reduce stress', 'Build body awareness'],
  },
  {
    id: 2,
    name: 'Core Sculpt',
    level: 'Intermediate',
    duration: '50 min',
    price: 45,
    slots: 2,
    icon: '🔥',
    instructor: 'Sofia Tan',
    description:
      'A powerful class designed to strengthen your core and improve body control.',
    benefits: ['Strengthen core muscles', 'Improve balance', 'Increase endurance'],
  },
  {
    id: 3,
    name: 'Flex & Restore',
    level: 'Beginner',
    duration: '40 min',
    price: 35,
    slots: 8,
    icon: '🧘🏻‍♀️',
    instructor: 'Aina Rahman',
    description:
      'A restorative Pilates class focusing on flexibility, mobility, and stress relief.',
    benefits: ['Increase flexibility', 'Relax tight muscles', 'Support recovery'],
  },
]

const classItem = computed(() => {
  return classes.find((item) => item.id === Number(route.params.id))
})
</script>