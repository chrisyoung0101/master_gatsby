// This is not React but regular JS and HTML

// require the nodemailer
const nodemailer = require('nodemailer');

// takes an object with two properties as arg
function generateOrderEmail({ order, total }) {
  return `<div>
  <h2>Your recent order for ${total}</h2>
  <p>Please start walking over, we will have your order ready in the next 20 mins.</p>
  <ul>
    ${order
      .map(
        (item) => `<li>
      <img src="${item.thumbnail}" alt="${item.name}"/>
      ${item.size} ${item.name} - ${item.price}
    </li>`
      )
      .join(
        ''
      )} /*join() with nothing removes the comma showing on the webpage but doesn't remove this comment :0{}  */
  </ul>
  <p>Your total is <strong>$${total}</strong></p>
  <style>
      ul {
        list-style: none;
      }
  </style>
  </div>`;
}

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
  // Inside here we add all of the authentication variables that we need to connect.
  // //Normally we'd sign up for a transactional email service that sends "one-off" emails
  // //for you.  Postmark, sendgrid are recommended. You sign up and get a username and password
  // //so that you can send a transactional email with the service.
  // For us, we will use ethereal.email which was created by the nodemailer folks.
  // // This is great for developing as it is a temporary email testing account.

  // just go to ethereal.email and create an account & you get the code below - no sign up
  //   Name	Jose Russel
  //   Username	jose.russel@ethereal.email (also works as a real inbound email address)
  //   Password	MurnnsEwXDVsJXkU4a
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

//  load testing
function wait(ms = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

// THE HANDLER FUNCTION = 'exports.handler = async (event, context) => {}'
// this is exports and not export default or export const handler because this is common js and
// //not ES Modules we have to use for now :
exports.handler = async (event, context) => {
  // load testing
  // await wait(5000);
  // parse the string into an object
  const body = JSON.parse(event.body);
  // Check if they filled out the honey pot
  if (body.mapleSyrup) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Gleep glop ERROR 123PeanutButter' }),
    };
  }
  console.log(body);
  // 1. Validate the data coming in is correct
  // // set the required fields to an array :

  const requiredFields = ['email', 'name', 'order'];
  console.log(requiredFields[0]);
  // // loop over each.  If missing any, we send an error back.
  // // normally a forEach() would be good but because we need to return from `async (event, context) => {`
  // // but this would cause a scoping issue. forEach() creates another function scope.  "We can't return
  // //from the inner scope of an outer scope,"  We will use a for of loop instead :
  // // // note : this is checking data coming from the server
  for (const field of requiredFields) {
    console.log(`Checking that ${field} is good`);
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oops! You are missing the ${field} field`,
        }),
      };
    }
  }

  // validate there are items in the order - no empty pizza orders!
  // we are validating server side - at the end of the day we should validate before data goes into a data base

  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Why would you order nothing?!`,
      }),
    };
  }

  // --send an email--
  // When someone visits this serverless functions URL send this email
  // Always use example.com for testing until you get the email you are using- it was created for testing.
  //   // yes, the quotes are like below
  //  Setting to const info allows us to capture the result
  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'New order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });
  console.log(info);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Success' }),
  };
};
