import flatFormatter from './flat.js';
import stylishFormatter from './stylish.js';

const formatters = {
  flat: flatFormatter,
  stylish: stylishFormatter,
  json: JSON.stringify,
};

export default (type) => formatters[type];
