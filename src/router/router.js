import {createWebHashHistory, createRouter} from 'vue-router'
import Comment from '../pages/Comment'
import Index from '../components/index'
import UserIndex from '../pages/UserHome'
import CreateActive from '../pages/CreateActive'



export default createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHashHistory(),
    routes:[
        {
            path: '/index',
            component: Index
        },
        {
            path: '/createact',
            component: CreateActive
        },
        {
            path: '/userinfo',
            component: UserIndex
        },
        {
            path: '/Comment',
            component: Comment
        },
    ]
  })
  
