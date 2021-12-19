/*______--------------------buffter---------*/
// Buffer - 用于在 TCP 流、文件系统操作、以及其他上下文中与八位字节流进行交互。
// 八位字节组 成的数组，可以有效的在JS中存储二进制数据

const buf1 = Buffer.alloc(10); //创建数值 Buffter.alloc
console.log('----buf1', buf1);
const buf2 = Buffer.from('a'); // 创建字符串 Buffter.form()
console.log('buf2', buf2);

// 创建Buffer包含UTF-8字节
// UFT-8:一种变长的编码方案，使用 1~6 个字节来存储;
// UFT-32:一种固定长度的编码方案，不管字符编号大小，始终使用 4 个字节来存储;
// UTF-16:介于 UTF-8 和 UTF-32 之间，使用 2 个或者 4 个字节来存储，长度既固定又可变。

const buf3 = Buffer.from('中'); // 创建中文 Buffter.form()
console.log('buf3', buf3);
