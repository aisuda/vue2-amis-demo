<template>
  <div style="padding: 20px">
    这是主页，VUE 页面 <el-button>Element按钮</el-button>
  </div>
</template>
<script>
import HomeApi from "@/api/modules/HomeApi";
export default {
  name: "Home",
  components: {},
  computed: {},
  data: () => ({}),
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  activated() {}, //when keep-alive
  deactivated() {}, //when keep-alive
  beforeDestroy() {},
  destroyed() {},
  methods: {
    // getDatList(){
    //   HomeApi.getDatList()
    // }
  },
};
</script>
