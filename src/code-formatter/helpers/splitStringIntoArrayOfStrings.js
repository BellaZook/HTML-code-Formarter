
const splitStringIntoArrayOfStrings = (str) => {
    return str.split(/(?:\r|\n|\r\n)/g);
}

export default splitStringIntoArrayOfStrings;