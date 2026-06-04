<template>
  <main class="min-h-screen bg-[#FAF7F2] p-6 text-stone-900">
    <Navbar />

    <section class="mx-auto max-w-7xl px-6 pt-32 pb-12">
      <div class="mb-10">
        <p class="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-stone-600 shadow-sm">
          Admin Dashboard
        </p>

        <h1 class="text-5xl font-bold tracking-tight">
          Glow Studio Analytics
        </h1>

        <p class="mt-4 text-stone-600">
          Monitor live classes and booking activities from the database.
        </p>
      </div>

      <div v-if="loading" class="rounded-3xl bg-white p-10 text-center shadow-sm">
        Loading dashboard...
      </div>

      <template v-else>
        <div class="grid gap-6 md:grid-cols-4">
          <div
            v-for="card in cards"
            :key="card.title"
            class="rounded-[2rem] bg-white p-6 shadow-sm"
          >
            <div class="text-4xl">{{ card.icon }}</div>
            <p class="mt-4 text-sm text-stone-500">{{ card.title }}</p>
            <h2 class="mt-2 text-3xl font-bold">{{ card.value }}</h2>
          </div>
        </div>

        <div class="mt-10 grid gap-8 lg:grid-cols-2">
          <div class="rounded-[2rem] bg-white p-8 shadow-sm">
            <h2 class="text-2xl font-bold">Popular Classes</h2>

            <div class="mt-6 space-y-4">
              <div
                v-for="item in popularClasses"
                :key="item.name"
                class="rounded-2xl bg-[#FAF7F2] p-4"
              >
                <div class="flex items-center justify-between">
                  <h3 class="font-bold">{{ item.name }}</h3>
                  <span class="text-sm text-stone-500">
                    {{ item.bookings }} bookings
                  </span>
                </div>
              </div>

              <p v-if="popularClasses.length === 0" class="text-stone-500">
                No booking data yet.
              </p>
            </div>
          </div>

          <div class="rounded-[2rem] bg-white p-8 shadow-sm">
            <h2 class="text-2xl font-bold">Quick Actions</h2>

            <div class="mt-6 grid gap-4">
              <RouterLink
                to="/admin/classes"
                class="rounded-2xl bg-stone-900 px-5 py-4 text-center font-semibold text-white"
              >
                Manage Classes
              </RouterLink>

              <RouterLink
                to="/admin/instructors"
                class="rounded-2xl bg-stone-900 px-5 py-4 text-center font-semibold text-white"
              >
                Manage Instructors
              </RouterLink>

              <RouterLink
                to="/admin/bookings"
                class="rounded-2xl bg-stone-900 px-5 py-4 text-center font-semibold text-white"
              >
                Manage Bookings
              </RouterLink>
            </div>
          </div>
        </div>
      </template>
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import Navbar from '../../components/Navbar.vue'

const classes = ref([])
const bookings = ref([])
const loading = ref(true)

const loadDashboardData = async () => {
  try {
    const [classesResponse, bookingsResponse] = await Promise.all([
      fetch('http://localhost:5000/api/classes'),
      fetch('http://localhost:5000/api/bookings'),
    ])

    classes.value = await classesResponse.json()
    bookings.value = await bookingsResponse.json()
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const cards = computed(() => {
  const upcoming = bookings.value.filter((booking) => booking.status === 'Upcoming').length
  const completed = bookings.value.filter((booking) => booking.status === 'Completed').length
  const cancelled = bookings.value.filter((booking) => booking.status === 'Cancelled').length

  return [
    { title: 'Total Classes', value: classes.value.length, icon: '🧘‍♀️' },
    { title: 'Total Bookings', value: bookings.value.length, icon: '📅' },
    { title: 'Upcoming', value: upcoming, icon: '🔵' },
    { title: 'Completed', value: completed + cancelled, icon: '✅' },
  ]
})

const popularClasses = computed(() => {
  const countMap = {}

  bookings.value.forEach((booking) => {
    const className = booking.class_name

    if (!className) return

    countMap[className] = (countMap[className] || 0) + 1
  })

  return Object.entries(countMap)
    .map(([name, bookingCount]) => ({
      name,
      bookings: bookingCount,
    }))
    .sort((a, b) => b.bookings - a.bookings)
    .slice(0, 5)
})

onMounted(() => {
  loadDashboardData()
})
</script>