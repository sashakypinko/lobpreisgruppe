const pagingElements = new Map();

const PaginationEnums = {
  WINTER_WHEELS: 'WINTER_WHEELS',
  SUPPLIER_PROFILES: 'SUPPLIER_PROFILES',
};

const tablePagingStore = {
  update: (key, value) => {
    pagingElements.set(key, value);
  },
  get: key => pagingElements.get(key) || 0,
};

export { PaginationEnums };
export default tablePagingStore;
