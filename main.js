const fetch = require('node-fetch');
const credentials = require('./lib/credentials.js');
const anypointmq = require('./lib/anypointmq.js');

module.exports = async function (context, blob) {
    try {
    const credentialsResponse = await fetch(process.env.credentialsURL);
    const anypointCredentials = await(credentialsResponse.json());
    context.log('credentials ', anypointCredentials);
    const response = await anypointmq.putMessage(JSON.parse(anyPointCredentails), 
            {
  "body": "{\"container\": \"xom\",\"fileName\":\""+ context.bindingData.name + "\"}"
            }
        );
    context.log(response);
    } catch(err) {
        context.log('Error ', err);
    }
    
    //context.log(Object.getOwnPropertyNames(context.bindingData.metadata));
    //context.log("JavaScript blob trigger function processed blob \n Name:", context.bindingData.name, "\n Blob Size:", blob.length, "Bytes");
};