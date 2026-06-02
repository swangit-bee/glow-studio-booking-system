import { createRouter, createWebHistory } from 'vue-router'

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
    { path: '/dashboard', component: DashboardView },
    { path: '/booking-history', component: BookingHistoryView },

    { path: '/admin', component: AdminDashboard },
    { path: '/admin/classes', component: ManageClasses },
    { path: '/admin/instructors', component: ManageInstructors },
    { path: '/admin/bookings', component: ManageBookings },
  ],
})

export default router