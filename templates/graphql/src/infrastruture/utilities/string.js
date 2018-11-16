const splitCamelCase = (text) => {
  return text.replace(/([a-z](?=[A-Z]))/g, '$1-');
};

module.exports = {
  splitCamelCase
};