module.exports = {
  transform: {
    "^.+\\.jsx?$": "babel-jest"
  },
  moduleNameMapper: {
    "\\.(css|less|scss|svg)$": "identity-obj-proxy"
  },
  testEnvironment: "jsdom"
};