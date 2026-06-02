<template>
  <main class="min-h-screen bg-[#FAF7F2] text-stone-900">
    <Navbar />

    <section
      class="relative overflow-hidden px-6 py-20 min-h-[75vh] flex items-center"
      :style="{ backgroundImage: `url(${pilatesHeroImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
    >
      <div class="absolute inset-0 bg-[#FAF7F2]/35"></div>
      <div class="absolute left-10 top-28 h-72 w-72 rounded-full bg-[#D9C5B2]/40 blur-3xl"></div>
      <div class="absolute right-10 top-40 h-96 w-96 rounded-full bg-[#A8BBA3]/30 blur-3xl"></div>

      <div class="relative mx-auto max-w-3xl z-10">
        <div class="mx-auto max-w-3xl text-center">
        <p class="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-stone-600 shadow-sm">
          Mood-Based Recommendation
        </p>

        <h1 class="text-5xl font-bold tracking-tight">
          How are you feeling today?
        </h1>

        <p class="mt-4 text-stone-600">
          Choose your current mood and Glow Studio will recommend a Pilates class that fits your body and mind.
        </p>
      </div>

      </div>
    </section>


    <section class="mx-auto max-w-7xl px-6 pt-20 pb-20">

      <div class="mt-12 grid gap-5 md:grid-cols-3">
        <button
          v-for="mood in moods"
          :key="mood.id"
          @click="selectedMood = mood"
          class="rounded-[2rem] bg-white p-6 text-left shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
          :class="selectedMood?.id === mood.id ? 'ring-2 ring-stone-900' : ''"
        >
          <div class="text-5xl">{{ mood.icon }}</div>
          <h2 class="mt-4 text-xl font-bold">{{ mood.label }}</h2>
          <p class="mt-2 text-sm text-stone-600">{{ mood.description }}</p>
        </button>
      </div>

      <div
        v-if="selectedMood"
        class="mt-12 rounded-[2.5rem] bg-white p-8 shadow-xl md:p-10"
      >
        <div class="grid gap-8 lg:grid-cols-2">
          <div>
            <p class="text-sm font-semibold uppercase tracking-widest text-stone-500">
              Recommended for you
            </p>

            <h2 class="mt-3 text-4xl font-bold">
              {{ selectedMood.className }}
            </h2>

            <p class="mt-4 text-stone-600">
              {{ selectedMood.reason }}
            </p>

            <div class="mt-6 grid grid-cols-2 gap-4">
              <div class="rounded-3xl bg-[#FAF7F2] p-5">
                <p class="text-sm text-stone-500">Level</p>
                <p class="font-bold">{{ selectedMood.level }}</p>
              </div>

              <div class="rounded-3xl bg-[#FAF7F2] p-5">
                <p class="text-sm text-stone-500">Duration</p>
                <p class="font-bold">{{ selectedMood.duration }}</p>
              </div>
            </div>

            <RouterLink
              :to="`/class/${selectedMood.classId}`"
              class="mt-8 inline-block rounded-full bg-stone-900 px-8 py-4 text-sm font-semibold text-white transition hover:bg-stone-700"
            >
              View Recommended Class
            </RouterLink>
          </div>

          <div class="flex items-center justify-center rounded-[2rem] bg-gradient-to-br from-[#F5EFE6] to-[#D9C5B2]/40 p-10">
            <span class="text-9xl">{{ selectedMood.resultIcon }}</span>
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
const selectedMood = ref(null)
import pilatesHeroImage from '../assets/images/mood1.jpg'

const moods = [
  {
    id: 1,
    icon: '😮‍💨',
    label: 'I feel stressed',
    description: 'I need something calming and gentle.',
    classId: 1,
    className: 'Slow Flow Pilates',
    level: 'Beginner',
    duration: '45 min',
    resultIcon: '🌿',
    reason:
      'Slow Flow Pilates is recommended because it focuses on breathing, posture, and controlled movements to help release stress.',
  },
  {
    id: 2,
    icon: '🔥',
    label: 'I want to tone',
    description: 'I want a stronger core and body control.',
    classId: 2,
    className: 'Core Sculpt',
    level: 'Intermediate',
    duration: '50 min',
    resultIcon: '🔥',
    reason:
      'Core Sculpt is recommended because it focuses on strengthening core muscles, improving balance, and building endurance.',
  },
  {
    id: 3,
    icon: '🧘🏻‍♀️',
    label: 'I need flexibility',
    description: 'I want to stretch, recover, and move better.',
    classId: 3,
    className: 'Flex & Restore',
    level: 'Beginner',
    duration: '40 min',
    resultIcon: '🧘🏻‍♀️',
    reason:
      'Flex & Restore is recommended because it supports mobility, muscle recovery, and relaxation through gentle movement.',
  },
]
</script>