// module.exports = {
//     env: {
//       node: true,
//       es2021: true,
//     },
//     extends: [
//       'eslint:recommended',
//       'plugin:@typescript-eslint/recommended',
//     ],
//     parser: '@typescript-eslint/parser',
//     parserOptions: {
//       ecmaVersion: 12,
//       sourceType: 'module',
//     },
//     plugins: [
//       '@typescript-eslint',
//     ],
//     // rules: {
//     //   'no-console': 'warn',
//     // },
  
//     rules: {
//     //   'indent': ['error', 2], // Use 2 spaces for indentation
//     //   'linebreak-style': ['error', 'unix'], // Use UNIX line endings
//     //   'quotes': ['error', 'single'], // Use single quotes
//     //   'semi': ['error', 'always'], // Require semicolons at the end of statements
//       'no-console': 'warn', // Warn on the use of console.log, etc.
//     //   'no-unused-vars': 'off', // Disable unused variable warnings (handled by TypeScript)
//     //   '@typescript-eslint/no-unused-vars': ['error'], // Enable TypeScript-specific unused variable checks
//       // Add more rules as needed
//     },
//   };
  

// .eslintrc.js
module.exports = {
  env: {
      node: true,
      es2021: true,
  },
  extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
      ecmaVersion: 12,
      sourceType: 'module',
  },
  plugins: [
      '@typescript-eslint',
  ],
  rules: {
        // 'indent': ['error', 2], // Use 2 spaces for indentation
        // 'linebreak-style': ['error', 'unix'], // Use UNIX line endings
        // 'quotes': ['error', 'single'], // Use single quotes
        // 'semi': ['error', 'always'], // Require semicolons at the end of statements
        // 'no-console': 'warn', // Warn on the use of console.log, etc.
        'no-unused-vars': 'off', // Disable unused variable warnings (handled by TypeScript)
        '@typescript-eslint/no-unused-vars': ['error'], // Enable TypeScript-specific unused variable checks
           
       },
};

  