import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";
import { createVuePlugin } from "vite-plugin-vue2";
import viteCompression from "vite-plugin-compression";
import path from "path";
import { viteStaticCopy } from 'vite-plugin-static-copy';

const HOST = "0.0.0.0";
const REPLACEMENT = `${path.resolve(__dirname, "./src")}/`;

export default (/** if you want to use mode : { mode }*/) => {
  return defineConfig({
    base: "./",
    server: {
      host: HOST,
      port: process.env.PORT,
    },
    resolve: {
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"], // .vue added
      alias: [
        {
          find: "@/",
          replacement: REPLACEMENT,
        },
        {
          find: "src/",
          replacement: REPLACEMENT,
        },
      ],
    },
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: path.resolve(__dirname, './node_modules/amis/sdk') + '/[!.]*',
            dest: 'amis/sdk'
          }
        ]
      }),
      createVuePlugin(/* options */),
      legacy({
        targets: ["ie >= 11"],
        additionalLegacyPolyfills: ["regenerator-runtime/runtime"],
      }),
      viteCompression(),
    ],
  });
};
