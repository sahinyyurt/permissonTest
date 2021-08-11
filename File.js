const RNFS = require('react-native-fs');

// create a path you want to write to
// :warning: on iOS, you cannot write into `RNFS.MainBundlePath`,
// but `RNFS.DocumentDirectoryPath` exists on both platforms and is writable
const path = RNFS.DocumentDirectoryPath + '/';

// Get file stats
const _getFileStats = async fileName => {
  try {
    const stat = await RNFS.stat(path + fileName);
    return stat;
  } catch (err) {
    console.log(
      '🚀 -> file: File.js -> line 32 -> const_getFileStats= -> err',
      err,
    );
    return false;
  }
};

// Create file(encoding can be one of utf8 (default), ascii, base64)
const _createFile = async (fileName, data, encoading) => {
  try {
    const success = await RNFS.writeFile(path + fileName, data, encoading);
    return true;
  } catch (err) {
    console.log(
      '🚀 -> file: File.js -> line 19 -> const_createFile= -> err',
      err,
    );
    return false;
  }
};

export const _file = {
  _getFileStats,
  _createFile,
};
