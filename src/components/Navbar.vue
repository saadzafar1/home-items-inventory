<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="#">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav me-auto">
         
        </ul>
        <ul class="navbar-nav">
          <NavbarItem v-for="item in items" :item="item" />
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import NavbarItem from './NavbarItem.vue'

export default {
  setup() {
    const authState = useAuthStore()
    const { user, currentUserName } = storeToRefs(authState)
    const menuItems = computed(() => {
      if (user.value) {
        return [
          {
            label: currentUserName.value,
            icon: 'fa-regular fa-user',
            url: '/',
            items: [
              {
                label: 'Profile',
                icon: 'pi pi-fw pi-user-minus',
                url: '/profile',
              },
              {
                label: 'Logout',
                icon: 'pi pi-fw pi-user-plus',
                onClick: onSignout
              }
            ],
          },
        ]
      } else {
        return [
          {
            label: 'Sign in',
            icon: 'pi pi-fw pi-power-off',
            class: 'nav-link text-primary',
            url: '/signin',
          },
          {
            label: 'Sign up',
            icon: 'pi pi-fw pi-power-off',
            url: '/signup',
            class: 'btn btn-primary'
          },
        ]
      }
    })

    const onSignout = () => {
      authState.signoutUser();
    }

    return { items: menuItems, user }
  },
  components: {
    NavbarItem
  }
}
</script>
