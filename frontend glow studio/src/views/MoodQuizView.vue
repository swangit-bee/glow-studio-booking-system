<template>
  <main class="min-h-screen bg-[#FAF7F2] text-stone-900">
    <Navbar />

    <section
      class="relative flex min-h-[75vh] items-center overflow-hidden px-6 py-20"
      :style="{
        backgroundImage: `url(${pilatesHeroImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }"
    >
      <div class="absolute inset-0 bg-[#FAF7F2]/35"></div>
      <div class="absolute left-10 top-28 h-72 w-72 rounded-full bg-[#D9C5B2]/40 blur-3xl"></div>
      <div class="absolute right-10 top-40 h-96 w-96 rounded-full bg-[#A8BBA3]/30 blur-3xl"></div>

      <div class="relative z-10 mx-auto max-w-3xl">
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
      <div v-if="loading" class="rounded-3xl bg-white p-10 text-center shadow-sm">
        Loading class recommendations...
      </div>

      <div v-else>
        <div class="mt-12 grid gap-5 md:grid-cols-3">
          <button
            v-for="mood in moods"
            :key="mood.id"
            @click="selectMood(mood)"
            class="rounded-[2rem] bg-white p-6 text-left shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
            :class="selectedMood?.id === mood.id ? 'ring-2 ring-stone-900' : ''"
          >
            <div class="text-5xl">{{ mood.icon }}</div>
            <h2 class="mt-4 text-xl font-bold">{{ mood.label }}</h2>
            <p class="mt-2 text-sm text-stone-600">{{ mood.description }}</p>
          </button>
        </div>

        <div
          v-if="selectedMood && recommendedClass"
          class="mt-12 rounded-[2.5rem] bg-white p-8 shadow-xl md:p-10"
        >
          <div class="grid gap-8 lg:grid-cols-2">
            <div>
              <p class="text-sm font-semibold uppercase tracking-widest text-stone-500">
                Recommended for you
              </p>

              <h2 class="mt-3 text-4xl font-bold">
                {{ recommendedClass.name }}
              </h2>

              <p class="mt-4 text-stone-600">
                {{ selectedMood.reason }}
              </p>

              <div class="mt-6 grid grid-cols-2 gap-4">
                <div class="rounded-3xl bg-[#FAF7F2] p-5">
                  <p class="text-sm text-stone-500">Level</p>
                  <p class="font-bold">{{ recommendedClass.level }}</p>
                </div>

                <div class="rounded-3xl bg-[#FAF7F2] p-5">
                  <p class="text-sm text-stone-500">Duration</p>
                  <p class="font-bold">{{ recommendedClass.duration }}</p>
                </div>

                <div class="rounded-3xl bg-[#FAF7F2] p-5">
                  <p class="text-sm text-stone-500">Price</p>
                  <p class="font-bold">RM {{ recommendedClass.price }}</p>
                </div>

                <div class="rounded-3xl bg-[#FAF7F2] p-5">
                  <p class="text-sm text-stone-500">Instructor</p>
                  <p class="font-bold">{{ recommendedClass.instructor }}</p>
                </div>
              </div>

              <RouterLink
                :to="`/class/${recommendedClass.id}`"
                class="mt-8 inline-block rounded-full bg-stone-900 px-8 py-4 text-sm font-semibold text-white transition hover:bg-stone-700"
              >
                View Recommended Class
              </RouterLink>
            </div>

            <div
              class="flex items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#F5EFE6] to-[#D9C5B2]/40"
            >
              <img
                v-if="recommendedClass.image_url"
                :src="recommendedClass.image_url"
                :alt="recommendedClass.name"
                class="h-[420px] w-full object-cover"
              />

              <span v-else class="p-10 text-9xl">
                {{ selectedMood.resultIcon }}
              </span>
            </div>
          </div>
        </div>

        <div
          v-if="selectedMood && !recommendedClass"
          class="mt-12 rounded-[2.5rem] bg-red-50 p-8 text-center text-red-700 shadow-sm"
        >
          Recommended class not found in Supabase.
        </div>
      </div>
    </section>

    <Footer />
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import pilatesHeroImage from '../assets/images/mood1.jpg'

const selectedMood = ref(null)
const classes = ref([])
const loading = ref(true)

const moods = [
  {
    id: 1,
    label: 'I feel stressed',
    description: 'I need something calming and gentle.',
    targetClassName: 'Slow Flow Pilates',
    icon: '😌',
    resultIcon: '🌿',
    reason:
      'Slow Flow Pilates is recommended because it focuses on breathing, posture, and controlled movements to help release stress.',
  },
  {
    id: 2,
    label: 'I want to tone',
    description: 'I want a stronger core and body control.',
    targetClassName: 'Core Sculpt',
    icon: '🔥',
    resultIcon: '🔥',
    reason:
      'Core Sculpt is recommended because it focuses on strengthening core muscles, improving balance, and building endurance.',
  },
  {
    id: 3,
    label: 'I need flexibility',
    description: 'I want to stretch, recover, and move better.',
    targetClassName: 'Flex & Restore',
    icon: '🧘🏻‍♀️',
    resultIcon: '🧘🏻‍♀️',
    reason:
      'Flex & Restore is recommended because it supports mobility, muscle recovery, and relaxation through gentle movement.',
  },
]

const recommendedClass = computed(() => {
  if (!selectedMood.value) return null

  return classes.value.find(
    (item) => item.name === selectedMood.value.targetClassName,
  )
})

const selectMood = (mood) => {
  selectedMood.value = mood
}

const loadClasses = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/classes')

    if (!response.ok) {
      throw new Error('Failed to load classes')
    }

    classes.value = await response.json()
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadClasses()
})
</script>