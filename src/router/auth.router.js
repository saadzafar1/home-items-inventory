import SigninView from '@/views/SigninView.vue';
import SignupView from '@/views/SignupView.vue';
export default [
    {
        path: '/signin',
        name: 'signin',
        component: SigninView
    },
    {
        path: '/signup',
        name: 'signup',
        component: SignupView
    }
]