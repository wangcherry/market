// 这是为了将xslx文件解析成json的，谨慎使用，因为会改写 ../src/js/comment-info.js 文件

const path = require('path');
const fse = require('fs-extra');
const xlsx = require('xlsx');

const workbook = xlsx.readFile(path.join(__dirname ,'./20181128.xlsx'));

// 获取 Excel 中所有表名
const sheetNames = workbook.SheetNames; // eg：返回 ['sheet1', 'sheet2']

// 根据总表，解析出skuId列表
const worksheet = workbook.Sheets[sheetNames[0]];
const worksheetJson = xlsx.utils.sheet_to_json(worksheet);
const skuIdList = [];
worksheetJson.forEach(item => {
    skuIdList.push(item.skuid);
})

// 根据表名获取对应某张表，拼凑成所需对象
const obj = {};
sheetNames.forEach((item, i) => {
    if(i > 0) {
        const worksheet = workbook.Sheets[sheetNames[i]];
        const worksheetJson = xlsx.utils.sheet_to_json(worksheet);
        const node = [];
        const list = [];
        worksheetJson.forEach((val, index) => {
            // 随机评级星星
            const star = Math.round(Math.random()) + 4;
            // 获取用户头像图片
            let userPic = './img/comment/logo.png';
            if(fse.existsSync(path.join(__dirname ,`../src/img/comment/${i}-${skuIdList[i-1]}/${index+1}/logo.jpg`))) {
                userPic = `./img/comment/${i}-${skuIdList[i-1]}/${index+1}/logo.jpg`;
            }else if(fse.existsSync(path.join(__dirname ,`../src/img/comment/${i}-${skuIdList[i-1]}/${index+1}/logo.png`))) {
                userPic = `./img/comment/${i}-${skuIdList[i-1]}/${index+1}/logo.png`;
            }
            // 获取评论图片
            const imgs = [];
            if(fse.existsSync(path.join(__dirname ,`../src/img/comment/${i}-${skuIdList[i-1]}/${index+1}`))) {
                const imgsList = fse.readdirSync(path.join(__dirname ,`../src/img/comment/${i}-${skuIdList[i-1]}/${index+1}`), "utf8");
                imgsList.forEach(v => {
                    if(v.indexOf('logo') === -1) imgs.push(`./img/comment/${i}-${skuIdList[i-1]}/${index+1}/${v}`);
                })
            }
            list.push({
                userPic,
                userName: val['评论人名'],
                starPic: `./img/comment/star${star}.png`,
                time: val['评论时间'],
                spec: val['规格'],
                desc: val['评论内容'],
                imgs
            })
        })
        obj[skuIdList[i-1]] = list;
    }
})

/**
 * 谨慎 谨慎 谨慎操作
 */ 
// fse.writeFileSync(path.join(__dirname ,'../src/js/comment-info.js'), 'var CommentInfo = ' + JSON.stringify(obj), 'utf-8');

console.log(obj);

