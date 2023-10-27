module.exports = {
  extends: ["@commitlint/config-conventional", "gitmoji"],
  plugins: ["commitlint-plugin-function-rules"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        ":sparkles: Feat",
        ":rotating_light: Fix",
        ":hammer: Refactor",
        ":tada: Init",
        ":memo: Chore",
        ":libstick: Style",
        ":wastebasket: Remove",
      ],
    ],
    "type-case": [2, "always", "pascal-case"],
    "type-empty": [0],
    "scope-enum": [0],
    "function-rules/scope-enum": [
      2,
      "always",
      (parsed) => {
        const { header } = parsed;
        const issueNumberRegex = /\(#(\d+)\)/;
        if (issueNumberRegex.test(header)) {
          return [true];
        }
        return [
          false,
          `커밋 메시지의 이슈 넘버 형식이 올바르지 않습니다!. got ${header}`,
        ];
      },
    ],
    "scope-empty": [0],
    "subject-empty": [0],

    "subject-full-stop": [2, "never", "."],
    "subject-case": [0],
    "header-max-length": [2, "always", 100],
  },
};
