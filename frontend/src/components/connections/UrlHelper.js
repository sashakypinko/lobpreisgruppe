import History from './History';

const UrlHelper = {
  getQuery(location) {
    return new URLSearchParams(location.search);
  },

  getParam(param, res = '') {
    const { location } = window;
    const query = this.getQuery(location);
    return query.get(param) || res;
  },

  getIntParam(param, res = 0) {
    const queryParam = this.getParam(param);
    return parseInt(queryParam) || res;
  },

  deleteParam(param) {
    const { location } = window;
    const query = this.getQuery(location);
    const { pathname } = location;
    query.delete(param);
    const newUrl = `${pathname}?${query.toString()}`;
    History.navigate(newUrl);
  },

  setParam(param, value) {
    const { location } = window;
    const query = this.getQuery(location);
    const { pathname } = location;
    query.set(param, value);
    const newUrl = `${pathname}?${query.toString()}`;
    History.navigate(newUrl);
  },

  setParams(params) {
    const { location } = window;
    const { pathname } = location;
    const query = this.getQuery(location);
    params.forEach(({ name, value }) => {
      query.set(name, value);
    });
    const newUrl = `${pathname}?${query.toString()}`;
    History.navigate(newUrl);
  },

  deleteParams(params) {
    const { location } = window;
    const query = this.getQuery(location);
    const { pathname } = location;
    params.forEach(param => {
      query.delete(param);
    });
    const queryString = query.toString();
    const newUrl = !queryString ? pathname : `${pathname}?${query.toString()}`;
    History.navigate(newUrl);
  },

  setParamsToUrl(params, location, newPath) {
    const query = this.getQuery(location);
    const { pathname } = location;
    params.forEach(({ name, value }) => {
      query.set(name, value);
    });
    return `${newPath || pathname}?${query.toString()}`;
  },

  deleteParamsFromUrl(params, location, newPath) {
    const query = this.getQuery(location);
    const { pathname } = location;
    params.forEach(param => {
      query.delete(param);
    });
    const queryString = query.toString();

    const pathToUse = newPath || pathname;
    return !queryString ? pathToUse : `${pathToUse}?${queryString}`;
  },

  setAndRemoveParams(paramsToSet, paramsToRemove, newPath, navigateParams) {
    const { location, origin } = window;
    let newUrl = this.setParamsToUrl(paramsToSet, location, newPath);
    const newLocation = new URL(`${origin}${newUrl}`);
    newUrl = this.deleteParamsFromUrl(paramsToRemove, newLocation, newPath);
    History.navigate(newUrl, navigateParams);
  },

  replaceParamsInReactUrl(url, params) {
    const splittedUrl = url.split('/').map(el => {
      if (el[0] === ':') {
        const attribute = el.substring(1);
        return params[attribute] ?? el;
      }
      return el;
    });

    return splittedUrl.join('/');
  },
};

export default UrlHelper;
