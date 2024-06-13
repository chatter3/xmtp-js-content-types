import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import { resolveExtensions } from "@xmtp/rollup-plugin-resolve-extensions";
import { defineConfig } from "rollup";
import { dts } from "rollup-plugin-dts";
import filesize from "rollup-plugin-filesize";

const plugins = [
  typescript({
    declaration: false,
    declarationMap: false,
  }),
  filesize({
    showMinifiedSize: false,
  }),
];

const external = [
  "@noble/secp256k1",
  "@xmtp/proto",
  "@xmtp/content-type-primitives",
  "@xmtp/xmtp-js",
  "node:crypto",
];

export default defineConfig([
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.js",
      format: "es",
      sourcemap: true,
    },
    plugins,
    external,
  },
  {
    input: "src/index.ts",
    output: {
      file: "dist/browser/index.js",
      format: "es",
      sourcemap: true,
    },
    plugins: [
      resolveExtensions({ extensions: [".browser"] }),
      terser(),
      ...plugins,
    ],
    external,
  },
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.cjs",
      format: "cjs",
      sourcemap: true,
    },
    plugins,
    external,
  },
  {
    input: "src/index.ts",
    output: {
      file: "dist/index.d.ts",
      format: "es",
    },
    plugins: [dts()],
  },
]);
