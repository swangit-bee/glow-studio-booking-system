<template>
  <main class="min-h-screen bg-[#FAF7F2] p-6 text-stone-900">
    <Navbar />

    <section class="mx-auto max-w-7xl px-6 pt-32 pb-12">
      <div class="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p class="mb-3 inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-stone-600 shadow-sm">
            Manage Instructors
          </p>
          <h1 class="text-4xl font-bold">Instructor Management</h1>
          <p class="mt-2 text-stone-600">Add, edit, delete, and upload instructor images.</p>
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
          <input v-model="form.rating" class="input" placeholder="Rating" type="number" step="0.1" />
          <input v-model="form.signature_class" class="input md:col-span-2" placeholder="Signature class" />

          <input
            v-model="form.image_url"
            class="input md:col-span-2"
            placeholder="Image URL will appear here after upload"
          />

          <input
            type="file"
            accept="image/*"
            @change="handleImageUpload"
            class="input md:col-span-2"
          />
        </div>

        <div v-if="form.image_url" class="mt-5">
          <p class="mb-2 text-sm font-semibold text-stone-600">Image Preview</p>
          <img :src="form.image_url" alt="Instructor preview" class="h-56 w-full rounded-3xl object-cover" />
        </div>

        <textarea v-model="form.bio" class="input mt-4" placeholder="Instructor bio" rows="3"></textarea>

        <p v-if="uploading" class="mt-4 text-sm font-semibold text-blue-700">
          Uploading image...
        </p>

        <p v-if="message" class="mt-4 text-sm font-semibold text-green-700">
          {{ message }}
        </p>

        <p v-if="errorMessage" class="mt-4 text-sm font-semibold text-red-700">
          {{ errorMessage }}
        </p>

        <div class="mt-5 flex gap-3">
          <button
            @click="saveInstructor"
            class="rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white disabled:opacity-50"
            :disabled="uploading"
          >
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

      <div v-if="loading" class="rounded-3xl bg-white p-10 text-center shadow-sm">
        Loading instructors...
      </div>

      <div v-else class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="instructor in instructors" :key="instructor.id" class="rounded-[2rem] bg-white p-6 shadow-sm">
          <div class="flex justify-center">
  <img
    v-if="instructor.image_url"
    :src="instructor.image_url"
    :alt="instructor.name"
    class="h-40 w-40 rounded-full object-cover shadow-lg"
  />
  <span v-else class="text-6xl">🧘🏻‍♀️</span>
</div>

          <h2 class="mt-5 text-2xl font-bold">{{ instructor.name }}</h2>
          <p class="mt-1 text-sm font-semibold text-stone-500">{{ instructor.specialty }}</p>
          <p class="mt-3 text-sm text-stone-600">{{ instructor.bio }}</p>

          <div class="mt-4 space-y-2 rounded-2xl bg-[#FAF7F2] p-4 text-sm">
            <p><strong>Experience:</strong> {{ instructor.experience }}</p>
            <p><strong>Rating:</strong> ⭐ {{ instructor.rating }}</p>
            <p><strong>Signature:</strong> {{ instructor.signature_class }}</p>
          </div>

          <div class="mt-5 flex gap-3">
            <button
              @click="editInstructor(instructor)"
              class="flex-1 rounded-full bg-stone-900 py-3 text-sm font-semibold text-white"
            >
              Edit
            </button>

            <button
              @click="deleteInstructor(instructor.id)"
              class="flex-1 rounded-full bg-red-100 py-3 text-sm font-semibold text-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Navbar from '../../components/Navbar.vue'

const API_URL = import.meta.env.VITE_API_URL

const CLOUDINARY_CLOUD_NAME = 'dhimhazp4'
const CLOUDINARY_UPLOAD_PRESET = 'glow_studio_upload'

const editingId = ref(null)
const instructors = ref([])
const loading = ref(true)
const uploading = ref(false)
const message = ref('')
const errorMessage = ref('')

const form = ref({
  name: '',
  specialty: '',
  experience: '',
  rating: '',
  signature_class: '',
  bio: '',
  image_url: '',
})

const loadInstructors = async () => {
  try {
    loading.value = true

    const response = await fetch(`${API_URL}/api/instructors`)

    if (!response.ok) {
      throw new Error('Failed to load instructors')
    }

    instructors.value = await response.json()
  } catch (error) {
    console.error(error)
    errorMessage.value = 'Failed to load instructors.'
  } finally {
    loading.value = false
  }
}

const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  uploading.value = true
  message.value = ''
  errorMessage.value = ''

  try {
    const imageFormData = new FormData()
    imageFormData.append('file', file)
    imageFormData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET)

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: imageFormData,
      },
    )

    if (!response.ok) {
      throw new Error('Cloudinary upload failed')
    }

    const data = await response.json()
    form.value.image_url = data.secure_url
    message.value = 'Image uploaded successfully.'
  } catch (error) {
    console.error(error)
    errorMessage.value = 'Failed to upload image.'
  } finally {
    uploading.value = false
  }
}

const saveInstructor = async () => {
  message.value = ''
  errorMessage.value = ''

  if (!form.value.name || !form.value.specialty) {
    errorMessage.value = 'Please complete instructor name and specialty.'
    return
  }

  try {
    const payload = {
      ...form.value,
      rating: Number(form.value.rating),
    }

    let response

    if (editingId.value) {
      response = await fetch(`${API_URL}/api/instructors/${editingId.value}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
    } else {
      response = await fetch(`${API_URL}/api/instructors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
    }

    if (!response.ok) {
      throw new Error('Failed to save instructor')
    }

    message.value = editingId.value
      ? 'Instructor updated successfully.'
      : 'Instructor added successfully.'

    await loadInstructors()
    resetForm()
  } catch (error) {
    console.error(error)
    errorMessage.value = 'Failed to save instructor.'
  }
}

const editInstructor = (instructor) => {
  editingId.value = instructor.id

  form.value = {
    name: instructor.name,
    specialty: instructor.specialty,
    experience: instructor.experience,
    rating: instructor.rating,
    signature_class: instructor.signature_class,
    bio: instructor.bio,
    image_url: instructor.image_url || '',
  }

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const deleteInstructor = async (id) => {
  const confirmed = confirm('Delete this instructor?')
  if (!confirmed) return

  message.value = ''
  errorMessage.value = ''

  try {
    const response = await fetch(`${API_URL}/api/instructors/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Failed to delete instructor')
    }

    message.value = 'Instructor deleted successfully.'
    await loadInstructors()
  } catch (error) {
    console.error(error)
    errorMessage.value = 'Failed to delete instructor.'
  }
}

const resetForm = () => {
  editingId.value = null

  form.value = {
    name: '',
    specialty: '',
    experience: '',
    rating: '',
    signature_class: '',
    bio: '',
    image_url: '',
  }
}

onMounted(() => {
  loadInstructors()
})
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