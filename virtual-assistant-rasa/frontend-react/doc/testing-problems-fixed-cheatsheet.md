# Let's execute a test

After installing the jest and ts-jest dependencies, a script was created to run the tests in React called ```"test": "jest"```.

# First problem found

An error occurs when running the tests that is related to the test environment.

# Solution

The jest configuration is updated by changing the node test environment to that of the jest-environment-jsdom dependency.

```yarn add jest-environment-jsdom```

```jest.config.js

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transformIgnorePatterns: ['^.+\\.js$'],
}
```

# Second problem found

A sample test is created for the file 'index'.

An error is encountered when running the test in which it is declared that a dependency is not in use when in fact it is in use.

# Solution

An slint statement is used to ignore a variable that is not supposed to be used:

```// @ts-ignore: unused variable```