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
        <div class="text-center">
          <p class="mb-4 inline-flex rounded-full bg-white/70 px-4 py-2 text-sm font-medium text-stone-600 shadow-sm">
            Premium Pilates Booking Platform
          </p>

          <h1 class="text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            Move. Breathe. Glow.
          </h1>

          <p class="mt-6 max-w-xl text-lg leading-8 text-stone-600">
            Discover personalised Pilates classes, mood-based recommendations,
            instructor profiles, and seamless wellness booking in one aesthetic platform.
          </p>

          <div class="mt-8 flex flex-wrap justify-center gap-4">
            <RouterLink
              to="/classes"
              class="rounded-full bg-stone-900 px-7 py-4 text-sm font-semibold text-white shadow-xl transition hover:-translate-y-1 hover:bg-stone-700"
            >
              Explore Classes
            </RouterLink>

            <RouterLink
              to="/mood-quiz"
              class="rounded-full bg-white px-7 py-4 text-sm font-semibold text-stone-900 shadow-md transition hover:-translate-y-1"
            >
              Find My Flow
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-[#FAF7F2] px-6 py-24">
      <div class="mx-auto max-w-7xl">
        <div class="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <p class="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
              About Glow Studio
            </p>

            <h2 class="text-5xl font-bold leading-tight text-stone-900">
              Wellness is more than exercise.
            </h2>

            <p class="mt-6 text-lg leading-8 text-stone-600">
              Glow Studio is a modern Pilates wellness platform designed to help
              individuals build strength, improve flexibility, and achieve balance
              in their daily lives. We combine expert-led Pilates sessions,
              personalised class recommendations, and a seamless booking experience
              into one elegant platform.
            </p>

            <p class="mt-4 text-lg leading-8 text-stone-600">
              Whether you're a beginner discovering Pilates for the first time or an
              experienced practitioner looking to deepen your practice, Glow Studio
              provides a supportive environment where wellness becomes a sustainable
              lifestyle.
            </p>

            <div class="mt-8 flex flex-wrap gap-4">
              <div class="rounded-2xl bg-white px-6 py-4 shadow-sm">
                <h3 class="text-2xl font-bold">4.9★</h3>
                <p class="text-sm text-stone-500">Average Rating</p>
              </div>

              <div class="rounded-2xl bg-white px-6 py-4 shadow-sm">
                <h3 class="text-2xl font-bold">500+</h3>
                <p class="text-sm text-stone-500">Monthly Bookings</p>
              </div>

              <div class="rounded-2xl bg-white px-6 py-4 shadow-sm">
                <h3 class="text-2xl font-bold">{{ instructors.length }}</h3>
                <p class="text-sm text-stone-500">Expert Instructors</p>
              </div>
            </div>
          </div>

          <div class="relative">
            <div class="overflow-hidden rounded-[3rem] shadow-2xl">
              <img
                :src="pilatesImage"
                alt="Glow Studio Pilates"
                class="h-[500px] w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-white px-6 py-24">
  <div class="mx-auto max-w-7xl">
    <div class="mb-16 text-center">
      <p class="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
        Wellness Benefits
      </p>

      <h2 class="text-5xl font-bold text-stone-900">
        Why Choose Pilates?
      </h2>

      <p class="mx-auto mt-4 max-w-2xl text-stone-600">
        Experience the physical and mental benefits of Pilates through expert-led classes designed for every level.
      </p>
    </div>

    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <div class="rounded-[2rem] bg-[#FAF7F2] p-8 shadow-sm">
        <h3 class="mt-4 text-2xl font-bold">Reduce Stress</h3>
        <p class="mt-3 text-stone-600">
          Calm movement and mindful breathing help reduce daily stress.
        </p>
      </div>

      <div class="rounded-[2rem] bg-[#FAF7F2] p-8 shadow-sm">
        <h3 class="mt-4 text-2xl font-bold">Build Strength</h3>
        <p class="mt-3 text-stone-600">
          Develop a stronger core and improve overall body stability.
        </p>
      </div>

      <div class="rounded-[2rem] bg-[#FAF7F2] p-8 shadow-sm">
        <h3 class="mt-4 text-2xl font-bold">Improve Flexibility</h3>
        <p class="mt-3 text-stone-600">
          Enhance mobility and range of motion through controlled movements.
        </p>
      </div>

      <div class="rounded-[2rem] bg-[#FAF7F2] p-8 shadow-sm">
        <h3 class="mt-4 text-2xl font-bold">Better Posture</h3>
        <p class="mt-3 text-stone-600">
          Strengthen postural muscles and improve body alignment.
        </p>
      </div>

      <div class="rounded-[2rem] bg-[#FAF7F2] p-8 shadow-sm">
        <h3 class="mt-4 text-2xl font-bold">Mind-Body Balance</h3>
        <p class="mt-3 text-stone-600">
          Connect movement with breathing for a healthier lifestyle.
        </p>
      </div>

      <div class="rounded-[2rem] bg-[#FAF7F2] p-8 shadow-sm">
        <h3 class="mt-4 text-2xl font-bold">Beginner Friendly</h3>
        <p class="mt-3 text-stone-600">
          Suitable for all fitness levels with guided instruction.
        </p>
      </div>
    </div>
  </div>
</section>

<section class="bg-[#FAF7F2] px-6 py-24">
  <div class="mx-auto max-w-7xl">
    <div class="mb-16 text-center">
      <p class="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-stone-500">
        Studio Moments
      </p>

      <h2 class="text-5xl font-bold text-stone-900">
        Explore Glow Studio
      </h2>

      <p class="mx-auto mt-4 max-w-2xl text-stone-600">
        Discover the atmosphere, movement, and wellness experiences waiting for you.
      </p>
    </div>

    <div class="relative">
  <button
    @click="previousSlide"
    class="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 px-5 py-4 shadow-xl transition hover:scale-110"
  >
    ←
  </button>

  <div class="overflow-hidden">
    <div
      class="flex gap-6 transition-transform duration-700 ease-in-out"
      :style="{ transform: `translateX(-${currentSlide * 34}%)` }"
    >
      <div
        v-for="(image, index) in sliderImages"
        :key="index"
        class="w-full shrink-0 md:w-[31.5%]"
      >
        <img
          :src="image"
          alt="Glow Studio"
          class="h-[620px] w-full rounded-[2rem] object-cover shadow-2xl"
        />
      </div>
    </div>
  </div>

  <button
    @click="nextSlide"
    class="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/90 px-5 py-4 shadow-xl transition hover:scale-110"
  >
    →
  </button>
</div>

    <div class="mt-8 flex justify-center gap-3">
      <button
        v-for="(image, index) in galleryImages"
        :key="index"
        @click="currentSlide = index"
        class="h-3 w-3 rounded-full"
        :class="index === currentSlide ? 'bg-stone-900' : 'bg-stone-300'"
      ></button>
    </div>
  </div>
</section>

    <!-- Meet Our Instructors -->
    <section class="bg-white px-6 py-24">
      <div class="mx-auto max-w-7xl">
        <div class="mb-16 text-center">
          <h2 class="text-5xl font-bold uppercase tracking-wide text-stone-700">
            Meet Our Instructors
          </h2>

          <p class="mx-auto mt-4 max-w-2xl text-stone-500">
            Learn from experienced instructors who bring calm, strength, and confidence into every class.
          </p>
        </div>

        <div v-if="loadingInstructors" class="rounded-3xl bg-[#FAF7F2] p-10 text-center shadow-sm">
          Loading instructors...
        </div>

        <div v-else-if="featuredInstructors.length === 0" class="rounded-3xl bg-[#FAF7F2] p-10 text-center shadow-sm">
          No instructors available yet.
        </div>

        <div v-else class="grid gap-10 md:grid-cols-3">
          <div
            v-for="instructor in featuredInstructors"
            :key="instructor.id"
            class="text-center"
          >
            <div
              class="mx-auto h-[500px] overflow-hidden rounded-t-[180px] border-4 border-stone-500 bg-gradient-to-br from-stone-200 to-stone-100"
            >
              <img
                v-if="instructor.image_url"
                :src="instructor.image_url"
                :alt="instructor.name"
                class="h-full w-full object-cover"
              />

              <div
                v-else
                class="flex h-full w-full items-center justify-center"
              >
                <span class="text-8xl">🧘🏻‍♀️</span>
              </div>
            </div>

            <h3 class="mt-5 text-3xl font-bold text-stone-700">
              {{ instructor.name }}
            </h3>

            <p class="mt-2 text-stone-500">
              {{ instructor.specialty }}
            </p>
          </div>
        </div>

        <div class="mt-12 text-center">
          <RouterLink
            to="/instructors"
            class="inline-block rounded-full bg-stone-900 px-8 py-4 text-sm font-semibold text-white transition hover:bg-stone-700"
          >
            View All Instructors
          </RouterLink>
        </div>
      </div>
    </section>

    <Footer />
  </main>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import pilatesHeroImage from '../assets/images/pilates 1.jpg'
import pilatesImage from '../assets/images/pilates 2.jpg'
import gallery1 from '../assets/images/gallery1.jpg'
import gallery2 from '../assets/images/gallery2.jpg'
import gallery3 from '../assets/images/gallery3.jpg'
import gallery4 from '../assets/images/gallery4.jpg'
import gallery5 from '../assets/images/gallery5.jpg'
import gallery6 from '../assets/images/gallery6.jpg'

const instructors = ref([])
const loadingInstructors = ref(true)

const featuredInstructors = computed(() => {
  return instructors.value.slice(0, 3)
})

const galleryImages = [
  gallery1,
  gallery2,
  gallery3,
  gallery4,
  gallery5,
  gallery6,
]

const sliderImages = [...galleryImages, ...galleryImages]

const currentSlide = ref(0)

const nextSlide = () => {
  currentSlide.value =
    currentSlide.value >= galleryImages.length - 1 ? 0 : currentSlide.value + 1
}

const previousSlide = () => {
  currentSlide.value =
    currentSlide.value === 0 ? galleryImages.length - 1 : currentSlide.value - 1
}

let sliderInterval = null

const loadInstructors = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/instructors')

    if (!response.ok) {
      throw new Error('Failed to load instructors')
    }

    instructors.value = await response.json()
  } catch (error) {
    console.error(error)
  } finally {
    loadingInstructors.value = false
  }
}

onMounted(() => {
  loadInstructors()

  sliderInterval = setInterval(() => {
    nextSlide()
  }, 3500)
})

onUnmounted(() => {
  if (sliderInterval) {
    clearInterval(sliderInterval)
  }
})
</script>

<style scoped>
.gallery-enter-active,
.gallery-leave-active {
  transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
}

.gallery-enter-from {
  opacity: 0;
  transform: translateX(80px) scale(0.9);
}

.gallery-leave-to {
  opacity: 0;
  transform: translateX(-80px) scale(0.9);
}
</style>