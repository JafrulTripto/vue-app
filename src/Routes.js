import login from './components/login';
import todoGrid from './components/todo-grid';
import register from './components/Registration';
import logout from './components/Log-out';


export const routes = [
    {
        path: '/login',
        component: login,
        meta:{
            requiresVisitor:true
        }

    },
    {
        path: '/todoTable',
        component: todoGrid,
        meta:{
            requiresAuth:true
        }

    },
    {
        path: '/register',
        component: register,
        meta:{
            requiresVisitor:true
        }
    },
    {
        path: '/logout',
        component: logout
    }
];