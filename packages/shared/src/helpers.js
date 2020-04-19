module.exports = {
  getDataFromAxiosError: e => {
    return {
      code: e.response && e.response.status,
      method: e.config.method,
      baseURL: e.config.baseURL,
      url: e.config.url,
      data: e.response && e.response.data
    };
  }
};
