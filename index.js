const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const client = require('./utils/SanityClient')
const blocksToHtml = require('@sanity/block-content-to-html');

function prepare() {
    if (!fs.existsSync('dist')){
        fs.mkdirSync('dist');
    }
}

function getSrcFiles(srcDir) {
    const directory = path.join(__dirname, srcDir);
    let fileList = []
    // fs.readdir()

    return fs.readdirSync(directory, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        files.forEach(function (file) {
            fileList.push(file) 
        });
    });

}


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

function buildHTML(filename, data) {
    const source = fs.readFileSync(filename,'utf8').toString();
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

async function main(src, dist) {
    prepare();
    const data = await getSanityData();
    const html = buildHTML(src, data)
    
    fs.writeFile(dist, html, function (err) {
        if (err) return console.log(err);
        console.log('index.html created');
    });}

main('./src/index.html', './dist/index.html');





