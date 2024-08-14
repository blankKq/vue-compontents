import { createWebHashHistory, createRouter } from 'vue-router'


const routes:any[] = [
  {
    path: '/',
    redirect: '/uploadExcel'
  },
  {
    path: '/uploadExcel',
    name: 'uploadExcel',
    component: () => import('../views/upload/upload-excel/upload-index.vue')
  },
]

const router = createRouter({
  routes,
  history: createWebHashHistory(),
})


router.beforeEach((to, from, next) => {
  next()
})

export default router