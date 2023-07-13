<template>
  <div class="menu-item">
    <template v-for="item in menu">
      <el-menu-item
        :index="item.name"
        :key="item.name"
        :class="{ 'submenu-title-noDropdown': !isNest }"
      >
        <!-- <i :class="[item.meta.icon || 'fa fa-navicon']"></i> -->
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>
    </template>
  </div>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    menu: {
      type: Array,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
