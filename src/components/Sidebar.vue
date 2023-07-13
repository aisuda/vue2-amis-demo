<template>
  <el-menu
    mode="vertical"
    :show-timeout="200"
    :default-active="$route.name"
    :collapse="isCollapse"
    @select="handleSelect"
    background-color="#25314C"
    text-color="#fff"
    active-text-color="#00c1de"
  >
    <sidebar-item :menu="menu"></sidebar-item>
  </el-menu>
</template>

<script>
import SidebarItem from "@/components/SidebarItem";
import menu from "@/router/menu";

export default {
  name: "Sidebar",
  components: {
    SidebarItem,
  },
  data() {
    return {
      menu: menu,
    };
  },
  props: {
    isCollapse: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    // 导航菜单的点选处理
    handleSelect(index) {
      if (this.$router.history.current.name === index) return;
      this.$router.push({ name: index });
    },
  },
};
</script>
