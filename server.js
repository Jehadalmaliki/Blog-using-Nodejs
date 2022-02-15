const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload');
const router=express.Router();

let initial_path = path.join(__dirname, "public");

const app = express();
app.use(express.static(initial_path));
app.use(fileupload());


app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, "home.html"));
})
app.get('/home', (req, res) => {
    res.sendFile(path.join(initial_path, "home.html"));
})

app.get('/editor', (req, res) => {
    res.sendFile(path.join(initial_path, "editor.html"));
})
app.get('/login', (req, res) => {
    res.sendFile(path.join(initial_path, "login.html"));
})
app.get('/admin', (req, res) => {
    res.sendFile(path.join(initial_path, "login.html"));
})
app.get('/admin?role=admin', (req, res) => {
    res.sendFile(path.join(initial_path, "admin.html"));
})
app.get( '/',router);
app.get( (req, res) => {
    res.sendFile(path.join(initial_path, "404.html"));
})

// upload link
app.post('/upload', (req, res) => {
    let file = req.files.image;
    let date = new Date();
    // image name
    let imagename = date.getDate() + date.getTime() + file.name;
    // image upload path
    let path = 'public/uploads/' + imagename;

    // create upload
    file.mv(path, (err, result) => {
        if(err){
            throw err;
        } else{
            // our image upload path
            res.json(`uploads/${imagename}`)
        }
    })
})

app.get("/:blog", (req, res) => {
    res.sendFile(path.join(initial_path, "blog.html"));
})

app.use((req, res) => {
    res.json("404");
})

app.listen("3000", () => {
    console.log('listening......');
})