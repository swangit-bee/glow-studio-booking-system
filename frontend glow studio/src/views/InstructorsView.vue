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
        <div class="mb-10 text-center">
          <p class="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-stone-600 shadow-sm">
            Meet Your Instructors
          </p>

          <h1 class="text-5xl font-bold tracking-tight">
            Guided by movement specialists
          </h1>

          <p class="mx-auto mt-4 max-w-2xl text-stone-600">
            Each instructor brings a unique style, helping users find the right class based on comfort, goals, and experience level.
          </p>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-6 pt-32 pb-20">
      <div v-if="loading" class="rounded-3xl bg-white p-10 text-center shadow-sm">
        Loading instructors...
      </div>

      <div v-else-if="errorMessage" class="rounded-3xl bg-red-50 p-10 text-center shadow-sm">
        <p class="font-semibold text-red-700">{{ errorMessage }}</p>
      </div>

      <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="instructor in instructors"
          :key="instructor.id"
          class="rounded-[2rem] bg-white p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-2xl"
        >
          <div class="flex justify-center">
  <img
    v-if="instructor.image_url"
    :src="instructor.image_url"
    :alt="instructor.name"
    class="h-44 w-44 rounded-full object-cover shadow-lg"
  />
  <span v-else class="text-7xl">{{ instructor.icon }}</span>
</div>

          <div class="mt-6">
            <div class="flex items-center justify-between">
              <h2 class="text-2xl font-bold">{{ instructor.name }}</h2>
              <span class="rounded-full bg-[#A8BBA3]/30 px-3 py-1 text-xs font-semibold">
                ⭐ {{ instructor.rating || '4.8' }}
              </span>
            </div>

            <p class="mt-2 text-sm font-semibold text-stone-500">
              {{ instructor.specialty }}
            </p>

            <p class="mt-4 text-sm leading-6 text-stone-600">
              {{ instructor.bio }}
            </p>

            <div class="mt-5 rounded-2xl bg-[#FAF7F2] p-4">
              <p class="text-sm text-stone-500">Experience</p>
              <p class="font-bold">{{ instructor.experience || 'Not specified' }}</p>
            </div>

            <div class="mt-3 rounded-2xl bg-[#FAF7F2] p-4">
              <p class="text-sm text-stone-500">Signature Class</p>
              <p class="font-bold">{{ instructor.signature_class }}</p>
            </div>

            <RouterLink
              to="/classes"
              class="mt-5 block rounded-full bg-stone-900 py-3 text-center text-sm font-semibold text-white transition hover:bg-stone-700"
            >
              View Classes
            </RouterLink>
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
import pilatesHeroImage from '../assets/images/people1.jpg'

const instructors = ref([])
const loading = ref(true)
const errorMessage = ref('')

const iconMap = {
  'Maya Collins': '🌿',
  'Sofia Tan': '🔥',
  'Aina Rahman': '🧘🏻‍♀️',
}

const loadInstructors = async () => {
  try {
    const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/instructors`
)
    if (!response.ok) {
      throw new Error('Failed to load instructors')
    }

    const data = await response.json()

    instructors.value = data.map((instructor) => ({
      ...instructor,
      icon: iconMap[instructor.name] || '✨',
    }))
  } catch (error) {
    console.error(error)
    errorMessage.value = 'Failed to load instructors. Please make sure backend is running.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadInstructors()
})
</script>