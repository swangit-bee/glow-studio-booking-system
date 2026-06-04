<template>
  <main class="min-h-screen bg-[#FAF7F2] text-stone-900">
    <Navbar />

    <section class="mx-auto max-w-7xl px-6 pt-32 pb-20">
      <RouterLink to="/classes" class="mb-8 inline-block text-sm font-semibold text-stone-600">
        ← Back to Classes
      </RouterLink>

      <div v-if="loading" class="rounded-3xl bg-white p-10 text-center shadow-sm">
        <p class="text-stone-600">Loading class details...</p>
      </div>

      <div v-else-if="errorMessage" class="rounded-3xl bg-red-50 p-10 text-center shadow-sm">
        <p class="font-semibold text-red-700">{{ errorMessage }}</p>
      </div>

      <div v-else-if="classItem" class="grid gap-10 lg:grid-cols-2">
        <div class="rounded-[2.5rem] bg-white p-6 shadow-xl">
          <div
            class="flex h-[420px] items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#F5EFE6] to-[#D9C5B2]/40"
          >
            <img
              v-if="classItem.image_url"
              :src="classItem.image_url"
              :alt="classItem.name"
              class="h-full w-full object-cover"
            />

            <span v-else class="text-9xl">{{ classItem.icon }}</span>
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
              <li v-for="benefit in benefits" :key="benefit">
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
   
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

const route = useRoute()

const classItem = ref(null)
const loading = ref(true)
const errorMessage = ref('')

const iconMap = {
  'Slow Flow Pilates': '🌿',
  'Core Sculpt': '🔥',
  'Flex & Restore': '🧘🏻‍♀️',
  'Power Reformer': '⚡',
  'Morning Glow': '☀️',
  'Zen Flow Pilates': '✨',
}

const benefitsMap = {
  'Slow Flow Pilates': ['Improve posture', 'Reduce stress', 'Build body awareness'],
  'Core Sculpt': ['Strengthen core muscles', 'Improve balance', 'Increase endurance'],
  'Flex & Restore': ['Increase flexibility', 'Relax tight muscles', 'Support recovery'],
  'Power Reformer': ['Build strength', 'Improve coordination', 'Boost endurance'],
  'Morning Glow': ['Increase energy', 'Improve focus', 'Start the day mindfully'],
  'Zen Flow Pilates': ['Calm the mind', 'Improve breathing', 'Support relaxation'],
}

onMounted(async () => {
  try {
    const response = await fetch(`http://localhost:5000/api/classes/${route.params.id}`)

    if (!response.ok) {
      throw new Error('Class not found')
    }

    const data = await response.json()

    classItem.value = {
      ...data,
      icon: iconMap[data.name] || '✨',
    }
  } catch (error) {
    console.error(error)
    errorMessage.value = 'Failed to load class details. Please make sure the backend is running.'
  } finally {
    loading.value = false
  }
})

const benefits = computed(() => {
  if (!classItem.value) return []
  return benefitsMap[classItem.value.name] || [
    'Improve movement control',
    'Support body strength',
    'Build wellness consistency',
  ]
})
</script>