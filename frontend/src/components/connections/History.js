const History = {
  navigate: null,
  back: () => History?.navigate(-1),
};

export default History;
