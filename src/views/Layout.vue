<template>
  <div class="app-wrapper">
    <el-container>
      <el-container>
        <el-aside :class="{ collapse: sidebarCollapse }" id="main-aside">
          <sidebar :is-collapse="sidebarCollapse"></sidebar>
        </el-aside>
        <el-container :class="{ collapse: sidebarCollapse }">
          <!-- <el-header id="main-header">
            <navbar :is-collapse="sidebarCollapse"></navbar>
          </el-header> -->
          <el-main id="main-container">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
            <div
              class="back-top"
              v-show="backTopVisible"
              @click="backToTop"
            ></div>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar.vue";
import Navbar from "@/components/Navbar.vue";
import _ from "lodash";
import { mapGetters } from "vuex";

export default {
  name: "layout",
  components: {
    Navbar,
    Sidebar,
  },
  data() {
    return {
      backTopVisible: false, // 是否显示滚动到顶端
    };
  },
  computed: {
    sidebarCollapse() {
      return false;
    },
  },
  mounted() {
    // 监听滚动
    let _container = document.getElementById("main-container");
    _container.addEventListener("scroll", this.catchScroll);
    window.smoothscroll = () => {
      let currentScroll = _container.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(window.smoothscroll);
        _container.scrollTo(0, Math.floor(currentScroll - currentScroll / 5));
      }
    };
  },
  methods: {
    catchScroll: _.debounce(function () {
      this.backTopVisible =
        document.getElementById("main-container").scrollTop > 100;
    }, 100),
    // 平滑滚动到顶部
    backToTop() {
      window.smoothscroll();
    },
  },
};
</script>
