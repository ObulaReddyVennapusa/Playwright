
class APIutils {

apiContext:any;
loginpayload:any;

  constructor(apiContext:any, loginpayload:any) {
    this.apiContext = apiContext;
    this.loginpayload = loginpayload;
  }

  async getToken() {
    const apiResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {
        data: this.loginpayload,
      },
    );
    const reponseBody = await apiResponse.json();
    const token = reponseBody.token;
    return token;
  }

  async createOrder(orderPayload:any) {
    let response = {token: String, finalOrderNumber: String};
    response.token = await this.getToken();

    const orderResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",

      {
        data: orderPayload,
        headers: {
          authorization: response.token,
          "Content-Type": "application/json",
        },
      },
    );
    const orderJson = await orderResponse.json();
    const finalOrderNumber = orderJson.orders[0];
    response.finalOrderNumber = finalOrderNumber;
    return response;
  }
}
module.exports = { APIutils };
