import plainFormatter from './plain.js';
import stylishFormatter from './stylish.js';

const getFormater = (tree, type) => {
  switch (type) {
    case 'stylish':
      return stylishFormatter(tree);
    case 'plain':
      return plainFormatter(tree);
    case 'json':
      return JSON.stringify(tree);
    default:
      throw new Error('Некорректный формат');
  }
};

export default getFormater;
