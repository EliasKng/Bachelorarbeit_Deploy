const OFF = 0, WARN = 1, ERROR = 2;

const memberOrdering = [
  // Index signature.

  'signature',

  // Static fields.

  'public-static-field',
  'protected-static-field',
  'private-static-field',

  // Fields.

  'public-decorated-field',
  'protected-decorated-field',
  'private-decorated-field',

  'public-instance-field',
  'protected-instance-field',
  'private-instance-field',

  'public-abstract-field',
  'protected-abstract-field',
  'private-abstract-field',

  // Static methods.

  'public-static-method',
  'protected-static-method',
  'private-static-method',

  // Constructors.

  'public-constructor',
  'protected-constructor',
  'private-constructor',

  // Methods.

  'public-decorated-method',
  'protected-decorated-method',
  'private-decorated-method',

  'public-instance-method',
  'protected-instance-method',
  'private-instance-method',

  'public-abstract-method',
  'protected-abstract-method',
  'private-abstract-method',
];

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser.
  plugins: ['@typescript-eslint', 'unused-imports', 'import'],
  extends: [
    // Uses the recommended rules from the @typescript-eslint/eslint-plugin.
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2015, // Allows for the parsing of modern ECMAScript features.
    sourceType: 'module', // Allows for the use of imports.
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules
    // specified from the extended configs e.g.
    'max-len': [ERROR, 120],
    'prefer-const': [ERROR],
    'semi': [ERROR],
    'eqeqeq': [ERROR],
    'no-trailing-spaces': [ERROR],
    'quotes': [ERROR, 'single'],
    'arrow-spacing': [ERROR],
    '@typescript-eslint/explicit-member-accessibility': [OFF],
    'space-before-blocks': [ERROR],
    'comma-dangle': [ERROR, 'always-multiline'],
    '@typescript-eslint/ban-ts-comment': [ERROR, {
      'ts-expect-error': false,
    }],
    '@typescript-eslint/interface-name-prefix': [OFF],
    '@typescript-eslint/no-var-requires': [WARN],
    '@typescript-eslint/no-use-before-define': [OFF],
    '@typescript-eslint/no-empty-function': [OFF],
    '@typescript-eslint/naming-convention': [OFF],
    // '@typescript-eslint/naming-convention': [ERROR, {
    //   selector: 'default',
    //   format: ['camelCase'],
    // },
    //   {
    //     selector: 'typeParameter',
    //     format: ['StrictPascalCase'],
    //     // Multichar type parameters end with a T.
    //     custom: {
    //       regex: '[a-z]^T',
    //       match: false,
    //     },
    //   },
    //   {
    //     selector: 'variable',
    //     format: ['camelCase', 'UPPER_CASE'],
    //   },
    //   {
    //     selector: ['typeLike', 'enumMember'],
    //     format: ['PascalCase'],
    //   },
    //   {
    //     selector: 'property',
    //     // Off because use interfaces for objects that come directly
    //     // from sql databases which are usually not camel cased.
    //     format: [],
    //   },
    //   {
    //     selector: 'interface',
    //     format: ['PascalCase'],
    //     // Interfaces don't start with an I.
    //     custom: {
    //       regex: '^I[A-Z]',
    //       match: false,
    //     },
    //   },
    // ],
    '@typescript-eslint/consistent-type-assertions': [WARN],
    'no-warning-comments': [ERROR, {'terms': ['fixme', 'xxx'], 'location': 'start'}],
    '@typescript-eslint/no-inferrable-types': [OFF],
    'no-restricted-imports': [ERROR, {
      // Importing from the source folder is always an error.
      // Import from the dist folder of the yarn module instead.
      patterns: ['**/src/ts/**'],
    }],
    'keyword-spacing': [ERROR, {
      before: true,
      after: true,
    }],
    // '@typescript-eslint/explicit-module-boundary-types': [ERROR],
    '@typescript-eslint/explicit-module-boundary-types': [OFF],
    'unused-imports/no-unused-imports': ERROR,
    'no-var': [ERROR],
    'object-curly-spacing': [ERROR, 'never'],
    'import/order': [ERROR, {
      'newlines-between': 'never',
      pathGroups: [
        {
          pattern: '@codesphere/**',
          group: 'external',
          position: 'after',
        },
      ],
      pathGroupsExcludedImportTypes: [],
    }],
    'curly': [ERROR, 'multi-line', 'consistent'],
    '@typescript-eslint/member-ordering': [ERROR, {default: memberOrdering}],
    'no-multiple-empty-lines': [ERROR, {max: 1}],
  },
  env: {
    browser: true,
    node: true,
  },
};
