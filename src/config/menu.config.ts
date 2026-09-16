import {
  Home,
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

export const menuConfig: MenuItem[] = [
  {
    title: "Home",
    url: "/home",
    icon: Home
  },
]

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
  ]
}