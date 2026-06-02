<template>
  <nav class="fixed bottom-4 left-4 right-4 z-50 rounded-full bg-stone-900 px-4 py-3 shadow-2xl md:hidden">
    <div class="flex items-center justify-around text-xs font-semibold text-white">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/classes">Explore</RouterLink>
      <RouterLink to="/mood-quiz">Quiz</RouterLink>
      <RouterLink to="/booking-history">History</RouterLink>
      <RouterLink to="/dashboard">Profile</RouterLink>
    </div>
  </nav>
</template>