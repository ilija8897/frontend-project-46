import _ from 'lodash';
import TYPES from './types.js';

const getStructure = (firstDataParced, secondDataParced) => {
  const unionKeys = Object.keys({ ...firstDataParced, ...secondDataParced });
  const sortedKeys = _.sortBy(unionKeys);
  return sortedKeys.map((key) => {
    if (!Object.hasOwn(firstDataParced, key)) {
      return { type: TYPES.OVER, element: { key, value: secondDataParced[key] } };
    }
    if (!Object.hasOwn(secondDataParced, key)) {
      return { type: TYPES.EXIST, element: { key, value: firstDataParced[key] } };
    }
    if (firstDataParced[key] instanceof Object && secondDataParced[key] instanceof Object) {
      return {
        type: TYPES.BRANCH,
        element: {
          key,
          value: getStructure(firstDataParced[key], secondDataParced[key]),
        },
      };
    }

    if (!_.isEqual(firstDataParced[key], secondDataParced[key])) {
      return {
        type: TYPES.COLLISION,
        element: {
          key,
          value: [firstDataParced[key], secondDataParced[key]],
        },
      };
    }

    if (_.isEqual(firstDataParced[key], secondDataParced[key])) {
      return { type: TYPES.UNMODIFIED, element: { key, value: firstDataParced[key] } };
    }
    return null;
  });
};

export default getStructure;
