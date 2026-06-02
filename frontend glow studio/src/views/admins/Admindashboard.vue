<template>
  <main class="min-h-screen bg-[#FAF7F2] text-stone-900">
    <section class="mx-auto max-w-7xl px-6 py-12">
      <div class="mb-10">
        <p class="mb-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-stone-600 shadow-sm">
          Admin Dashboard
        </p>

        <h1 class="text-5xl font-bold tracking-tight">
          Glow Studio Analytics
        </h1>

        <p class="mt-4 text-stone-600">
          Monitor classes, bookings, instructors, and members.
        </p>
      </div>

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
          </div>
        </div>

        <div class="rounded-[2rem] bg-white p-8 shadow-sm">
          <h2 class="text-2xl font-bold">Quick Actions</h2>

          <div class="mt-6 grid gap-4">
            <RouterLink
              to="/admin/classes"
              class="rounded-2xl bg-stone-900 px-5 py-4 text-center text-white font-semibold"
            >
              Manage Classes
            </RouterLink>

            <RouterLink
              to="/admin/instructors"
              class="rounded-2xl bg-stone-900 px-5 py-4 text-center text-white font-semibold"
            >
              Manage Instructors
            </RouterLink>

            <RouterLink
              to="/admin/bookings"
              class="rounded-2xl bg-stone-900 px-5 py-4 text-center text-white font-semibold"
            >
              Manage Bookings
            </RouterLink>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
const cards = [
  { title: 'Total Members', value: '128', icon: '👤' },
  { title: 'Bookings', value: '342', icon: '📅' },
  { title: 'Classes', value: '18', icon: '🧘‍♀️' },
  { title: 'Instructors', value: '6', icon: '⭐' },
]

const popularClasses = [
  {
    name: 'Slow Flow Pilates',
    bookings: 89,
  },
  {
    name: 'Core Sculpt',
    bookings: 77,
  },
  {
    name: 'Flex & Restore',
    bookings: 65,
  },
]
</script>