import TYPES from '../types.js';

const getName = (key, parents) => [...parents, key].join('.');
const formatValue = (value) => {
  if (value === null) {
    return value;
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  if (typeof value === 'object') {
    return '[complex value]';
  }

  return String(value);
};

const getMapElements = (type, element, parent = []) => {
  switch (type) {
    case TYPES.UNMODIFIED:
      return null;
    case TYPES.OVER:
      return `Property '${getName(element.key, parent)}' was added with value: ${formatValue(element.value)}\n`;
    case TYPES.EXIST:
      return `Property '${getName(element.key, parent)}' was removed\n`;
    case TYPES.COLLISION:
      return `Property '${getName(element.key, parent)}' was updated. From ${formatValue(element.value[0])} to ${formatValue(element.value[1])}\n`;
    case TYPES.BRANCH:
      return `${element.value.flatMap((item) => getMapElements(item?.type, item?.element, [...parent, element.key])).join('')}`;
    default:
      return null;
  }
};

const formatedData = (dataStructure) => dataStructure.reduce((diffAccum, { type, element }) => `${diffAccum}${getMapElements(type, element)}`, '');

export default formatedData;
