import yaml from 'js-yaml';

const parsers = {
  yaml: yaml.load,
  yml: yaml.load,
  json: JSON.parse,
};

export default (data, format) => parsers[format](data);
