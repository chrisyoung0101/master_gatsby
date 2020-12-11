// Takes in two args and returns an object
exports.handler = async (event, context) => {
  console.log(event);
  return {
    statusCode: 200,
    body: 'Hello!!',
  };
};

// In order to visit hello.js we go to :
//  localhost:8888/.netlify/functions/hello
// Restart the build if there are issues.
