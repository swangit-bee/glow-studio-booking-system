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

          <div class="mt-8 flex flex-wrap gap-4 justify-center">
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

    <!-- About Us Section -->
    <section class="bg-[#FAF7F2] px-6 py-24">
      <div class="mx-auto max-w-7xl">
        <div class="grid items-center gap-16 lg:grid-cols-2">
          <!-- Left Content -->
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
                <h3 class="text-2xl font-bold">8</h3>
                <p class="text-sm text-stone-500">Expert Instructors</p>
              </div>
            </div>
          </div>

          <!-- Right Side Visual -->
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

    <!-- Meet Our Instructors -->
<section class="bg-white px-6 py-24">
  <div class="mx-auto max-w-7xl">
    <div class="mb-16 text-center">
      <h2 class="text-5xl font-bold uppercase tracking-wide text-stone-700">
        Meet Our Instructors
      </h2>
    </div>

    <div class="grid gap-10 md:grid-cols-3">
      <!-- Instructor 1 -->
      <div class="text-center">
        <div
          class="mx-auto flex h-[500px] items-center justify-center rounded-t-[180px] border-4 border-stone-500 bg-gradient-to-br from-stone-200 to-stone-100"
        >
          <span class="text-8xl">👩🏻</span>
        </div>

        <h3 class="mt-5 text-3xl font-bold text-stone-700">
          Ting Nee
        </h3>

        
      </div>

      <!-- Instructor 2 -->
      <div class="text-center">
        <div
          class="mx-auto flex h-[500px] items-center justify-center rounded-t-[180px] border-4 border-stone-500 bg-gradient-to-br from-stone-200 to-stone-100"
        >
          <span class="text-8xl">👩🏽</span>
        </div>

        <h3 class="mt-5 text-3xl font-bold text-stone-700">
          Maryam Evetovics
        </h3>

        
      </div>

      <!-- Instructor 3 -->
      <div class="text-center">
        <div
          class="mx-auto flex h-[500px] items-center justify-center rounded-t-[180px] border-4 border-stone-500 bg-gradient-to-br from-stone-200 to-stone-100"
        >
          <span class="text-8xl">👩🏻‍🦰</span>
        </div>

        <h3 class="mt-5 text-3xl font-bold text-stone-700">
          Jennifer Hiew
        </h3>

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
import pilatesHeroImage from '../assets/images/pilates 1.jpg'
import pilatesImage from '../assets/images/pilates 2.jpg'
</script>