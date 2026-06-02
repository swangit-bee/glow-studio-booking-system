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
        <div class="mb-10 text-center">
        <p class="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-stone-600 shadow-sm">
          Meet Your Instructors
        </p>

        <h1 class="text-5xl font-bold tracking-tight">Guided by movement specialists</h1>

        <p class="mx-auto mt-4 max-w-2xl text-stone-600">
          Each instructor brings a unique style, helping users find the right class based on comfort, goals, and experience level.
        </p>
      </div>

          
        
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-6 pt-32 pb-20">
      

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="instructor in instructors"
          :key="instructor.id"
          class="rounded-[2rem] bg-white p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-2xl"
        >
          <div class="flex h-48 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-[#F5EFE6] to-[#D9C5B2]/40">
            <span class="text-7xl">{{ instructor.icon }}</span>
          </div>

          <div class="mt-6">
            <div class="flex items-center justify-between">
              <h2 class="text-2xl font-bold">{{ instructor.name }}</h2>
              <span class="rounded-full bg-[#A8BBA3]/30 px-3 py-1 text-xs font-semibold">
                ⭐ {{ instructor.rating }}
              </span>
            </div>

            <p class="mt-2 text-sm font-semibold text-stone-500">
              {{ instructor.specialty }}
            </p>

            <p class="mt-4 text-sm leading-6 text-stone-600">
              {{ instructor.bio }}
            </p>

            <div class="mt-5 rounded-2xl bg-[#FAF7F2] p-4">
              <p class="text-sm text-stone-500">Signature Class</p>
              <p class="font-bold">{{ instructor.signatureClass }}</p>
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
    <MobileBottomNav />
  </main>
</template>

<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import MobileBottomNav from '../components/MobileBottomNav.vue'
import pilatesHeroImage from '../assets/images/people1.jpg'

const instructors = [
  {
    id: 1,
    name: 'Maya Collins',
    specialty: 'Beginner Flow & Breathwork',
    rating: '4.9',
    icon: '🌿',
    signatureClass: 'Slow Flow Pilates',
    bio: 'Maya focuses on calm, beginner-friendly sessions that help users build confidence, posture, and body awareness.',
  },
  {
    id: 2,
    name: 'Sofia Tan',
    specialty: 'Core Strength & Sculpt',
    rating: '4.8',
    icon: '🔥',
    signatureClass: 'Core Sculpt',
    bio: 'Sofia designs energetic classes for users who want to strengthen their core, improve control, and build endurance.',
  },
  {
    id: 3,
    name: 'Aina Rahman',
    specialty: 'Flexibility & Recovery',
    rating: '4.9',
    icon: '🧘🏻‍♀️',
    signatureClass: 'Flex & Restore',
    bio: 'Aina specialises in gentle movement, flexibility, and recovery-based Pilates for stress relief and mobility.',
  },
]
</script>