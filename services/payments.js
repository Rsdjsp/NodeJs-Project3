const request = require("request");
const {
  stripe_sk,
  enpoint_sct,
  paypal_cid,
  paypal_cs,
} = require("../config/index");

const stripe = require("stripe")(stripe_sk);
const endpointSecret = enpoint_sct;
const base = "https://api-m.sandbox.paypal.com";
const auth = { user: paypal_cid, pass: paypal_cs };

class Payments {
  async createIntent(amount) {
    const intent = await stripe.paymentIntents.create({
      amount: amount ? amount : 100,
      currency: "usd",
      payment_method_types: ["card"],
    });
    return intent.client_secret;
  }

  async createEvent(body, sign) {
    let event;
    try {
      event = await stripe.webhooks.constructEvent(body, sign, endpointSecret);

      if (event.type === "payment_intent.succeeded") {
        return { success: true };
      } else {
        return { success: true };
      }
    } catch (err) {
      return { success: false, message: `Webhook Error: ${err.message}` };
    }
  }
  // Paypal

  async createPayment(res) {
    const body = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD", //https://developer.paypal.com/docs/api/reference/currency-codes/
            value: "115",
          },
        },
      ],
      application_context: {
        brand_name: `Ecommerce`,
        landing_page: "NO_PREFERENCE", // Default, para mas informacion https://developer.paypal.com/docs/api/orders/v2/#definition-order_application_context
        user_action: "PAY_NOW", // Accion para que en paypal muestre el monto del pago
        return_url: `http://localhost:4000/api/payments/execute-payment`, // Url despues de realizar el pago
        cancel_url: `http://localhost:000/cancel-payment`, // Url despues de realizar el pago
      },
    };
    //https://api-m.sandbox.paypal.com/v2/checkout/orders [POST]

    request.post(
      `${base}/v2/checkout/orders`,
      {
        auth,
        body,
        json: true,
      },
      (err, response) => {
        res.json({ data: response.body });
      }
    );
  }

  async executePayment(req, res) {
    const token = req.query.token;

    request.post(
      `${base}/v2/checkout/orders/${token}/capture`,
      {
        auth,
        body: {},
        json: true,
      },
      (err, response) => {
        res.json({ data: response.body });
      }
    );
  }
}

module.exports = Payments;
