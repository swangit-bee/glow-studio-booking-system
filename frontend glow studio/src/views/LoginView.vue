<template>
  <main class="min-h-screen bg-[#FAF7F2] text-stone-900">
    <Navbar />

    <section class="mx-auto flex min-h-screen max-w-7xl items-center px-6 pt-28 pb-16">
      <div class="mx-auto grid w-full max-w-5xl overflow-hidden rounded-[2.5rem] bg-white shadow-2xl lg:grid-cols-2">
        <div class="hidden bg-stone-900 p-10 text-white lg:block">
          <p class="rounded-full bg-white/10 px-4 py-2 text-sm w-fit">Glow Member Access</p>

          <h1 class="mt-10 text-5xl font-bold leading-tight">
            Your wellness journey starts here.
          </h1>

          <p class="mt-6 text-stone-300">
            Login or create an account to manage bookings, view history, and track your Pilates progress.
          </p>

          <div class="mt-10 rounded-[2rem] bg-white/10 p-6">
            <p class="text-sm text-stone-300">Member benefit</p>
            <h2 class="mt-2 text-2xl font-bold">Track your glow streak ✨</h2>
          </div>
        </div>

        <div class="p-8 md:p-12">
          <div class="mb-8 flex rounded-full bg-[#FAF7F2] p-1">
            <button
              @click="isLogin = true"
              class="flex-1 rounded-full py-3 text-sm font-semibold"
              :class="isLogin ? 'bg-stone-900 text-white' : 'text-stone-600'"
            >
              Login
            </button>

            <button
              @click="isLogin = false"
              class="flex-1 rounded-full py-3 text-sm font-semibold"
              :class="!isLogin ? 'bg-stone-900 text-white' : 'text-stone-600'"
            >
              Register
            </button>
          </div>

          <h2 class="text-3xl font-bold">
            {{ isLogin ? 'Welcome back' : 'Create account' }}
          </h2>

          <p class="mt-2 text-stone-600">
            {{ isLogin ? 'Continue your Glow Studio journey.' : 'Join Glow Studio and start booking classes.' }}
          </p>

          <form @submit.prevent="submitForm" class="mt-8 space-y-4">
            <input
              v-if="!isLogin"
              v-model="form.name"
              type="text"
              placeholder="Full name"
              class="input-field"
            />

            <input
              v-model="form.email"
              type="email"
              placeholder="Email address"
              class="input-field"
            />

            <input
              v-model="form.password"
              type="password"
              placeholder="Password"
              class="input-field"
            />

            <p v-if="error" class="text-sm font-semibold text-red-600">
              {{ error }}
            </p>

            <button
              type="submit"
              class="w-full rounded-full bg-stone-900 py-4 text-sm font-semibold text-white transition hover:bg-stone-700"
            >
              {{ isLogin ? 'Login' : 'Create Account' }}
            </button>
          </form>

          <div v-if="success" class="mt-6 rounded-2xl bg-green-100 p-4 text-sm font-semibold text-green-700">
            {{ success }}
          </div>
        </div>
      </div>
    </section>

    <Footer />
  </main>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

const isLogin = ref(true)
const error = ref('')
const success = ref('')

const form = ref({
  name: '',
  email: '',
  password: '',
})

const submitForm = () => {
  error.value = ''
  success.value = ''

  if (!isLogin.value && !form.value.name) {
    error.value = 'Please enter your full name.'
    return
  }

  if (!form.value.email || !form.value.password) {
    error.value = 'Please enter your email and password.'
    return
  }

  success.value = isLogin.value
    ? 'Login successful. Redirecting to dashboard...'
    : 'Account created successfully.'
}
</script>

<style scoped>
.input-field {
  width: 100%;
  border-radius: 1rem;
  border: 1px solid #e7e5e4;
  background: #faf7f2;
  padding: 1rem 1.25rem;
  outline: none;
}

.input-field:focus {
  box-shadow: 0 0 0 2px #1c1917;
}
</style>