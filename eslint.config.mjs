import nextCoreWebVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  {
    ignores: ["public/**", ".next/**", "out/**", "build/**"],
  },
  ...nextCoreWebVitals,
];

export default eslintConfig;
