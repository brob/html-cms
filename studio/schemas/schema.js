// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator'

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type'

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: 'default',
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    /* Your types here! */

    {
      title: "About Details",
      name: "about",
      type: "document",
      fields: [
        {
          name: 'title',
          type: 'string'
        },
        {
          name: 'fullName',
          title: 'Full Name',
          type: 'string'
        },
        {
          name: 'bio',
          title: 'Biography',
          name: 'content',
          type: 'array',
          of: [
            {
              type: 'block'
            }
          ]
        },
        {
          name: 'externalLinks',
          title: 'Social media and external links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'text', title: 'Link text', type: 'string'},
                { name: 'href', title: 'Link url', type: 'string'}
              ]
            }
          ]
        }
      ]
    }
  ])
})
