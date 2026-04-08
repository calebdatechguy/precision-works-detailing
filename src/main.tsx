import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createRouter, createRoute, createRootRoute, RouterProvider } from '@tanstack/react-router'
import './index.css'
import { Root } from './routes/__root'
import { PrecisionHomePage } from './routes/precision-home'
import { ShowcasePage } from './routes/showcase'
import { AboutPage } from './routes/about'

const rootRoute = createRootRoute({ component: Root })
const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: PrecisionHomePage })
const showcaseRoute = createRoute({ getParentRoute: () => rootRoute, path: '/showcase', component: ShowcasePage })
const aboutRoute = createRoute({ getParentRoute: () => rootRoute, path: '/about', component: AboutPage })

const routeTree = rootRoute.addChildren([indexRoute, showcaseRoute, aboutRoute])
const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
