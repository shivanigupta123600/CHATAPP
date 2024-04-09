const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const multer = require('multer');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Set up Multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Socket.io handling
io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  // Handle file upload
  socket.on('file-upload', (data) => {
    // Broadcasting the file to all connected clients
    io.emit('file-download', data);
  });
});

// Handling file uploads using Express and Multer
app.post('/upload', upload.single('file'), (req, res) => {
  const fileData = {
    fileName: req.file.originalname,
    fileType: req.file.mimetype,
    fileBuffer: req.file.buffer.toString('base64'),
  };

  // Emit the file data to all connected clients
  io.emit('file-download', fileData);

  res.status(200).send('File uploaded successfully');
});

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
