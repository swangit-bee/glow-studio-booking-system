<template>
  <nav class="fixed left-0 right-0 top-0 z-50 border-b border-white/40 bg-white/80 backdrop-blur-xl">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
      <RouterLink to="/" class="text-2xl font-bold tracking-tight text-stone-900">
        Glow Studio ✨
      </RouterLink>

      <div class="hidden items-center gap-8 md:flex">
        <template v-if="!currentUser">
          <RouterLink to="/" class="nav-link">Home</RouterLink>
          <RouterLink to="/classes" class="nav-link">Classes</RouterLink>
          <RouterLink to="/mood-quiz" class="nav-link">Mood Quiz</RouterLink>
          <RouterLink to="/instructors" class="nav-link">Instructors</RouterLink>
          <RouterLink to="/membership" class="nav-link">Membership</RouterLink>
        </template>

        <template v-else-if="currentUser.role === 'member'">
          <RouterLink to="/" class="nav-link">Home</RouterLink>
          <RouterLink to="/classes" class="nav-link">Classes</RouterLink>
          <RouterLink to="/booking-history" class="nav-link">History</RouterLink>
          <RouterLink to="/dashboard" class="nav-link">Dashboard</RouterLink>
        </template>

        <template v-else-if="currentUser.role === 'admin'">
          <RouterLink to="/admin" class="nav-link">Admin Dashboard</RouterLink>
          <RouterLink to="/admin/classes" class="nav-link">Classes</RouterLink>
          <RouterLink to="/admin/instructors" class="nav-link">Instructors</RouterLink>
          <RouterLink to="/admin/bookings" class="nav-link">Bookings</RouterLink>
        </template>
      </div>

      <div class="hidden items-center gap-3 md:flex">
        <RouterLink
          v-if="!currentUser"
          to="/login"
          class="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-700"
        >
          Login
        </RouterLink>

        <button
          v-else
          @click="logout"
          class="rounded-full bg-red-100 px-5 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-200"
        >
          Logout
        </button>
      </div>

      <button
        @click="menuOpen = !menuOpen"
        class="rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white md:hidden"
      >
        Menu
      </button>
    </div>

    <div v-if="menuOpen" class="border-t border-stone-200 bg-white px-6 py-5 md:hidden">
      <div class="grid gap-4">
        <template v-if="!currentUser">
          <RouterLink @click="closeMenu" to="/" class="mobile-link">Home</RouterLink>
          <RouterLink @click="closeMenu" to="/classes" class="mobile-link">Classes</RouterLink>
          <RouterLink @click="closeMenu" to="/mood-quiz" class="mobile-link">Mood Quiz</RouterLink>
          <RouterLink @click="closeMenu" to="/instructors" class="mobile-link">Instructors</RouterLink>
          <RouterLink @click="closeMenu" to="/membership" class="mobile-link">Membership</RouterLink>

          <RouterLink
            @click="closeMenu"
            to="/login"
            class="rounded-full bg-stone-900 px-5 py-3 text-center text-sm font-semibold text-white"
          >
            Login
          </RouterLink>
        </template>

        <template v-else-if="currentUser.role === 'member'">
          <RouterLink @click="closeMenu" to="/" class="mobile-link">Home</RouterLink>
          <RouterLink @click="closeMenu" to="/classes" class="mobile-link">Classes</RouterLink>
          <RouterLink @click="closeMenu" to="/booking-history" class="mobile-link">History</RouterLink>
          <RouterLink @click="closeMenu" to="/dashboard" class="mobile-link">Dashboard</RouterLink>

          <button
            @click="logout"
            class="rounded-full bg-red-100 px-5 py-3 text-sm font-semibold text-red-700"
          >
            Logout
          </button>
        </template>

        <template v-else-if="currentUser.role === 'admin'">
          <RouterLink @click="closeMenu" to="/admin" class="mobile-link">Admin Dashboard</RouterLink>
          <RouterLink @click="closeMenu" to="/admin/classes" class="mobile-link">Manage Classes</RouterLink>
          <RouterLink @click="closeMenu" to="/admin/instructors" class="mobile-link">Manage Instructors</RouterLink>
          <RouterLink @click="closeMenu" to="/admin/bookings" class="mobile-link">Manage Bookings</RouterLink>

          <button
            @click="logout"
            class="rounded-full bg-red-100 px-5 py-3 text-sm font-semibold text-red-700"
          >
            Logout
          </button>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabase'

const router = useRouter()
const menuOpen = ref(false)
const currentUser = ref(null)

const setUserFromSupabase = (user) => {
  if (!user) {
    const savedUser = JSON.parse(localStorage.getItem('glowUser'))

    if (savedUser?.role === 'admin') {
      currentUser.value = savedUser
      return
    }

    currentUser.value = null
    localStorage.removeItem('glowUser')
    return
  }

  const glowUser = {
    id: user.id,
    name: user.user_metadata?.full_name || user.email.split('@')[0],
    email: user.email,
    role: user.email === 'admin@glowstudio.com' ? 'admin' : 'member',
  }

  currentUser.value = glowUser
  localStorage.setItem('glowUser', JSON.stringify(glowUser))
}

const loadUser = async () => {
  const savedUser = JSON.parse(localStorage.getItem('glowUser'))

  if (savedUser?.role === 'admin') {
    currentUser.value = savedUser
    return
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  setUserFromSupabase(user)
}

const closeMenu = () => {
  menuOpen.value = false
}

const logout = async () => {
  const savedUser = JSON.parse(localStorage.getItem('glowUser'))

  if (savedUser?.role !== 'admin') {
    await supabase.auth.signOut()
  }

  localStorage.removeItem('glowUser')
  currentUser.value = null
  menuOpen.value = false

  router.push('/')
}

onMounted(() => {
  loadUser()

  supabase.auth.onAuthStateChange((_event, session) => {
    const savedUser = JSON.parse(localStorage.getItem('glowUser'))

    if (savedUser?.role === 'admin') {
      currentUser.value = savedUser
      return
    }

    setUserFromSupabase(session?.user || null)
  })
})
</script>

<style scoped>
.nav-link {
  font-size: 0.875rem;
  font-weight: 500;
  color: #57534e;
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: #0c0a09;
}

.mobile-link {
  border-radius: 1rem;
  background: #faf7f2;
  padding: 0.9rem 1rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #44403c;
}
</style>