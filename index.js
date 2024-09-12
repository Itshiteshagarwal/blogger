const express = require("express");
const app = express();
const PORT = 5000;
const connectToMongo = require("./db");
const router = require("./routes/index");
const cors = require('cors')
const multer = require('multer');
const path = require('path');
const Notes = require('./models/Notes')

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
//mongodb connection method
connectToMongo();

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

app.use('/images', express.static('upload/images'));

app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        console.log('No file uploaded');
        return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    console.log('File uploaded successfully:', req.file);
    res.json({
        success: true,
        image_url: `http://localhost:${PORT}/images/${req.file.filename}`,
    });
});



app.use('/api', router)

app.post('/addnote', async (req, res) => {
    try {
        const { title, description, tag, image_url } = req.body;

        if (!title || !description || !tag) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const note = new Notes({
            title,
            description,
            tag,
            image: image_url
        });
        const savedNote = await note.save();

        res.json({
            success: true,
            note: savedNote
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
});


app.listen(PORT, (req,res)=>{
    console.log("server running on port" + PORT)
})

