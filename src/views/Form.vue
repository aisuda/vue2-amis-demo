<template>
  <amis-renderer :schema="schema" :data="data" />
</template>
<script>
import AMISRenderer from "@/components/AMISRenderer";

const schema = {
  type: "page",
  title: "这是 AMIS 表单页面",
  body: [
    {
      type: "form",
      mode: "horizontal",
      api: "https://3xsw4ap8wah59.cfc-execute.bj.baidubce.com/api/amis-mock/mock2/form/saveForm",
      body: [
        {
          label: "Name",
          type: "input-text",
          name: "name",
        },
        {
          label: "Email",
          type: "input-email",
          placeholder: "请输入邮箱地址",
          name: "email",
        },
      ],
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
    schema: schema,
    data: {
      // 传递初始值
      name: "Your Name",
    },
  }),
};
</script>
