<template><div>Loading...</div></template>

<script>
// import "amis/sdk/sdk.js";
// import "amis/sdk/sdk.css";
// import "amis/sdk/iconfont.css";

// 可以不引用, 如果你不想要任何辅助类样式的话 (比如 `m-t-xs` 这种)
// https://aisuda.bce.baidu.com/amis/zh-CN/style/index
import "amis/sdk/helper.css";
import qs from "qs";

function loadScript(src, callback) {
  const script = document.createElement("script");
  script.setAttribute("type", "text/javascript");
  script.setAttribute("src", src);
  script.onload = () => callback();
  script.onerror = () => callback(new Error(`Failed to load ${src}`));
  document.body.appendChild(script);
}

function loadStyles(styles) {
  for (const path of styles) {
    const style = document.createElement("link");
    style.setAttribute("rel", "stylesheet");
    style.setAttribute("type", "text/css");
    style.setAttribute("href", path);
    document.head.appendChild(style);
  }
}

function loadSDK() {
  return new Promise((resolve, reject) => {
    if (window.amisRequire) {
      resolve();
      return;
    }
    loadStyles([
      "/amis/sdk/sdk.css",
      "/amis/sdk/helper.css",
      "/amis/sdk/iconfont.css",
    ]);
    loadScript("/amis/sdk/sdk.js", (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}

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
    const router = this.$router;
    return {
      // 这里面的数据所有 amis 页面都可以获取到
      // 可以用来放一下公共数据，比如用户信息等
      // 不要放受控数据，受控数据应该通过 data 下发
      context: {
        siteName: "AMIS DEMO",
      },
      get location() {
        const current = router.history.current;
        return {
          pathname: current.path,
          hash: current.hash,
          query: current.query,
          search: `?${qs.stringify(current.query)}`,
        };
      },
      loading: false,
      amisInstance: null,
      unmounted: false,
    };
  },

  watch: {
    locals: function () {
      this.updateProps();
    },
    props: function () {
      this.updateProps();
    },
    $route: function () {
      this.updateProps();
    },
  },
  async mounted() {
    try {
      this.loading = true;
      await loadSDK();
    } finally {
      this.loading = false;
    }
    if (this.unmounted) {
      return;
    }

    const scoped = amisRequire("amis/embed");
    const { normalizeLink } = amisRequire("amis-core");
    const router = this.$router;
    const instance = scoped.embed(
      this.$el,
      this.schema,
      {
        data: {
          ...this.locals,
        },
        context: this.context,
        location: this.location,

        // todo 下发 location 对象
        ...this.props,
      },
      {
        // 覆盖 amis env
        // 参考 https://aisuda.bce.baidu.com/amis/zh-CN/docs/start/getting-started#sdk
        jumpTo: (to, action) => {
          if (to === "goBack") {
            return router.go(-1);
          }

          to = normalizeLink(to, this.location);

          if (action?.actionType === "url") {
            action.blank === false ? router.push(to) : window.open(to);
            return;
          }

          // 主要是支持 nav 中的跳转
          if (action && to && action.target) {
            window.open(to, action.target);
            return;
          }

          if (/^https?:\/\//.test(to)) {
            window.location.replace(to);
          } else {
            router.push(to);
          }
        },

        updateLocation: (location, replace) => {
          if (location === "goBack") {
            return router.go(-1);
          }

          location = normalizeLink(location, this.location);
          replace ? router.replace(location) : router.replace(location);
        },

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
    this.unmounted = true;
    this.amisInstance?.unmount();
  },
};
</script>