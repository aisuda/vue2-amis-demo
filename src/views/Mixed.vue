<template>
  <div style="padding: 20px">
    <h2>混用 Vue 与 AMIS</h2>

    <amis-renderer
      v-on:ready="ready"
      :schema="schema"
      :locals="locals"
      :props="props"
    />

    <el-button v-on:click="reset">重置数据</el-button>
    <el-button v-on:click="submit">提交表单</el-button>
  </div>
</template>
<script>
import AMISRenderer from "@/components/AMISRenderer";

const schema = {
  type: "form",
  name: "theform",
  mode: "horizontal",
  title: "${siteName} Mixed Demo", // siteName 是 AMISRenderer 中 context 定义的
  body: [
    {
      label: "Name",
      type: "input-text",
      name: "name",
    },
    {
      label: "Email",
      type: "input-email",
      required: true,
      placeholder: "请输入邮箱地址",
      name: "email",
    },
  ],
  actions: [
    {
      type: "submit",
      label: "Sumibt",
      primary: true,
    },
    {
      type: "button",
      label: "页面跳转",
      actionType: "link",
      url: "/table",
    },
    {
      type: "button",
      label: "调用外部",
      onEvent: {
        click: {
          actions: [
            {
              actionType: "broadcast",
              args: {
                eventName: "event-1",
              },
            },
          ],
        },
      },
    },
  ],
};
export default {
  name: "Form",
  components: {
    "amis-renderer": AMISRenderer,
  },
  computed: {},
  data: () => ({
    instance: null,
    schema: schema,
    locals: {
      // 传递初始值
      name: "Your Name",
    },
    props: {
      onSubmit: (values) => {
        alert("提交成功" + JSON.stringify(values, null, 2));
      },
      onBroadcast: (type, rawEvent, data) => {
        alert(type);
        console.log(type, rawEvent, data);
      },
    },
  }),

  methods: {
    ready({ instance }) {
      this.instance = instance;
    },
    reset() {
      this.locals = {
        name: "Reset Name",
      };
    },
    submit() {
      this.instance?.getComponentByName("theform").doAction({
        actionType: "submit",
      });
    },
  },
};
</script>
