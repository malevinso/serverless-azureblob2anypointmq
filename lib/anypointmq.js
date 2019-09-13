const fetch = require('node-fetch');
const { URLSearchParams } = require('url');

const authenticate = async (clientId, clientSecret, grantType) => {
  const ANYPOINTMQ_URL = "https://mq-us-east-1.anypoint.mulesoft.com/api/v1/authorize";
  const REQUEST_BODY = new URLSearchParams();

  REQUEST_BODY.append("client_id", clientId);
  REQUEST_BODY.append("client_secret", clientSecret);
  REQUEST_BODY.append("grant_type", grantType);
  
  try {
    const response = await fetch(ANYPOINTMQ_URL, { method: 'POST', body: REQUEST_BODY });
    const token = await response.json();
    if(response.status >=400) throw {"message": "error fetching credentials", error: response};
    return token
  }
  catch(err) {
    throw("problems when trying to access AnypointMQ " + err);
  }
}

const putMessage = async (credentials, content) => {
  const ANYPOINTMQ_URL = "https://mq-us-east-1.anypoint.mulesoft.com/api/v1/organizations/c8bc8df1-2c53-49aa-af09-ff05f3cc2527/environments/bb7a0698-c1cd-4ac3-9ce0-787448423d56/destinations/invoice-exchange/messages/12345zx1213-1213";
  const REQ_HEADERS = { 'Content-Type': 'application/json',
                        'Authorization': "Bearer " + credentials.access_token};
  try {
    const resp = await fetch(ANYPOINTMQ_URL, { method: 'PUT', headers: REQ_HEADERS, body: JSON.stringify(content)});
    if(resp.status == 201) return resp;
    else {
      throw ("Error when sending message to AnypointMQ " + content); 

    }
  } catch(err) {
    throw("Error when trying to send the message to AnypointMQ " + err);
  }

}
exports.authenticate = authenticate;
exports.putMessage = putMessage;