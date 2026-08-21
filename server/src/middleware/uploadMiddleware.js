import multer from "multer";

const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
        const allowedMimeTypes = [
            "image/jpeg",
            "image/png",
            "image/webp",
            "video/mp4",
            "video/webm"
        ];

        if(allowedMimeTypes.includes(file.mimetype)) cb(null, true);
        else cb(new Error("Invalid file type"), false)
    },
    limits: {
        fileSize: 5*1024*1024
    }
    
});

export default upload;