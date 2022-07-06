const env = process.env.NODE_ENV || "development";

//insert your API Key & Secret for each environment, keep this file local and never push it to a public repo for security purposes.
const config = {
  development: {
    APIKey: "2Ms6dZMnRNqs13lhf1W6BQ",
    APISecret: "py30Rh8g41nYcT3417gRIEtxF5ixSKXvv11L",
  },
  production: {
    APIKey: "2Ms6dZMnRNqs13lhf1W6BQ",
    APISecret: "py30Rh8g41nYcT3417gRIEtxF5ixSKXvv11L",
  },
};

module.exports = config[env];
