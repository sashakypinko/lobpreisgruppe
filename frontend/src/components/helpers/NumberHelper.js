const NumberHelper = {
  toNumber(num) {
    if (typeof num !== 'number') {
      return Number(num.replace(/,/g, '.'));
    }
    return num;
  },
};

export default NumberHelper;
