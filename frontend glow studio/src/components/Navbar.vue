<template>
  <nav class="fixed top-0 left-0 right-0 z-50 border-b border-white/40 bg-white/80 backdrop-blur-xl">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
      <RouterLink to="/" class="text-2xl font-bold tracking-tight text-stone-900">
        Glow Studio ✨
      </RouterLink>

      <div class="hidden items-center gap-8 md:flex">
        <RouterLink to="/" class="text-sm font-medium text-stone-600 transition hover:text-stone-950">Home</RouterLink>
        <RouterLink to="/classes" class="text-sm font-medium text-stone-600 transition hover:text-stone-950">Classes</RouterLink>
        <RouterLink to="/mood-quiz" class="text-sm font-medium text-stone-600 transition hover:text-stone-950">Mood Quiz</RouterLink>
        <RouterLink to="/instructors" class="text-sm font-medium text-stone-600 transition hover:text-stone-950">Instructors</RouterLink>
        <RouterLink to="/membership" class="text-sm font-medium text-stone-600 transition hover:text-stone-950">Membership</RouterLink>
      </div>

      <RouterLink
        to="/login"
        class="hidden rounded-full bg-stone-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-stone-700 md:block"
      >
        Login
      </RouterLink>
    </div>
  </nav>
</template>