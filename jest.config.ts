export default {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy'
  },
  roots: ["<rootDir>/src/"],
  modulePaths: ["<rootDir>/src/"],
}
