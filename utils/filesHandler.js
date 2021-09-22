const fs = require("fs");
const path = require("path");

const { SERVER_URL } = require("../config");

// Handle write list of manga pages
exports.writeMangaPages = async (files, mangaCode) => {
    var pages = [];
    var fileCount = 1;

    createMangaDirectory(mangaCode);

    for (let promise of files) {
        // Await upload
        let file = await promise;

        // Write file and get back fileURL
        const fileURL = await writeFile(file, mangaCode, fileCount);

        // Create page obj
        const page = {
            pageNumber: fileCount,
            pageSrc: fileURL,
        };

        pages.push(page);

        fileCount++;
    }

    return pages;
};

exports.writeAvatar = async (
    { filename, mimetype, encoding, createReadStream },
    fileName
) => {
    try {
        createAvatarDirectory();

        const stream = createReadStream();

        const pathname = path.join(__dirname, `../static/users/${fileName}`);

        await stream.pipe(fs.createWriteStream(pathname));

        return `${SERVER_URL}/avatar/${fileName}`;
    } catch (err) {
        console.log(err);
    }
};

exports.deleteMangaDir = (mangaCode) => {
    fs.rmSync(`static/mangas/${mangaCode}`, { recursive: true });
};

exports.deleteAvatar = (fileName) => {
    fs.unlinkSync(`static/users/${fileName}`);
};

// Write a manga page
async function writeFile(
    { filename, mimetype, encoding, createReadStream },
    mangaCode,
    fileCount
) {
    try {
        const stream = createReadStream();

        const pathname = path.join(
            __dirname,
            `../static/mangas/${mangaCode}/${fileCount}.jpg`
        );

        await stream.pipe(fs.createWriteStream(pathname));

        return `${SERVER_URL}/g/${mangaCode}/${fileCount}.jpg`;
    } catch (err) {
        console.log(err);
    }
}

// Create directory if not exist
function createMangaDirectory(mangaCode) {
    if (!fs.existsSync(`static/mangas/${mangaCode}`)) {
        fs.mkdirSync(`static/mangas/${mangaCode}`, { recursive: true });
    }
}

function createAvatarDirectory() {
    if (!fs.existsSync(`static/users`)) {
        fs.mkdirSync(`static/users`, { recursive: true });
    }
}
