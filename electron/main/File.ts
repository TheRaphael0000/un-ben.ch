import fs from "fs"

const folder = `src/static/dragontail-13.24.1/13.24.1`

class File {
    constructor() {

    }

    fetch(file) {
        let filePath = folder + file
        console.log(filePath)

        try {
            const data = fs.readFileSync(filePath, 'utf8')
            const jsonData = JSON.parse(data)
            return jsonData
        } catch (err) {
            console.error('Error reading or parsing JSON file:', err)
        }
    }
}

export default File