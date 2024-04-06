import TYPES from '../types.js';

const getSpaces = (deep) => ' '.repeat(deep * 4 - 2);

const formatValue = (data, deep) => {
  if (typeof data === 'object' && data !== null) {
    const objectStringify = Object.entries(data).map(([key, value]) => (`${getSpaces(deep + 1)}${key}: ${formatValue(value, deep + 1)}`));
    return `{\n${objectStringify.join('\n')}\n${getSpaces(deep)}}`;
  }

  if (typeof value === 'string') {
    return `'${data}'`;
  }

  return String(data);
};
const getMapElements = (type, element, deep = 1) => {
  switch (type) {
    case TYPES.OVER:
      return `\n${getSpaces(deep)}+ ${element.key}: ${formatValue(element.value, deep)}`;
    case TYPES.EXIST:
      return `\n${getSpaces(deep)}- ${element.key}: ${formatValue(element.value, deep)}`;
    case TYPES.COLLISION:
      return `\n${getSpaces(deep)}- ${element.key}: ${formatValue(element.value[0], deep)}\n${getSpaces(deep)}+ ${element.key}: ${formatValue(element.value[1], deep)}`;
    case TYPES.BRANCH:
      return `\n${getSpaces(deep)}  ${element.key}: {${element.value.flatMap((item) => getMapElements(item?.type, item?.element, deep + 1))}\n${getSpaces(deep)}  }`;
    case TYPES.UNMODIFIED:
      return `\n${getSpaces(deep)}  ${element.key}: ${formatValue(element.value, deep)}`;
    default:
      return '';
  }
};

export default getMapElements;
