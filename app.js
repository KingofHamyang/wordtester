const express = require("express");
const bodyParser = require("body-parser");
const morgan = require('morgan')
const fs = require('fs');

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(morgan("dev"))
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('main')
})

app.get('/wordparser', (req, res) => {
    var fs = require('fs');
    var array = fs.readFileSync('wordpool.txt').toString().split("\n");
    var cnt = 0;
    var wordcnt = new Array();
    var wordspace = new Array();

    for (i in array) {
        wordcnt[i] = 0;

        cnt++;
    }

    for (var i = 0; i < req.query.number; i++) {
        var index = (Math.floor(Math.random() * (cnt + 1)));
        if (wordcnt[i] != 0) {
            i--;
            continue;
        } else {
            wordcnt[i] = 1;
            wordspace.push(array[index])
        }
    }
    for (i in wordspace) {

        console.log(wordspace[i]);

    }
    console.log(wordspace.length)
    console.error(req.query.number)

    res.render('wordparser', {
        worddata: wordspace,
        cnt: req.query.number
    })
})






app.listen(3002, () => {

    console.log('express is running on port 3002');
})