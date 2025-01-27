export default {
    randomHex: (length) => {
        return [...Array(length)].map(() => Math.floor(Math.random() * 16).toString(16)).join('')
    },

    makeStringSafe: (str) => {
        str = str.replace(/'/g, "''");
        str = str.replace(/"/g, '"');
        str = str.replace(/`/g, "`");
        str = str.replace(/\\/g, "\\\\");
      
        return str;
    }
}