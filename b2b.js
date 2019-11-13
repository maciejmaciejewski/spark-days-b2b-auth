require('dotenv').config()
const request = require('request-promise').defaults({ resolveWithFullResponse: true })

async function run () {
  const tokenOptions = {
    url: 'https://api.preprod.fusionfabric.cloud/login/v1/sandbox/oidc/token',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: {
      grant_type: 'client_credentials',
      scope: 'openid',
      client_id: process.env.B2B_CLIENT,
      client_secret: process.env.B2B_SECRET
    }
  }

  const tokenResponse = await request(tokenOptions)
  const tokenResponseBody = JSON.parse(tokenResponse.body)

  const apiOptions = {
    url: 'https://api.preprod.fusionfabric.cloud/retail-us/account/v1/consumers/831/accounts',
    method: 'GET',
    headers: {
      Authorization: `${tokenResponseBody.token_type} ${tokenResponseBody.access_token}`
    }
  }

  const apiResponse = await request(apiOptions)
  const apiResponseBody = JSON.parse(apiResponse.body)
  console.table(apiResponseBody)
}

run()
