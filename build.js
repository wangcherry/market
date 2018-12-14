const fse = require('fs-extra');
const path = require('path');

fse.emptyDirSync(path.join('./dist'));
fse.copySync(path.join('./src/index.html'), path.join('./dist/index.html'));
fse.copySync(path.join('./src/favicon.ico'), path.join('./dist/favicon.ico'));
fse.copySync(path.join('./src/css/index.css'), path.join('./dist/css/index.css'));
fse.copySync(path.join('./src/js'), path.join('./dist/js'));
fse.copySync(path.join('./src/img'), path.join('./dist/img'));