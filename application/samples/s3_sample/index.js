require("dotenv").config()
const path = require("path")

const express = require("express")
const {EntityS3Files} = require("../../server/services/storage")
const port = parseInt(process.env.PORT)||3000;



const start = async () => {
    


    const app = express();

    app.use(express.json());
    app.get("/api/getUrl/:fileName", async (req, res) =>{
        const file_name = req.params.fileName;
        const entityFiles = new EntityS3Files({entity_id: 1, entity_type:"user"});
        const {upload_url, key, content_type} = await entityFiles.get_file_upload_url("profilePhoto", file_name)
        console.log(file_name)
        const download_url = await entityFiles.get_file_download_url("profilePhoto")
        
        
       
        res.send(JSON.stringify({
            uploadURL: upload_url,
            downloadURL: download_url,
            contentType: content_type,
            key:key
          }))
    })
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "./uploadfile.html"))
    });

    

    app.listen(port, () => {
        console.log("Server is running on port ", port)
    });
}
start();