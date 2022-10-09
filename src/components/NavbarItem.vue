<template>
  <li class="nav-item" :class="{ dropdown: item.items }">
    <a
      v-if="item.items && item.items.length > 0"
      class="nav-link dropdown-toggle"
      data-bs-toggle="dropdown"
      href="#"
      role="button"
      aria-haspopup="true"
      aria-expanded="false"
    >
      <font-awesome-icon class="me-1" :icon="item.icon" />
      {{ item.label }}
    </a>

    <div class="dropdown-menu" v-if="item.items && item.items.length > 0">
      <template v-for="link in item.items">
        <router-link
          v-if="link.url"
          class="dropdown-item"
          exact-active-class="active"
          aria-current="page"
          :to="link.url"
          >{{ link.label }}</router-link
        >
        <a v-else href="#" class="dropdown-item" @click="link.onClick">{{ link.label }}</a>
      </template>
    </div>
    <router-link
      v-else-if="item.url"
      :class="item.class ? item.class : 'nav-link'"
      exact-active-class="active"
      aria-current="page"
      :to="item.url"
    >
      <font-awesome-icon :icon="item.icon" />
      {{ item.label }}
    </router-link>
    <a v-else href="#" class="nav-link" @click="item.onClick">
      <font-awesome-icon :icon="item.icon" />
      {{ item.label }}
    </a>
  </li>
</template>
<script>
export default {
  name: 'navbar-item',
  props: ['item'],
}
</script>
