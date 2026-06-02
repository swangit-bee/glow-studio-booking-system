<template>
  <main class="min-h-screen bg-[#FAF7F2] p-6 text-stone-900">
    <section class="mx-auto max-w-7xl">
      <div class="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p class="mb-3 inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-stone-600 shadow-sm">
            Admin / Manage Classes
          </p>
          <h1 class="text-4xl font-bold">Class Management</h1>
          <p class="mt-2 text-stone-600">Add, edit, and delete Pilates classes.</p>
        </div>

        <RouterLink to="/admin" class="rounded-full bg-white px-5 py-3 text-sm font-semibold shadow-sm">
          Back to Admin
        </RouterLink>
      </div>

      <div class="mb-8 rounded-[2rem] bg-white p-6 shadow-sm">
        <h2 class="text-2xl font-bold">{{ editingId ? 'Edit Class' : 'Add New Class' }}</h2>

        <div class="mt-5 grid gap-4 md:grid-cols-2">
          <input v-model="form.name" class="input" placeholder="Class name" />
          <input v-model="form.level" class="input" placeholder="Level" />
          <input v-model="form.duration" class="input" placeholder="Duration" />
          <input v-model="form.price" class="input" placeholder="Price" type="number" />
          <input v-model="form.slots" class="input" placeholder="Slots" type="number" />
          <input v-model="form.instructor" class="input" placeholder="Instructor" />
        </div>

        <textarea
          v-model="form.description"
          class="input mt-4"
          placeholder="Class description"
          rows="3"
        ></textarea>

        <div class="mt-5 flex gap-3">
          <button @click="saveClass" class="rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white">
            {{ editingId ? 'Update Class' : 'Add Class' }}
          </button>

          <button
            v-if="editingId"
            @click="resetForm"
            class="rounded-full bg-[#FAF7F2] px-6 py-3 text-sm font-semibold text-stone-700"
          >
            Cancel Edit
          </button>
        </div>
      </div>

      <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="item in classes" :key="item.id" class="rounded-[2rem] bg-white p-6 shadow-sm">
          <span class="rounded-full bg-[#A8BBA3]/30 px-3 py-1 text-xs font-semibold">
            {{ item.level }}
          </span>

          <h2 class="mt-4 text-2xl font-bold">{{ item.name }}</h2>
          <p class="mt-2 text-sm text-stone-600">{{ item.description }}</p>

          <div class="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div class="rounded-2xl bg-[#FAF7F2] p-3">
              <p class="text-stone-500">Duration</p>
              <p class="font-bold">{{ item.duration }}</p>
            </div>
            <div class="rounded-2xl bg-[#FAF7F2] p-3">
              <p class="text-stone-500">Price</p>
              <p class="font-bold">RM {{ item.price }}</p>
            </div>
            <div class="rounded-2xl bg-[#FAF7F2] p-3">
              <p class="text-stone-500">Slots</p>
              <p class="font-bold">{{ item.slots }}</p>
            </div>
            <div class="rounded-2xl bg-[#FAF7F2] p-3">
              <p class="text-stone-500">Instructor</p>
              <p class="font-bold">{{ item.instructor }}</p>
            </div>
          </div>

          <div class="mt-5 flex gap-3">
            <button @click="editClass(item)" class="flex-1 rounded-full bg-stone-900 py-3 text-sm font-semibold text-white">
              Edit
            </button>
            <button @click="deleteClass(item.id)" class="flex-1 rounded-full bg-red-100 py-3 text-sm font-semibold text-red-700">
              Delete
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'

const editingId = ref(null)

const form = ref({
  name: '',
  level: '',
  duration: '',
  price: '',
  slots: '',
  instructor: '',
  description: '',
})

const classes = ref([
  {
    id: 1,
    name: 'Slow Flow Pilates',
    level: 'Beginner',
    duration: '45 min',
    price: 38,
    slots: 4,
    instructor: 'Maya Collins',
    description: 'A calm beginner-friendly session focused on breathing and posture.',
  },
  {
    id: 2,
    name: 'Core Sculpt',
    level: 'Intermediate',
    duration: '50 min',
    price: 45,
    slots: 2,
    instructor: 'Sofia Tan',
    description: 'A powerful class designed to strengthen core muscles.',
  },
])

const saveClass = () => {
  if (!form.value.name || !form.value.level || !form.value.duration) return

  if (editingId.value) {
    const index = classes.value.findIndex((item) => item.id === editingId.value)
    classes.value[index] = { id: editingId.value, ...form.value }
  } else {
    classes.value.push({
      id: Date.now(),
      ...form.value,
    })
  }

  resetForm()
}

const editClass = (item) => {
  editingId.value = item.id
  form.value = { ...item }
}

const deleteClass = (id) => {
  classes.value = classes.value.filter((item) => item.id !== id)
}

const resetForm = () => {
  editingId.value = null
  form.value = {
    name: '',
    level: '',
    duration: '',
    price: '',
    slots: '',
    instructor: '',
    description: '',
  }
}
</script>

<style scoped>
.input {
  width: 100%;
  border-radius: 1rem;
  border: 1px solid #e7e5e4;
  background: #faf7f2;
  padding: 1rem 1.25rem;
  outline: none;
}

.input:focus {
  box-shadow: 0 0 0 2px #1c1917;
}
</style>