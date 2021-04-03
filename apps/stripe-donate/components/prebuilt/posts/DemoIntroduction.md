# Stripe Integration

## This demo is a basic example of how we integrate Stripe into an application. This example can be scaled up or down and modified to meet the needs of the client.

## **_NOTE: If you choose to demo the checkout process, please use a Stripe designated sample credit card number: `4242 4242 4242 4242`. This number is not associated with a real credit card. It is a [Stripe provided number](https://stripe.com/docs/testing) to test the application._**

# Primary Features

- **Stripe Integration:** Stripe functionality is woven throughout this demo. This includes api connections to update "Payment Intents", "Customer" data, "Subscriptions" or "Continous Payments", and "Invoice" creation. All data is stored within your own personal or Corporate Stripe account.
- **Language Translations:** This demo contains translations from English to italian, french, german, arabic, russian, chinese simplified, and spanish. This includes a custom module capable of handling more translations as needed.
- **Currency Conversions:** All static amounts can be converted to a mulititude of different currencies. This currency is saved to your Stripe profile and used during yopur purchase/donation.

# Process Flow

There are three primary stages within this demo:

1. **Amounts:** Select or Enter the amount you wish to pay/donate
2. **Billing:** Enter your billing information
3. **Confirmation and Checkout:** Confirm your payment intent and complete your payment/donation

# Possible Use Cases and Benefits

There are a myriad of possible uses for a smart form such as this. This form can be embedded into another site's page or it can be stand alone. It can be designed for mobile and modified per your organization's need. The underlying code is what is important here, the design used for this demo is a generic implamentation and should not be considered "all that is possible". This can be designed however you need. This solution is also "detached" from your website's code base. The benefits to a solution built separate from your web page is it can updated without interupting or interfearing with your core web site's involvement, thus negating any need to integrate this code intop prexisting code.
