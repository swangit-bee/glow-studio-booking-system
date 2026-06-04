<template>
  <main class="min-h-screen bg-[#FAF7F2] text-stone-900">
    <Navbar />

    <section
      class="relative flex min-h-[75vh] items-center overflow-hidden px-6 py-20"
      :style="{
        backgroundImage: `url(${classesBgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }"
    >
      <div class="absolute inset-0 bg-[#FAF7F2]/35"></div>
      <div class="absolute left-10 top-28 h-72 w-72 rounded-full bg-[#D9C5B2]/40 blur-3xl"></div>
      <div class="absolute right-10 top-40 h-96 w-96 rounded-full bg-[#A8BBA3]/30 blur-3xl"></div>

      <div class="relative z-10 mx-auto max-w-3xl">
        <div class="text-center">
          <p class="mb-4 inline-flex rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-stone-600 shadow-sm">
            Explore Classes
          </p>

          <h1 class="text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            Find your perfect flow
          </h1>

          <p class="mx-auto mt-6 max-w-xl text-xl font-semibold leading-8 text-stone-900 drop-shadow-sm">
            Browse Pilates classes based on your mood, fitness level, and wellness goal.
          </p>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-6 pb-20">
      <div class="mb-10 text-center">
        <h3 class="mt-4 text-3xl font-bold tracking-tight text-stone-800 md:text-4xl">
          Get To Know Your Level
        </h3>
      </div>

      <section class="relative px-2 py-8">
        <div
          class="pointer-events-none absolute left-[16%] right-[16%] top-16 hidden border-t-2 border-dashed border-stone-400/70 md:block"
        ></div>

        <div class="grid items-start gap-8 md:grid-cols-3">
          <div v-for="level in levels" :key="level.title" class="text-center">
            <div class="mb-4 flex items-center justify-center">
              <div
                class="h-16 w-16 rounded-full border-2 border-stone-700 ring-4 ring-white/70 shadow-sm"
                :class="level.color"
              ></div>
            </div>

            <h3 class="mb-4 text-2xl font-semibold text-stone-800">
              {{ level.title }}
            </h3>

            <div
              class="mx-auto flex min-h-[240px] max-w-sm items-center justify-center rounded-3xl border border-stone-200 bg-white/85 px-6 py-7 shadow-sm backdrop-blur-sm"
            >
              <p class="whitespace-pre-line text-center text-base leading-7 text-stone-700">
                {{ level.description }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div class="mb-10 grid gap-4 md:grid-cols-2">
        <input
          v-model="search"
          type="text"
          placeholder="Search classes..."
          class="rounded-2xl border border-stone-200 bg-white px-5 py-4 outline-none focus:ring-2 focus:ring-stone-900"
        />

        <div class="flex flex-wrap gap-3">
          <button
            @click="selectedLevel = ''"
            :class="filterButtonClass('')"
          >
            All
          </button>

          <button
            @click="selectedLevel = 'Beginner'"
            :class="filterButtonClass('Beginner')"
          >
            Beginner
          </button>

          <button
            @click="selectedLevel = 'Intermediate'"
            :class="filterButtonClass('Intermediate')"
          >
            Intermediate
          </button>

          <button
            @click="selectedLevel = 'Advanced'"
            :class="filterButtonClass('Advanced')"
          >
            Advanced
          </button>
        </div>
      </div>

      <div v-if="loading" class="rounded-3xl bg-white p-10 text-center shadow-sm">
        <p class="text-stone-600">Loading classes...</p>
      </div>

      <div v-else-if="errorMessage" class="rounded-3xl bg-red-50 p-10 text-center shadow-sm">
        <p class="font-semibold text-red-700">{{ errorMessage }}</p>
      </div>

      <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="item in filteredClasses"
          :key="item.id"
          class="group rounded-[2rem] bg-white p-5 shadow-sm transition hover:-translate-y-2 hover:shadow-2xl"
        >
          <div
            class="mb-5 flex h-52 items-center justify-center overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#F5EFE6] to-[#D9C5B2]/40"
          >
            <img
              v-if="item.image_url"
              :src="item.image_url"
              :alt="item.name"
              class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <span v-else class="text-6xl">{{ item.icon }}</span>
          </div>

          <div class="mb-4 flex items-center justify-between">
            <span class="rounded-full bg-[#A8BBA3]/30 px-3 py-1 text-xs font-semibold text-stone-700">
              {{ item.level }}
            </span>

            <span
              class="rounded-full px-3 py-1 text-xs font-semibold"
              :class="item.slots <= 3 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'"
            >
              {{ item.slots <= 3 ? 'Almost Full' : 'Available' }}
            </span>
          </div>

          <h2 class="text-2xl font-bold">{{ item.name }}</h2>
          <p class="mt-2 text-sm leading-6 text-stone-600">
            {{ item.description }}
          </p>

          <div class="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div class="rounded-2xl bg-[#FAF7F2] p-4">
              <p class="text-stone-500">Duration</p>
              <p class="font-bold">{{ item.duration }}</p>
            </div>

            <div class="rounded-2xl bg-[#FAF7F2] p-4">
              <p class="text-stone-500">Price</p>
              <p class="font-bold">RM {{ item.price }}</p>
            </div>
          </div>

          <RouterLink
            :to="`/class/${item.id}`"
            class="mt-5 block rounded-full bg-stone-900 py-3 text-center text-sm font-semibold text-white transition hover:bg-stone-700"
          >
            View Details
          </RouterLink>
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
import classesBgImage from '../assets/images/classes1.jpg'

const API_URL = import.meta.env.VITE_API_URL

const search = ref('')
const selectedLevel = ref('')
const classes = ref([])
const loading = ref(true)
const errorMessage = ref('')

const levels = [
  {
    title: 'Beginner',
    color: 'bg-lime-200',
    description:
      "If it's your first time or you're not a regular gym-goer, our Reformer Pilates is perfect for you. Join us in a welcoming space designed for beginners.",
  },
  {
    title: 'Intermediate',
    color: 'bg-yellow-100',
    description:
      "If you've dipped your toes into Reformer Pilates a few times and maintain an active routine, you're in the right place.\n\nOur classes are tailored for those with a regular workout groove, bringing the perfect challenge to your active lifestyle.",
  },
  {
    title: 'Advanced',
    color: 'bg-pink-300',
    description:
      'For those who love challenges and consider themselves “gym junkies”, this is where it gets intense and rewarding.',
  },
]

const iconMap = {
  'Slow Flow Pilates': '🌿',
  'Core Sculpt': '🔥',
  'Flex & Restore': '🧘🏻‍♀️',
  'Power Reformer': '⚡',
  'Morning Glow': '☀️',
  'Zen Flow Pilates': '✨',
}

onMounted(async () => {
  try {
    const response = await fetch(`${API_URL}/api/classes`)

    if (!response.ok) {
      throw new Error('Failed to fetch classes')
    }

    const data = await response.json()

    classes.value = data.map((item) => ({
      ...item,
      icon: iconMap[item.name] || '✨',
    }))
  } catch (error) {
    console.error(error)
    errorMessage.value = 'Failed to load classes. Please make sure the backend is running.'
  } finally {
    loading.value = false
  }
})

const filteredClasses = computed(() => {
  return classes.value.filter((item) => {
    const matchSearch = item.name
      .toLowerCase()
      .includes(search.value.toLowerCase())

    const matchLevel =
      selectedLevel.value === '' ||
      item.level === selectedLevel.value

    return matchSearch && matchLevel
  })
})

const filterButtonClass = (level) => {
  return selectedLevel.value === level
    ? 'rounded-full bg-stone-900 px-5 py-2 text-white'
    : 'rounded-full border border-stone-300 bg-white px-5 py-2 text-stone-700 transition hover:bg-stone-100'
}
</script>