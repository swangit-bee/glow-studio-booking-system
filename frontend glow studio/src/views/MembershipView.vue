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

      <div class="relative z-10 mx-auto max-w-3xl text-center">
        <p class="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-stone-600 shadow-sm">
          Membership Plans
        </p>

        <h1 class="text-5xl font-bold tracking-tight">
          Choose your glow plan
        </h1>

        <p class="mt-4 text-stone-600">
          Flexible Pilates memberships designed for students, beginners, and regular wellness lovers.
        </p>
      </div>
    </section>

    <section class="mx-auto max-w-7xl px-6 pt-32 pb-20">
      <div
        v-if="selectedPlan"
        class="mb-8 rounded-[2rem] bg-green-100 p-5 text-sm font-semibold text-green-800"
      >
        You selected {{ selectedPlan.name }}. Your membership has been saved to your dashboard.
      </div>

      <div
        v-if="!currentUser"
        class="mb-8 rounded-[2rem] bg-white p-6 text-center shadow-sm"
      >
        <h2 class="text-2xl font-bold">Login to activate a membership</h2>
        <p class="mt-2 text-stone-600">
          You can browse plans now, but you need to login or register before selecting a plan.
        </p>
      </div>

      <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="plan in plans"
          :key="plan.id"
          class="relative rounded-[2rem] bg-white p-6 shadow-sm transition hover:-translate-y-2 hover:shadow-2xl"
          :class="[
            plan.popular ? 'ring-2 ring-stone-900' : '',
            selectedPlan?.id === plan.id ? 'bg-[#F5EFE6]' : '',
          ]"
        >
          <span
            v-if="plan.popular"
            class="absolute right-5 top-5 rounded-full bg-stone-900 px-3 py-1 text-xs font-semibold text-white"
          >
            Most Popular
          </span>

          <div class="text-5xl">{{ plan.icon }}</div>

          <h2 class="mt-6 text-2xl font-bold">{{ plan.name }}</h2>

          <p class="mt-2 text-sm text-stone-500">{{ plan.description }}</p>

          <p class="mt-6 text-4xl font-bold">
            RM {{ plan.price }}
            <span class="text-sm font-medium text-stone-500">{{ plan.period }}</span>
          </p>

          <ul class="mt-6 space-y-3 text-sm text-stone-600">
            <li v-for="benefit in plan.benefits" :key="benefit">
              ✨ {{ benefit }}
            </li>
          </ul>

          <button
            @click="selectPlan(plan)"
            class="mt-8 w-full rounded-full bg-stone-900 py-3 text-center text-sm font-semibold text-white transition hover:bg-stone-700"
          >
            {{ selectedPlan?.id === plan.id ? 'Selected' : 'Select Plan' }}
          </button>
        </div>
      </div>
    </section>

    <Footer />
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import pilatesHeroImage from '../assets/images/member1.jpg'

const router = useRouter()

const currentUser = ref(null)
const selectedPlan = ref(null)

const plans = [
  {
    id: 1,
    name: 'Drop-In Glow',
    price: 38,
    period: '/ class',
    icon: '🌿',
    popular: false,
    description: 'Perfect for trying out one Pilates session.',
    benefits: ['Single class access', 'Beginner friendly', 'Flexible booking'],
  },
  {
    id: 2,
    name: 'Student Flow',
    price: 120,
    period: '/ month',
    icon: '🎓',
    popular: true,
    description: 'Affordable plan for students who want consistent movement.',
    benefits: ['4 classes per month', 'Student-friendly pricing', 'Booking history'],
  },
  {
    id: 3,
    name: 'Monthly Sculpt',
    price: 180,
    period: '/ month',
    icon: '🔥',
    popular: false,
    description: 'For users building strength and routine.',
    benefits: ['8 classes per month', 'Priority slots', 'Progress tracking'],
  },
  {
    id: 4,
    name: 'Unlimited Lumé',
    price: 280,
    period: '/ month',
    icon: '✨',
    popular: false,
    description: 'Full access for regular wellness lovers.',
    benefits: ['Unlimited classes', 'Premium booking access', 'Instructor preference'],
  },
]

const selectPlan = (plan) => {
  if (!currentUser.value) {
    router.push('/login')
    return
  }

  selectedPlan.value = plan

  localStorage.setItem(
    'glowMembership',
    JSON.stringify({
      userEmail: currentUser.value.email,
      planName: plan.name,
      price: plan.price,
      period: plan.period,
    }),
  )

  setTimeout(() => {
    router.push('/dashboard')
  }, 800)
}

onMounted(() => {
  currentUser.value = JSON.parse(localStorage.getItem('glowUser'))

  const savedMembership = JSON.parse(localStorage.getItem('glowMembership'))

  if (savedMembership && currentUser.value && savedMembership.userEmail === currentUser.value.email) {
    selectedPlan.value = plans.find((plan) => plan.name === savedMembership.planName)
  }
})
</script>