export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-empty': [2, 'always'],
    'type-case': [2, 'always', 'upper-case'],
    'type-enum': [2, 'always', ['FEAT', 'FIX', 'DOCS', 'STYLE', 'TEST', 'CONFIG']],
  },
  prompt: {
    questions: {
      type: {
        description: "Select the type of change that you're committing:",
        enum: {
          FEAT: {
            description: 'A new feature',
            emoji: '✨',
            title: 'Features',
          },
          FIX: {
            description: 'A bug fix',
            title: 'Bug Fixes',
            emoji: '🪲',
          },
          DOCS: {
            description: 'Documentation only changes',
            title: 'Documentation',
            emoji: '📖',
          },
          STYLE: {
            description: 'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
            title: 'Linting, formatting, code styles',
            emoji: '🖌️',
          },
          TEST: {
            description: 'Adding missing tests or correcting existing tests',
            title: 'Tests',
            emoji: '🧪',
          },
          CONFIG: {
            description: 'Changes that affect the build system or external dependencies, deployment, and CI configurations',
            title: 'Config, CI, Builds',
            emoji: '🛠',
          },
        },
      },
      subject: {
        description: 'Write a short, imperative tense description of the change',
      },
      body: {
        description: 'Provide a longer description of the change',
      },
      isBreaking: {
        description: 'Are there any breaking changes?',
      },
      breakingBody: {
        description:
          'A BREAKING CHANGE commit requires a body. Please enter a longer description of the commit itself',
      },
      breaking: {
        description: 'Describe the breaking changes',
      },
    },
  },
};
