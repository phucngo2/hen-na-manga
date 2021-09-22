const cloudinary = require("cloudinary").v2;

const {
    CLOUDINARY_HOST,
    CLOUDINARY_KEY,
    CLOUDINARY_SECRET,
} = require("../config");

cloudinary.config({
    cloud_name: CLOUDINARY_HOST,
    api_key: CLOUDINARY_KEY,
    api_secret: CLOUDINARY_SECRET,
});

// Handle write list of manga pages
exports.writeMangaPages = async (files, mangaCode) => {
    var fileCount = 0;

    const resCloudinary = await Promise.all(
        files.map(async (promise) => {
            let file = await promise;
            return writeFile(file, mangaCode);
        })
    );

    const res = resCloudinary.map((item) => {
        fileCount++;
        return {
            pageNumber: fileCount,
            pageSrc: item.secure_url,
        };
    });

    return res;
};

exports.writeAvatar = async (file) => {
    const resCloudinary = await writeFileAvatar(file);

    return resCloudinary.secure_url;
};

exports.deleteMangaDir = async (mangaCode) => {
    await cloudinary.api.delete_resources_by_prefix(`mangas/${mangaCode}`);
};

exports.deleteAvatar = async (fileName) => {
    const fileId = fileName.split(".")[0];
    await cloudinary.uploader.destroy(`users/${fileId}`);
};

const writeFile = async (file, mangaCode) => {
    return new Promise(async (resolve, reject) => {
        const upload_stream = cloudinary.uploader.upload_stream(
            {
                folder: `mangas/${mangaCode}`,
            },
            (error, result) => {
                if (error) return reject(error);
                return resolve(result);
            }
        );

        await file.createReadStream().pipe(upload_stream);
    });
};

const writeFileAvatar = async (file) => {
    return new Promise(async (resolve, reject) => {
        const upload_stream = cloudinary.uploader.upload_stream(
            {
                folder: `users`,
            },
            (error, result) => {
                if (error) return reject(error);
                return resolve(result);
            }
        );

        await file.createReadStream().pipe(upload_stream);
    });
};
