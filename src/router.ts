import { createRouter, createWebHashHistory } from 'vue-router'
const Discovery = () => import('@/page/discovery/index.vue')
const Songs = () => import('@/page/songs/index.vue')
const Playlists = () => import('@/page/playlists/index.vue')
const Mvs = () => import('@/page/mvs/index.vue')
const PlaylistDetail = () => import('@/page/playlist-detail/index.vue')
const Mv = () => import('@/page/mv/index.vue')

const Search = () => import('@/page/search/index.vue')
const searchPlaylists = () => import('@/page/search/playlists.vue')
const searchMvs = () => import('@/page/search/mvs.vue')
const searchSongs = () => import('@/page/search/songs.vue')
// 内容需要居中的页面
export const layoutCenterNames = ['discovery', 'playlists', 'songs', 'mvs']
//未登录时候的菜单页面
export const menuRoutes = [
    {
        path: '/discovery',
        name: 'discovery',
        component: Discovery,
        meta: {
            title: '发现音乐',
            icon: "hugeicons:audio-book-02"

        },
    },
    {
        path: '/playlists',
        name: 'playlists',
        component: Playlists,
        meta: {
            title: "推荐歌单",
            icon: "hugeicons:calendar-love-01"
        }
    },
    {
        path: '/songs',
        name: 'songs',
        component: Songs,
        meta: {
            title: "最新音乐",
            icon: 'lucide:music-4',
        }
    },

    {
        path: '/mvs',
        name: 'mvs',
        component: Mvs,
        meta: {
            title: "最新MV",
            icon: "lucide:youtube"
        }
    }
]
const routes = [
    ...menuRoutes,
    { path: '/', redirect: '/discovery' },
    {
        path: '/playlist/:id',
        name: 'playlistDetail',
        component: PlaylistDetail,
    },
    {
        path: '/search/:keyword',
        name: 'search',
        component: Search,
        //Vue Router 会自动将路由参数 (keywords) 作为 props 传递给对应的组件 (Search 组件)。
        props: true,
        redirect: (to: any) => ({ path: `/search/${to.params.keyword}/songs` }),
        children: [
            { path: 'songs', name: "searchSongs", component: searchSongs, props: (route: any) => ({ keyword: route.params.keyword }) },
            { path: 'playlists', name: 'searchPlaylists', component: searchPlaylists, props: (route: any) => ({ keyword: route.params.keyword }) },
            { path: 'mvs', name: 'searchMvs', component: searchMvs, props: (route: any) => ({ keyword: route.params.keyword }) }
        ]
    },
    {
        path: '/mv/:id',
        name: 'mv',
        component: Mv,
        props: (route: any) => ({
            id: +route.params.id
        })
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})
export default router