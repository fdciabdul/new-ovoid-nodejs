const BaseRequest = require('./BaseRequest');

class getBalance extends BaseRequest {
  async getBalance(deviceId, token) {
    this.API_OVO_BASE_URL.defaults.headers['Device-Id'] = deviceId;
    this.API_OVO_BASE_URL.defaults.headers['Authorization'] = token;
    try {
      const response = await this.API_OVO_BASE_URL.get('wallet/inquiry');
      return response.data;
    } catch (error) {
   
     return error.message;
    }
  }

  async getWalletTransaction(deviceId, token, limit = 5, transactionTypes = ['TRANSFER', 'EXTERNAL TRANSFER']) {
    this.API_OVO_BASE_URL.defaults.headers['Device-Id'] = deviceId;
    this.API_OVO_BASE_URL.defaults.headers['Authorization'] = token;
    const typesParam = transactionTypes.map(type => `transaction_type=${encodeURIComponent(type)}`).join('&');
    try {
      const response = await this.API_OVO_BASE_URL.get(`wallet/transaction/last?limit=${limit}&${typesParam}`);
      return response.data;
    } catch (error) {
   
     return error.message;
    }
  }

  async getOrderHistory(deviceId, token, page = 1, limit = 15, productType = '001') {
    this.AGW_BASEURL.defaults.headers['Device-Id'] = deviceId;
    this.AGW_BASEURL.defaults.headers['Authorization'] = token;
    try {
      const response = await this.AGW_BASEURL.get(`payment/orders/v1/list?page=${page}&limit=${limit}&productType=${productType}`);
      return {
        complete : response.data.data.orders[0].complete,
      pending : response.data.data.orders[0].pending}
    } catch (error) {
   
     return error.message;
    }
  }
}


module.exports = getBalance;
