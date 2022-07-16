<template>
  <Menubar>
    <template #start> Before </template>
    <!-- <template #item="{ item }">
      <router-link
        :to="item.url"
        class="p-menuitem-link"
        active-class="active-link"
        exact-active-class="active-link-exact"
      >
        {{ item.label }}
      </router-link>
    </template> -->
    <template #end>
      <!-- <a class="p-menuitem-link" :href="item.url">{{ item.label }}</a> -->
      <!-- </template> -->
      <ul class="p-menubar-root-list" role="menubar">
        <li role="none" class="p-menuitem" v-for="item in items" :key="item.label">
          <router-link
            :to="item.url"
            class="p-menuitem-link"
            active-class="p-menuitem-active"
            exact-active-class="p-menuitem-active"
            role="menuitem"
          >
            <span class="p-menuitem-icon pi pi-fw pi-power-off"></span>
            <span class="p-menuitem-text">{{ item.label }}</span>
          </router-link>
        </li>
      </ul>
    </template>
  </Menubar>
</template>
<script>
import { ref } from 'vue';

export default {
  setup() {
    const items = ref([
      {
        label: 'Sign up',
        icon: 'pi pi-fw pi-power-off',
        url: '/signup',
      },
      {
        label: 'Sign in',
        icon: 'pi pi-fw pi-power-off',
        url: '/signin',
      },
    ]);

    return { items };
  },
};
</script>
