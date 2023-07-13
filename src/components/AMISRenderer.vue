<template><div></div></template>

<script>
import "amis/sdk/sdk.js";
import "amis/sdk/sdk.css";

export default {
  name: "AMISRenderer",
  components: {},
  props: {
    schema: {
      type: Object,
      default: {
        type: "page",
        body: "Hello World!",
      },
    },
    locals: {
      type: Object,
      default: () => ({}),
    },
    props: {
      type: Object,
      default: () => ({}),
    },
    env: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      // 这里面的数据所有 amis 页面都可以获取到
      // 可以用来放一下公共数据，比如用户信息等
      // 不要放受控数据，受控数据应该通过 data 下发
      context: {
        siteName: "AMIS DEMO",
      },
      amisInstance: null,
    };
  },

  watch: {
    locals: function () {
      this.updateProps();
    },
    props: function () {
      this.updateProps();
    },
  },
  mounted() {
    let scoped = amisRequire("amis/embed");
    const instance = scoped.embed(
      this.$el,
      this.schema,
      {
        data: {
          ...this.locals,
        },
        context: this.context,

        // todo 下发 location 对象
        ...this.props,
      },
      {
        // 覆盖 amis env
        // 参考 https://aisuda.bce.baidu.com/amis/zh-CN/docs/start/getting-started#sdk
        jumpTo: (url) => {
          this.$router.push(url);
        },

        // todo 处理 updateLocation 整合单页路由
        ...this.env,
      },
      () => {
        this.$emit("ready", {
          instance,
        });
      }
    );
    this.amisInstance = instance;
  },

  methods: {
    updateProps() {
      this.amisInstance?.updateProps({
        data: {
          ...this.locals,
        },
        context: this.context,
        ...this.props,
      });
    },
  },

  destroyed() {
    this.amisInstance?.unmount();
  },
};
</script>
