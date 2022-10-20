const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Behold The MEVN Stack!',
    });
});

app.get('/file/:page', (req, res) => {
    let page = req.params.page;
    console.log(`test_page :`, page)
        //Read a file from the file system
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, 'pages', page + '.md');
    try {
        if (fs.existsSync(filePath)) {
            fs.readFile(filePath, { encoding: 'utf-8' }, function(err, data) {
                if (err) {
                    console.log(err);
                }
                res.json({
                    message: data,
                    exist: true
                });
            });
        } else {
            res.json({
                message: `404 : ${page} n'est pas créee`,
                exist: false
            });
        }
    } catch (err) {
        console.error(err)
    }

});

app.post('/file', (req, res) => {
    console.log(req.body) //undefined
        //Write a file to the file system
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, 'pages', req.body.name + '.md');
    try {
        if (fs.existsSync(filePath)) {
            res.json({
                message: `404 : ${req.body.name} existe deja`,
                exist: true
            });
        } else {
            fs.writeFileSync(filePath, req.body.content, function(err) {
                if (err) {
                    console.log(err);
                }
                res.json({
                    message: `200 : ${req.body.name} a été créee`,
                    exist: true
                });
            });
        }
    } catch (err) {
        console.error(err)
    }
    res.end("Success")
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});