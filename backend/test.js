const express = require('express');
const multer = require('multer');
const IPFS = require('ipfs-http-client');

const app = express();
const ipfs = new IPFS({ host: 'localhost', port: '5001', protocol: 'http' });

// Multer middleware to handle file uploads
const upload = multer({ dest: 'uploads/' });

// Serve static files
app.use(express.static('public'));

// Handle file upload
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    const fileHash = await addFileToIPFS(file.path);
    res.send(`File uploaded successfully. IPFS hash: ${fileHash}`);
  } catch (error) {
    console.error('Error uploading file to IPFS:', error);
    res.status(500).send('Error uploading file to IPFS.');
  }
});

// Function to add file to IPFS
async function addFileToIPFS(filePath) {
  const fileContent = fs.readFileSync(filePath);
  const filesAdded = await ipfs.add({ content: fileContent });
  return filesAdded[0].hash;
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
