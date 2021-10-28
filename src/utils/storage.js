const Storage = {};

Storage.add = (name, value) => {
  const prefix = process.env.PROJECT_NAME;
  const preName = `${prefix}-${name}`;
  window.localStorage.setItem(preName, value);
};

Storage.get = name => {
  const prefix = process.env.PROJECT_NAME;
  const preName = `${prefix}-${name}`;
  return window.localStorage.getItem(preName);
};

Storage.rm = name => {
  const prefix = process.env.PROJECT_NAME;
  const preName = `${prefix}-${name}`;
  window.localStorage.removeItem(preName);
};

export default Storage;
