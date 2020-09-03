const sanityClient = require('@sanity/client');
const client = sanityClient({
    projectId: '4fs6x5jg',
    dataset: 'production',
    useCdn: true 
  })

module.exports = client;