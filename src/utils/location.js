const location = (state, city) => {
  const stateValue = state.iso2 || state.name;
  return `${city.name}, ${stateValue}`;
};

export default location;
