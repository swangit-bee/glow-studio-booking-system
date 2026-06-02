<template>
  <main class="min-h-screen bg-[#FAF7F2] p-6 text-stone-900">
    <section class="mx-auto max-w-7xl">
      <div class="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p class="mb-3 inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-stone-600 shadow-sm">
            Admin / Manage Instructors
          </p>
          <h1 class="text-4xl font-bold">Instructor Management</h1>
          <p class="mt-2 text-stone-600">Add, edit, and delete Pilates instructors.</p>
        </div>

        <RouterLink to="/admin" class="rounded-full bg-white px-5 py-3 text-sm font-semibold shadow-sm">
          Back to Admin
        </RouterLink>
      </div>

      <div class="mb-8 rounded-[2rem] bg-white p-6 shadow-sm">
        <h2 class="text-2xl font-bold">{{ editingId ? 'Edit Instructor' : 'Add New Instructor' }}</h2>

        <div class="mt-5 grid gap-4 md:grid-cols-2">
          <input v-model="form.name" class="input" placeholder="Instructor name" />
          <input v-model="form.specialty" class="input" placeholder="Specialty" />
          <input v-model="form.experience" class="input" placeholder="Experience" />
          <input v-model="form.rating" class="input" placeholder="Rating" />
          <input v-model="form.signatureClass" class="input md:col-span-2" placeholder="Signature class" />
        </div>

        <textarea v-model="form.bio" class="input mt-4" placeholder="Instructor bio" rows="3"></textarea>

        <div class="mt-5 flex gap-3">
          <button @click="saveInstructor" class="rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white">
            {{ editingId ? 'Update Instructor' : 'Add Instructor' }}
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
        <div v-for="instructor in instructors" :key="instructor.id" class="rounded-[2rem] bg-white p-6 shadow-sm">
          <div class="flex h-32 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-[#F5EFE6] to-[#D9C5B2]/40">
            <span class="text-6xl">🧘🏻‍♀️</span>
          </div>

          <h2 class="mt-5 text-2xl font-bold">{{ instructor.name }}</h2>
          <p class="mt-1 text-sm font-semibold text-stone-500">{{ instructor.specialty }}</p>
          <p class="mt-3 text-sm text-stone-600">{{ instructor.bio }}</p>

          <div class="mt-4 space-y-2 rounded-2xl bg-[#FAF7F2] p-4 text-sm">
            <p><strong>Experience:</strong> {{ instructor.experience }}</p>
            <p><strong>Rating:</strong> ⭐ {{ instructor.rating }}</p>
            <p><strong>Signature:</strong> {{ instructor.signatureClass }}</p>
          </div>

          <div class="mt-5 flex gap-3">
            <button @click="editInstructor(instructor)" class="flex-1 rounded-full bg-stone-900 py-3 text-sm font-semibold text-white">
              Edit
            </button>

            <button @click="deleteInstructor(instructor.id)" class="flex-1 rounded-full bg-red-100 py-3 text-sm font-semibold text-red-700">
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
  specialty: '',
  experience: '',
  rating: '',
  signatureClass: '',
  bio: '',
})

const instructors = ref([
  {
    id: 1,
    name: 'Maya Collins',
    specialty: 'Beginner Flow & Breathwork',
    experience: '5 years',
    rating: '4.9',
    signatureClass: 'Slow Flow Pilates',
    bio: 'Maya focuses on calm beginner-friendly sessions that build confidence and posture.',
  },
  {
    id: 2,
    name: 'Sofia Tan',
    specialty: 'Core Strength & Sculpt',
    experience: '6 years',
    rating: '4.8',
    signatureClass: 'Core Sculpt',
    bio: 'Sofia creates energetic classes for users who want strength, control, and endurance.',
  },
])

const saveInstructor = () => {
  if (!form.value.name || !form.value.specialty) return

  if (editingId.value) {
    const index = instructors.value.findIndex((item) => item.id === editingId.value)
    instructors.value[index] = { id: editingId.value, ...form.value }
  } else {
    instructors.value.push({
      id: Date.now(),
      ...form.value,
    })
  }

  resetForm()
}

const editInstructor = (instructor) => {
  editingId.value = instructor.id
  form.value = { ...instructor }
}

const deleteInstructor = (id) => {
  instructors.value = instructors.value.filter((item) => item.id !== id)
}

const resetForm = () => {
  editingId.value = null
  form.value = {
    name: '',
    specialty: '',
    experience: '',
    rating: '',
    signatureClass: '',
    bio: '',
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