module.exports = {
  root: true,
  extends: ["universe/native"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        endOfLine: "auto",
      },
    ],
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        pathGroups: [
          {
            pattern: "*",
            group: "builtin",
            position: "before",
          },

          {
            pattern: "@*",
            group: "parent",
            position: "before",
          },

          {
            pattern: ".*",
            group: "index",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
      },
    ],
  },
};
