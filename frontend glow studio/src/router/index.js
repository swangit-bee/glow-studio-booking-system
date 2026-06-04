import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../lib/supabase'

import HomeView from '../views/HomeView.vue'
import ClassesView from '../views/ClassesView.vue'
import ClassDetailsView from '../views/ClassDetailsView.vue'
import BookingView from '../views/BookingView.vue'
import MoodQuizView from '../views/MoodQuizView.vue'
import InstructorsView from '../views/InstructorsView.vue'
import MembershipView from '../views/MembershipView.vue'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import BookingHistoryView from '../views/BookingHistoryView.vue'

import AdminDashboard from '../views/admins/Admindashboard.vue'
import ManageClasses from '../views/admins/Manageclasses.vue'
import ManageInstructors from '../views/admins/Manageinstructors.vue'
import ManageBookings from '../views/admins/Managebooking.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: HomeView },
    { path: '/classes', component: ClassesView },
    { path: '/class/:id', component: ClassDetailsView },
    { path: '/booking', component: BookingView },
    { path: '/mood-quiz', component: MoodQuizView },
    { path: '/instructors', component: InstructorsView },
    { path: '/membership', component: MembershipView },
    { path: '/login', component: LoginView },

    {
      path: '/dashboard',
      component: DashboardView,
      meta: { requiresAuth: true },
    },

    {
      path: '/booking-history',
      component: BookingHistoryView,
      meta: { requiresAuth: true },
    },

    {
      path: '/admin',
      component: AdminDashboard,
      meta: { requiresAdmin: true },
    },

    {
      path: '/admin/classes',
      component: ManageClasses,
      meta: { requiresAdmin: true },
    },

    {
      path: '/admin/instructors',
      component: ManageInstructors,
      meta: { requiresAdmin: true },
    },

    {
      path: '/admin/bookings',
      component: ManageBookings,
      meta: { requiresAdmin: true },
    },
  ],
})

router.beforeEach(async (to) => {
  const savedUser = JSON.parse(localStorage.getItem('glowUser'))

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (to.meta.requiresAuth) {
    if (!user && savedUser?.role !== 'admin') {
      return '/login'
    }
  }

  if (to.meta.requiresAdmin) {
    if (savedUser?.role !== 'admin') {
      return '/'
    }
  }

  return true
})

export default router