const express = require('express');
const multer = require('multer');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const config = require('./config/config')
const db = require('./config/db')
const ipfsAPI = require('ipfs-api');
const fs = require('fs');
const { Report } = require('./models/medicalReport.model');

const mongoose = require('mongoose');
const bodyParser = require('body-parser'); 
const {FormDataModel} = require('./models/formData.model')
const cors = require('cors');
const { Emergency } = require('./models/emergency.model');

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json())

const ipfs = ipfsAPI('localhost', '5001', {protocol: 'http'})

app.use(bodyParser.json());
// Configure AWS SDK with your credentials
const s3 = new AWS.S3({
  accessKeyId: '',
  secretAccessKey: '',
});

// Configure multer to handle multipart/form-data
const upload = multer({
  storage: multer.memoryStorage(),
});

// Define route for uploading photos
app.post('/upload', upload.single('photo'), (req, res) => {
  const photo = req.file;
  console.log(photo);
  if (!photo) {
    return res.status(400).send('No photo uploaded.');
  }

  const key = `${uuidv4()}-${photo.originalname}`;

  // Upload photo to S3
  s3.upload({
    Bucket: 'uco-bank-templates',
    Key: key,
    Body: photo.buffer
  }, async(err, data) => {
    if (err) {
      console.error('Error uploading photo to S3:', err);
      return res.status(500).send('Error uploading photo to S3.');
    }
    const mdata = {
        url : data.Location
    }
    const response = await fetch('http://127.0.0.1:5000/compare_faces', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Specify the content type as JSON
            },
            body: JSON.stringify(mdata),
          });

          if (response.ok) {
            const responseData = await response.json();
            console.log("My data", responseData);
            const myEmerData = responseData
            console.log(myEmerData);
            const emergencyData = new Emergency({
              name : myEmerData.message.name,
              phoneNumber :  myEmerData.message.phone,
              bloodGroup :  myEmerData.message.blood_group
            })
            await emergencyData.save()
            responseData.imgUrl = data.Location
            res.send({imgUrl: data.Location, data: responseData});
        }
    // Return the S3 URL of the uploaded photo
  });
});

app.get('/emergency', async(req, res) => {
  try {
    // Fetch all medical reports from the database
   
    const emergency = await Emergency.find();
    
    // Send the fetched reports as a response
    res.status(200).json(emergency);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching medical reports');
  }
})

app.post('/medicalUpload', upload.single('photo'), (req, res) => {
  const photo = req.file;
  console.log(photo);
  if (!photo) {
    return res.status(400).send('No photo uploaded.');
  }

  const key = `${uuidv4()}-${photo.originalname}`;


  s3.upload({
    Bucket: 'uco-bank-templates',
    Key: key,
    Body: photo.buffer
  }, async(err, data) => {
    if (err) {
      console.error('Error uploading photo to S3:', err);
      return res.status(500).send('Error uploading photo to S3.');
    }   
    res.send({imgUrl: data.Location});
        
  });
})

//Form data
app.post('/form',async(req,res) =>{

  const formData = req.body;
  console.log(formData)

  const newFormData = new FormDataModel(formData);
  await newFormData.save();
  
  res.send('Form data saved successfully!');
})

app.get('/getPatientDetails/:name',async(req,res) =>{

  const name = req.params.name

  try {
    // Fetch all medical reports from the database
    const reports = await FormDataModel.find({fullName : name});
    // Send the fetched reports as a response
    res.status(200).json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching medical reports');
  }
})


//Message route 
const accountSid =process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

app.post('/sendMessage',(req,res) =>{
const client = require('twilio')(accountSid, authToken);
client.messages
  .create({
     body: 'Hello Rohith.. Have a good day..',
     messagingServiceSid: 'MGcf6793dc227bdd386832df67299ee58c',
     to: '+919080111914'
   })
  .then(
      message => console.log(message.sid),
      res.send("sucess")
    );
})



app.post('/submitMedicalReport', async (req, res) => {
  try {
    // Create a new Report object with the data from the request
    console.log(req.body.imageUrl);
    const report = new Report({
      reportName: req.body.reportName,
      hospitalName: req.body.hospitalName,
      referedBy: req.body.referedBy,
      diagnosisPurpose: req.body.diagnosisPurpose,
      verifiedBy: req.body.verifiedBy,
      hash: req.body.imageUrl
    });

    // Save the report to the database
    await report.save();

    res.status(200).send('Report saved successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving report');
  }
});

app.get('/getMedicalReports', async (req, res) => {
  try {
    // Fetch all medical reports from the database
    const reports = await Report.find();
    
    // Send the fetched reports as a response
    res.status(200).json(reports);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching medical reports');
  }
});

app.post('/uploadToIpfs', upload.single('photo'), async (req, res) => {
  try {
    // Create a new Report object with the data from the request
    if(!req.file){
      res.status(200).send('Error');
      return
    }

    const uploadedFile = await ipfs.files.add(req.file.buffer);

    console.log(uploadedFile[0].hash);

    res.status(200).send('Photo uploaded successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving report');
  }
});


db.on('connected', () => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
})

