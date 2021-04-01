import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import styled from "@emotion/styled";
import axios from "axios";
import Row from "./prebuilt/Row";
import CheckoutError from "./prebuilt/CheckoutError";
import Grid from "@material-ui/core/Grid";
import MaterialButton from "./prebuilt/MaterialButton";
import ConfirmationForm from "../components/prebuilt/ConfirmationForm";
import ReviewOrder from "../components/prebuilt/ReviewOrder";
import translate from "./i18n/translate";
import moment from "moment";
import Numeral from "numeral";
import {
  checkUserAccount,
  createPrice,
  createSubscription,
} from "../utils/CheckoutHelpers";

axios.defaults.headers.common.Authorization = process.env.STRIPE_API_AUTH_TOKEN;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

const now = moment().format("LLLL");

const CardElementContainer = styled.div`
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;

  & .StripeElement {
    width: 100%;
  }
`;

const CheckoutForm = ({
  cart,
  onSuccessfulCheckout,
  handleBack,
  billingDetails,
  errors,
}) => {
  const [isProcessing, setProcessingTo] = useState(false);
  const [checkoutError, setCheckoutError] = useState();
  const [cardEntryStatus, setCardEntryStatus] = useState();
  const stripe = useStripe();
  const elements = useElements();
  const payAmount = Numeral(cart.valueOptions[cart.value].amount).value() * 100;
  const displayAmount = cart.valueOptions[cart.value].value;

  // TIP
  // use the cardElements onChange prop to add a handler
  // for setting any errors:

  const description = () => {
    if (cart.honoreeCheck) {
      return `This donation was made ${cart.honoreeType.split("_").join(" ")}
              of ${
                cart.honoreeFirstName + " " + cart.honoreeLastName
              } on ${now}.
              Honoree Email: ${cart.honoreeEmail}
              Subscription: ${cart.subscription}`;
    } else {
      return `This donation was made on ${now}.
              Subscription: ${cart.subscription}`;
    }
  };

  const handleCardDetailsChange = (ev) => {
    ev.error ? setCheckoutError(ev.error.message) : setCheckoutError();
    ev.complete ? setCardEntryStatus(ev.complete) : setCardEntryStatus();
  };

  const handleFormSubmit = async (ev) => {
    ev.preventDefault();

    setProcessingTo(true);

    // THIS DISABLES THE CONNECTION TO STRIPE AND SIMULATES SUCCESS
    onSuccessfulCheckout("1234");

    // Card Element
    // const cardElement = elements.getElement("card");

    // try {
    //   // Create Token
    //   const token = await stripe.createToken(cardElement);

    //   // Check for existing account & create if none exists
    //   const { data: customer } = await axios.post(
    //     "/api/stripe-donate/customers",
    //     {
    //       email: billingDetails.email,
    //       name: billingDetails.name,
    //       phone: billingDetails.phone,
    //       address: billingDetails.address,
    //       source: token.token.id,
    //     }
    //   );

    //   if (customer.error) {
    //     setCheckoutError(customer.error.code);
    //     setProcessingTo(false);
    //     return;
    //   }

    //   const paymentMethodReq = await stripe.createPaymentMethod({
    //     type: "card",
    //     card: cardElement,
    //     billing_details: billingDetails,
    //   });

    //   if (paymentMethodReq.error) {
    //     setCheckoutError(paymentMethodReq.error.code);
    //     setProcessingTo(false);
    //     return;
    //   }

    //   // Handle Payments
    //   if (cart.subscription === false) {
    //     const { data: clientSecret } = await axios.post(
    //       "/api/stripe-donate/payment_intents",
    //       {
    //         amount: payAmount,
    //         currency: cart.currency,
    //         receipt_email: billingDetails.email,
    //         customer: customer,
    //         description: description(),
    //       }
    //     );

    //     const { error, paymentIntent } = await stripe.confirmCardPayment(
    //       clientSecret,
    //       {
    //         payment_method: paymentMethodReq.paymentMethod.id,
    //       }
    //     );

    //     if (error) {
    //       setCheckoutError(error.code);
    //       setProcessingTo(false);
    //       return;
    //     }
    //     onSuccessfulCheckout(paymentIntent);
    //   }

    //   // Handle Plan Creation and Subscription
    //   if (cart.subscription === true) {
    //     // create plan
    //     const price = await createPrice(payAmount, cart.currency);
    //     // create subscription
    //     const { data: subscription } = await axios.post(
    //       "/api/stripe-donate/subscriptions",
    //       {
    //         customer: customer,
    //         price: price,
    //         paymentMethod: paymentMethodReq.paymentMethod.id,
    //         description: description(),
    //       }
    //     );

    //     if (subscription.error) {
    //       setCheckoutError(subscription.error.code);
    //       setProcessingTo(false);
    //       return;
    //     }
    //     onSuccessfulCheckout(
    //       subscription.latest_invoice.payment_intent.charges.data[0]
    //     );
    //   }
    // } catch (err) {
    //   setCheckoutError(err);
    // }
  };

  // Card iframe
  const iframeStyles = {
    base: {
      color: "#000",
      fontSize: "18px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
      iconColor: "#000",
      "::placeholder": {
        color: "#87bbfd",
      },
    },
    invalid: {
      iconColor: "#FFC7EE",
      color: "#FFC7EE",
    },
    complete: {
      iconColor: "#cbf4c9",
    },
  };

  const cardElementOpts = {
    iconStyle: "solid",
    style: iframeStyles,
    hidePostalCode: true,
  };

  const formStyle = {
    width: "100%",
  };

  return (
    <form onSubmit={handleFormSubmit} style={formStyle}>
      <ReviewOrder amount={displayAmount} subscription={cart.subscription} />
      <ConfirmationForm />
      <Row>
        <CardElementContainer>
          <CardElement
            options={cardElementOpts}
            onChange={handleCardDetailsChange}
          />
        </CardElementContainer>
      </Row>
      {checkoutError && (
        <CheckoutError>{translate(`${checkoutError}`)}</CheckoutError>
      )}
      <Grid container>
        <MaterialButton
          onClick={handleBack}
          text={translate("back")}
          color="flat"
          width="50"
        />
        <MaterialButton
          type="submit"
          disabled={isProcessing || !stripe || !cardEntryStatus}
          text={
            isProcessing
              ? translate("processing")
              : translate("process_amount", { amount: displayAmount })
          }
          color="blue"
          width="50"
        />
      </Grid>
    </form>
  );
};

export default CheckoutForm;
