import {
  Home,
  ShieldCheck,
  Users,
  FileText,
  BarChart3,
  type LucideIcon,
} from "lucide-react"
import { lazy } from "react"

export interface SubMenuItem {
  title: string
  url: string
  icon: LucideIcon
}

export interface MenuItem {
  title: string
  url: string
  icon: LucideIcon
  badge?: string
  items?: SubMenuItem[]
}

export const getMenuConfig = (role?: string): MenuItem[] => {
  const baseMenu: MenuItem[] = [
    {
      title: "Home",
      url: "/home",
      icon: Home
    },
  ]

  if (role === 'admin') {
    baseMenu.push({
      title: "Admin",
      url: "/admin/students",
      icon: ShieldCheck,
      items: [
        {
          title: "Student",
          url: "/admin/students",
          icon: Users,
        },
        {
          title: "Report",
          url: "/admin/reports",
          icon: FileText,
        },
        {
          title: "Charts",
          url: "/admin/charts",
          icon: BarChart3,
        },
      ],
    })
  }

  return baseMenu
}

export const menuConfig: MenuItem[] = getMenuConfig()

// Routes configuration (public and protected)
export const getRoutes = () => {
  return [
    // ============ PUBLIC ROUTES ============
    {
      path: "/",
      name: "Login",
      component: lazy(() => import("@/pages/Login")),
      exact: true,
      protected: false,
    },
    {
      path: "/create",
      name: "CreateAccount",
      component: lazy(() => import("@/pages/CreateAccount")),
      exact: true,
      protected: false,
    },

    // ============ PROTECTED ROUTES ============
    {
      path: "/home",
      name: "Home",
      component: lazy(() => import("@/pages/Home/HomeModule")),
      exact: true,
      protected: true,
    },
    {
      path: "/home/:stepSlug",
      name: "HomeStep",
      component: lazy(() => import("@/pages/Home/HomeModule")),
      exact: true,
      protected: true,
    },

    // ============ ADMIN PROTECTED ROUTES ============
    {
      path: "/admin/students",
      name: "AdminStudents",
      component: lazy(() => import("@/pages/Admin/AdminStudents").then(m => ({ default: m.AdminStudents }))),
      exact: true,
      protected: true,
    },
    {
      path: "/admin/reports",
      name: "AdminReports",
      component: lazy(() => import("@/pages/Admin/AdminReports").then(m => ({ default: m.AdminReports }))),
      exact: true,
      protected: true,
    },
    {
      path: "/admin/charts",
      name: "AdminCharts",
      component: lazy(() => import("@/pages/Admin/AdminCharts").then(m => ({ default: m.AdminCharts }))),
      exact: true,
      protected: true,
    },
  ]
}