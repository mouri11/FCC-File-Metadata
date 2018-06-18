'use strict';

var express = require('express');
var cors = require('cors');
var fileUpload = require('express-fileupload');

// require and use "multer"...

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));
app.use(fileUpload());

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

//Handling file uploads
app.post('/api/fileanalyse', function(req,res) {
  if (!req.files) return res.status(400).send('No files were uploaded.');
  
  let upfile = req.files.upfile;
  upfile.mv('./', (err) => {
    if (err) return res.status(500).send(err);
    res.send('File uploaded!');
  });
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
