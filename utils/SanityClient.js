const sanityClient = require('@sanity/client');
const client = sanityClient({
    projectId: '4fs6x5jg',
    dataset: 'production',
    token: process.env.SANITY_KEY, // or leave blank to be anonymous user
    useCdn: true 
  })

module.exports = client;