import React from "react";
import FAQDropdown from "../../FAQDropdown";

export default function CheckoutFAQ({
  type,
  colour
}: {
  type: "prepaidCard" | "giftCard";
  colour: string,
}) {
  return (
    <div className="flex flex-col gap-y-1 w-full" id={`${type}FAQ`}>
      <div className="text-lg mb-4 mt-5">
        {type == "prepaidCard" && "Prepaid Card"}
        {type == "giftCard" && "Gift Card"} FAQs
      </div>

      {type == "prepaidCard" &&
        prepaidFAQ.map((item, ref) => (
          <FAQDropdown question={item.question} answer={item.answer} colour={colour} key={ref}/>
        ))}
        {type == "giftCard" &&
        giftCardFAQ.map((item, ref) => (
          <FAQDropdown question={item.question} answer={item.answer} colour={colour} key={ref}/>
        ))}
    </div>
  );
}

const prepaidFAQ = [
  {
    question: "How does the card work? ",
    answer: (
      <span>
        You will receive the QR code once you have purchased the card. Simply
        show the QR code to the cafe to redeem your drink. <br />
        <br />
        You will also receive an email with the same for safe keeping.
      </span>
    ),
  },
  {
    question: "How long do I have to claim all the drinks?",
    answer: (
      <span>The QR codes do not expire and can be claimed at any point.</span>
    ),
  },
  {
    question: "What about if I want any additions?",
    answer: (
      <span>
        Any extras such as alternative milks will be charged at cost by the
        shops.
      </span>
    ),
  },
  {
    question: "Further info?",
    answer: <span>Please contact info@coffee-culture.uk</span>,
  },
];

const giftCardFAQ = [
  {
    question: "When will my recipient get it? ",
    answer: (
      <span>
        We will provide a link for you to send to the recipient, containing a
        digital card with your special message!
      </span>
    ),
  },
  {
    question: "How does my recipient redeem it?",
    answer: (
      <span>
        Upon click the link, they will be prompted to enter their email and will
        receive a QR code to scan in store to claim free drinks.
        <br />
        <br />
        The QR is valid for one year after redemption.
      </span>
    ),
  },
  {
    question: "Further info? ",
    answer: <span>Please contact info@coffee-culture.uk</span>,
  },
];
