import plainFormatter from './plain.js';
import stylishFormatter from './stylish.js';

const formatters = {
  plain: plainFormatter,
  stylish: stylishFormatter,
  json: JSON.stringify,
};

export default (type) => formatters[type];
