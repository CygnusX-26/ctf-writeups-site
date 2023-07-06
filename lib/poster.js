import fs from 'fs';
import parseMD from 'parse-md';
import showdown from 'showdown';
import path from 'path';
    

export function getAllWriteups() {
    const __PATH = "writeups"
    let writeups = [];
    var files = fs.readdirSync(__PATH);
    let sortedFiles = files
    .map((file) => ({
      name: file,
      createdAt: fs.statSync(path.join(__PATH, file)).birthtimeMs,
    }))
    .sort((a, b) => a.createdAt - b.createdAt);
    sortedFiles = sortedFiles.reverse();
    for (var i = 0; i < sortedFiles.length; i++) {
        if (sortedFiles[i].name.endsWith(".md")) {
            writeups[i] = {
                params: {
                    id: sortedFiles[i].name.replace(".md", "")
                }
            }
        }
    }
    return writeups;
}

export function getWriteupData({id}) {
    const fileContents = fs.readFileSync(`writeups/${id}.md`, 'utf8');
    var { metadata, content } = parseMD(fileContents);
    metadata.date = metadata.date ? new Date(metadata.date).toLocaleDateString() : "";
    metadata.author = metadata.author ? metadata.author : "";
    metadata.title = metadata.title ? metadata.title : "";
    metadata.image = metadata.image ? metadata.image : "default.svg";
    let converter = new showdown.Converter();
    content = converter.makeHtml(content);
    return {
        id,
        metadata,
        content
    }
}

export function getWriteupImages() {
    const __PATH = "writeups"
    let writeups = [];
    var files = fs.readdirSync(__PATH);
    let sortedFiles = files
    .map((file) => ({
      name: file,
      createdAt: fs.statSync(path.join(__PATH, file)).birthtimeMs,
    }))
    .sort((a, b) => a.createdAt - b.createdAt);
    sortedFiles = sortedFiles.reverse();
    for (var i = 0; i < files.length; i++) {
        if (sortedFiles[i].name.endsWith(".md")) {
            writeups[i] = {
                id: sortedFiles[i].name.replace(".md", ""),
                image: getWriteupData({id: sortedFiles[i].name.replace(".md", "")}).metadata.image
            }
        }
    }
    return writeups;
}