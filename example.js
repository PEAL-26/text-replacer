const { replaceInFiles } = require("./index");

// @/components/pattern  -> software-edv-design-system/components

// Exemplo de uso:
replaceInFiles(
  "./src/components",
  "@/components/pattern",
  "software-edv-design-system/components",
  [".tsx"]
);
