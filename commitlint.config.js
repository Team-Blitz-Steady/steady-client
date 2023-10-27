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
        return [false, `커밋 메시지에 이슈 넘버가 없습니다!. got ${header}`];
      },
    ],
    "scope-empty": [0],
    "subject-empty": [0],

    "subject-full-stop": [2, "never", "."],
    "subject-case": [0],
    "header-max-length": [2, "always", 100],
    "body-max-line-length": [2, "always", 100],
    "footer-max-line-length": [2, "always", 100],
  },
};
