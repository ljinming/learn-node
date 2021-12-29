// 使用文件进行存取
const fs = require('fs');
function set(key, value) {
  const data = fs.readFile('./db.json', (data) => {
    const json = data ? JSON.parse(data) : {};
    json[key] = value;
    //写入
    fs.writeFile('./db.json', JSON.stringify(json), (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('写入成功');
    });
  });
}
