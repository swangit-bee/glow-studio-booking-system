<template>
  <main class="min-h-screen bg-[#FAF7F2] p-6 text-stone-900">
    <Navbar />

    <section class="mx-auto max-w-7xl px-6 pt-32 pb-12">
      <div class="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p class="mb-3 inline-flex rounded-full bg-white px-4 py-2 text-sm font-medium text-stone-600 shadow-sm">
            Manage Classes
          </p>
          <h1 class="text-4xl font-bold">Class Management</h1>
          <p class="mt-2 text-stone-600">Add, edit, delete, and upload class images.</p>
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
          <img :src="form.image_url" alt="Class preview" class="h-56 w-full rounded-3xl object-cover" />
        </div>

        <textarea
          v-model="form.description"
          class="input mt-4"
          placeholder="Class description"
          rows="3"
        ></textarea>

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
            @click="saveClass"
            class="rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white disabled:opacity-50"
            :disabled="uploading"
          >
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

      <div v-if="loading" class="rounded-3xl bg-white p-10 text-center shadow-sm">
        Loading classes...
      </div>

      <div v-else class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="item in classes" :key="item.id" class="rounded-[2rem] bg-white p-6 shadow-sm">
          <div class="mb-5 flex h-48 items-center justify-center overflow-hidden rounded-[1.5rem] bg-[#FAF7F2]">
            <img
              v-if="item.image_url"
              :src="item.image_url"
              :alt="item.name"
              class="h-full w-full object-cover"
            />
            <span v-else class="text-6xl">✨</span>
          </div>

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
            <button
              @click="editClass(item)"
              class="flex-1 rounded-full bg-stone-900 py-3 text-sm font-semibold text-white"
            >
              Edit
            </button>

            <button
              @click="deleteClass(item.id)"
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

const CLOUDINARY_CLOUD_NAME = 'dhimhazp4'
const CLOUDINARY_UPLOAD_PRESET = 'glow_studio_upload'

const editingId = ref(null)
const classes = ref([])
const loading = ref(true)
const uploading = ref(false)
const message = ref('')
const errorMessage = ref('')

const form = ref({
  name: '',
  level: '',
  duration: '',
  price: '',
  slots: '',
  instructor: '',
  description: '',
  image_url: '',
})

const loadClasses = async () => {
  try {
    loading.value = true

    const response = await fetch('http://localhost:5000/api/classes')

    if (!response.ok) {
      throw new Error('Failed to load classes')
    }

    classes.value = await response.json()
  } catch (error) {
    console.error(error)
    errorMessage.value = 'Failed to load classes.'
  } finally {
    loading.value = false
  }
}

const handleImageUpload = async (event) => {
  const file = event.target.files[0]

  if (!file) return

  uploading.value = true
  errorMessage.value = ''
  message.value = ''

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

const saveClass = async () => {
  message.value = ''
  errorMessage.value = ''

  if (!form.value.name || !form.value.level || !form.value.duration) {
    errorMessage.value = 'Please complete class name, level, and duration.'
    return
  }

  try {
    const payload = {
      ...form.value,
      price: Number(form.value.price),
      slots: Number(form.value.slots),
    }

    let response

    if (editingId.value) {
      response = await fetch(`http://localhost:5000/api/classes/${editingId.value}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
    } else {
      response = await fetch('http://localhost:5000/api/classes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
    }

    if (!response.ok) {
      throw new Error('Failed to save class')
    }

    message.value = editingId.value ? 'Class updated successfully.' : 'Class added successfully.'

    await loadClasses()
    resetForm()
  } catch (error) {
    console.error(error)
    errorMessage.value = 'Failed to save class.'
  }
}

const editClass = (item) => {
  editingId.value = item.id

  form.value = {
    name: item.name,
    level: item.level,
    duration: item.duration,
    price: item.price,
    slots: item.slots,
    instructor: item.instructor,
    description: item.description,
    image_url: item.image_url || '',
  }

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const deleteClass = async (id) => {
  const confirmed = confirm('Delete this class?')

  if (!confirmed) return

  message.value = ''
  errorMessage.value = ''

  try {
    const response = await fetch(`http://localhost:5000/api/classes/${id}`, {
      method: 'DELETE',
    })

    if (!response.ok) {
      throw new Error('Failed to delete class')
    }

    message.value = 'Class deleted successfully.'
    await loadClasses()
  } catch (error) {
    console.error(error)
    errorMessage.value = 'Failed to delete class.'
  }
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
    image_url: '',
  }
}

onMounted(() => {
  loadClasses()
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