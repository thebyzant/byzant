export const Faq = () => {
  return (
    <>
      <div className="flex justify-center w-full bg-secondary p-8 mx-auto">
        <div className="max-w-2xl grid gap-4">
          {faqdata.map((item, index) => (
            <div key={index}>
              <div className="collapse collapse-arrow bg-base-100">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">{item.question}</div>
                <div className="collapse-content">
                  <p>{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="flex flex-col items-center">
            <a href="https://docs.thebyzant.com" className="underline underline-offset-2">
              <button className="btn btn-primary">Find out more</button>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

const faqdata = [
  {
    question: "How is the fixed exchange rate calculated",
    answer:
      "The Byzant will first be exchangable to U.S. Dollar equivalents USDC and USDT at a rate of 1.4046 USD to 1 BYZ. The exchange rate is based upon a. economic output b. amount of money in circulation and c. factors to incentivize higher economic output and lower amount of money in circulation.",
  },
  {
    question: "What is the worst case scenario?",
    answer:
      "Since all BYZ are fully backed by a central bank issued currency, focusing on U.S. Dollar at launch, the worst case will be that 1 BYZ which is worth 1.4046 USD will reduce its value and be equal to 1 USD.",
  },
  {
    question: "Will you add other currencies?",
    answer:
      "Yes. We intend to establish and mimic a currency basket that is comparable to the Special Drawing Rights basket established by the IMF. The focus will be on the most used and accepted currencies globally.",
  },
  {
    question: "How can I earn yield?",
    answer:
      "We recommend that users exchange their USDC or USDT to BYZ and stake the BYZ to receive yield-bearing BYS. All U.S. Dollars will be invested into money market funds such as the Vanguard Federal Money Market Fund which currently has a 5.25% 7 day SEC yield. The rewards will be distributed daily to all BYS holders. Since BYS and BYZ are interchangeble and fixed to the USD, it allows you to use a yield bearing Stablecoin to execute other trading, lending etc. strategies.",
  },
  {
    question: "Who is behind this project?",
    answer:
      "For a variety of reasons, the people behing the Byzant want to stay anonymous. The project already belongs to a DAO and the governance will gradually be decentralized.",
  },
];
