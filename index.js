var fs = require('fs');
var Handlebars = require('handlebars');
const client = require('./utils/SanityClient')
const blocksToHtml = require('@sanity/block-content-to-html')


async function getSanityData() {
    const query = `{
        "streamData": *[_type=='details' && streamDate <= now()]{
            _id,
            title,
            description,
            streamDate
        },
        "about": *[_type == 'about'][0]
    }`
    let data = await client.fetch(query);

    data.about.content = blocksToHtml({
        blocks: data.about.content
    })
    console.log(data)

    return await data
}



async function render(filename)
{
  fs.writeFileSync('./dist/index.html', '')
  var source   = fs.readFileSync(filename,'utf8').toString();
  var template = Handlebars.compile(source);
  const data = await getSanityData();
  var output = await template(data);

  fs.writeFile('./dist/index.html', output, function (err) {
    if (err) return console.log(err);
    console.log('index.html created');
});

}

render('./src/index.html');





