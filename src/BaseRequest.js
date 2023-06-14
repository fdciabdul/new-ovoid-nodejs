const axios = require('axios');


class BaseRequest {
  constructor() {
    this.AGW_BASEURL = axios.create({
      baseURL: 'https://agw.ovo.id/',
      headers: {
        'Accept-Encoding': 'gzip',
        'App-Version': '3.84.1',
        'Client-Id': 'ovo_android',
        'Connection': 'Keep-Alive',
        'Content-Type': 'application/json; charset=UTF-8',
        'OS': 'Android',
        'OS-Version': '12',
        'User-Agent': 'okhttp/4.11.0',
      },
    });
    this.API_OVO_BASE_URL = axios.create({
      baseURL: 'https://api.ovo.id/',
      headers: {
        'Accept-Encoding': 'gzip',
        'App-Version': '3.84.1',
        'Client-Id': 'ovo_android',
        'Connection': 'Keep-Alive',
        'Content-Type': 'application/json; charset=UTF-8',
        'OS': 'Android',
        'OS-Version': '12',
        'User-Agent': 'okhttp/4.11.0',
      },
    });

  }
}

module.exports = BaseRequest;
