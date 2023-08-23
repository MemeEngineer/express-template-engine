const express = require('express')
const fs = require('fs')

//create app
const app = express();
const port = 3000;

//App template engine definition
app.engine('madeline', (filePath, options, callback)=>{
    fs.readFile(filePath, (err, content)=> {
        //check if there was an error reading the file
        if(err) return callback(err);

        const rendered = content.toString()
        .replace('#title#', '<title>' + options.title + '</title>')
        .replace('#message#', '<h1>'+ options.message + '</h1>')
        .replace('#content#', '<div' + options.content + '</div>')

        console.log(rendered)
        return callback(null, rendered)
    })
})

//app config
app.set('views', './views') //specify the views directory
app.set('view engine', 'madeline') // register the hypatia view engine

// routes
app.get('/', (req, res)=> {
    res.render('template', {title:'hello world', message: "first template engine", content:" Node.js and Express"})
})
app.get('/about-me', (req, res)=> {
    res.render('template', {title:'dev', message: "I love coding", content:" code guru"})
})

app.listen( port, () => {
    console.log(`Server running on port: ${port}`)
})