import {createWebHistory, createRouter} from 'vue-router'

import AuthPage from '@/components/auth/AuthPage.vue'
import ValidateAccountPage from '@/components/auth/ValidateAccountPage.vue'

import HomePage from '@/components/contents/HomePage.vue'
import AdminPage from '@/components/contents/AdminPage.vue'
import ConfigPage from '@/components/contents/ConfigPage.vue'

import CharacterPage from '@/components/contents/CharacterPage.vue'
import UniversePage from '@/components/contents/UniversePage.vue'
import TablePage from '@/components/contents/TablePage.vue'

import { userKey } from '@/global'

const routes = [
    {
        name: 'homepage',
        path: '/',
        component: HomePage
    },{
        name: 'adminpanelpage',
        path: '/adminpanelpage',
        component: AdminPage,
    },{
        name: 'configpage',
        path: '/configpage',
        component: ConfigPage
    },{
        name: 'characterpage',
        path: '/characterpage',
        component: CharacterPage,
    },{
        name: 'universepage',
        path: '/universepage',
        component: UniversePage,
    },{
        name: 'tablepage',
        path: '/tablepage',
        component: TablePage,
    },{
        name: 'authpage',
        path: '/authpage',
        component: AuthPage
    },{
        name: 'validateaccountpage',
        path: '/validateaccountpage',
        component: ValidateAccountPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const json = localStorage.getItem(userKey)
    if(to.matched.some(record => record.meta.permission)) {
        const user = JSON.parse(json)
        user && user.permission ? next() : next({path: '/'})
    }else{
        next()
    }
})

export default router