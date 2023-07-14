export default [
  {
    path: "index",
    name: "index",
    component: () => import("@/views/Home.vue"),
    meta: {
      title: "首页",
    },
  },
  {
    path: "table",
    name: "table",
    component: () => import("@/views/Table.vue"),
    meta: {
      title: "Table",
    },
  },
  {
    path: "form",
    name: "form",
    component: () => import("@/views/Form.vue"),
    meta: {
      title: "Form",
    },
  },
  {
    path: "tabs",
    name: "tabs",
    component: () => import("@/views/Tabs.vue"),
    meta: {
      title: "Tabs",
    },
  },
  {
    path: "mixed",
    name: "mixed",
    component: () => import("@/views/Mixed.vue"),
    meta: {
      title: "Mixed",
    },
  },
];
