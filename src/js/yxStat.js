// 埋点
window.YXStat = {};
YXStat.q = YXStat.q || [];
 
(function () {
    var done = false;
    var stat = document.createElement('script');
    stat.type = 'text/javascript';
    stat.async = true;
    stat.src = 'https://yanxuan.nosdn.127.net/hxm/yanxuan-analytics/common/js/stat.min.js?v=' + (new Date).getTime();
    stat.onload = stat.onreadystatechange = function () {
        if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
            done = true;
            YXStat.init({
                client_type: "wap", // 区分终端(web/wap)，全局配置，默认为空，需修改
                url: "http://dc.ts.163.com/OR/a.js",   // 传入统计链接，{PRODUCT_NAME} 需要替换为特定产品代码，如 xuanyuan, cangjie 等
                isAgent: false, // 是否绑定document单击事件，全局处理声明式埋点
                appLogSource: 'data' // 区分APP日志来源，标识各业务，需修改
            });
        }
    };
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(stat, s);
})();