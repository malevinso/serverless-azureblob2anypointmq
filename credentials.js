const credentials = require('./lib/credentials.js');

module.exports.handler = async function(context, req) {
  try {
    const anyPointCredentails = await credentials.getCredentials();
    context.res = {
      body: {
        anyPointCredentails
      }
    };
  }
  catch(err) {
        context.res =  {
        status: 400,
        body: "Error when trying to get credentials"
    }
  }
  context.done(null, context.res);
};
