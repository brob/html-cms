const fs = require('fs');
const Handlebars = require('handlebars');
const client = require('./utils/SanityClient')
const blocksToHtml = require('@sanity/block-content-to-html')

async function getSanityData() {
    const query = `{
        "about": *[_type == 'about'][0]
    }`
    let data = await client.fetch(query);
    data.about.content = blocksToHtml({
        blocks: data.about.content
    })
    return await data
}

function buildHTML(source, data) {
    const template = Handlebars.compile(source);
    const output = template(data);

    return output
}

function writeFile(destination, html) {
    fs.writeFile(destination, html, function (err) {
        if (err) return console.log(err);
        console.log('index.html created');
    });
}

async function render(filename) {
    const source = fs.readFileSync(filename,'utf8').toString();
    const data = await getSanityData();
    const html = buildHTML(source, data)
    
    writeFile('./dist/index.html', html)
}

render('./src/index.html');





