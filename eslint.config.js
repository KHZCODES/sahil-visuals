import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import { fixupConfigAsPlugin } from "@eslint/js/configs/eslint-recommended";
import { fixupConfigAsPlugin as fixupPluginReact } from "eslint-plugin-react/configs/jsx-runtime";
import pluginReactRefresh from "eslint-plugin-react-refresh";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx,ts,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
      },
    },
    plugins: {
      "react-refresh": pluginReactRefresh,
    },
    rules: {
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "react/react-in-jsx-scope": "off", // For React 17+ where import React is not needed
      "react/prop-types": "off", // Disable prop-types if you use TypeScript or don't need runtime type checking
    },
  },
  pluginJs.configs.recommended,
  fixupConfigAsPlugin(pluginReactConfig),
  fixupPluginReact(pluginReactRefresh.configs.recommended),
];