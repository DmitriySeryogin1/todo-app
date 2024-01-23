import fs from 'fs';

export const getDataFromFile = () => {
    const data = JSON.parse(fs.readFileSync("data.json"));

    return data
}