$(document).ready(() => {
    /**
     * 屏幕适配
     */
    $('body').css({zoom: window.screen.width / 1080, visibility: 'visible'});


    /**
     * 爆款推荐
     */
    var boom1Tpl = [];
    GoodsInfo.boom.rowList1.forEach(item => {
        boom1Tpl.push($(`<div class="img-wrap goods" data="${item.skuId}"><img src="${item.url}"></div>`));
    });
    var boom2Tpl = [];
    GoodsInfo.boom.rowList2.forEach(item => {
        boom2Tpl.push($(`<div class="img-wrap goods" data="${item.skuId}"><img src="${item.url}"></div>`));
    });
    $('.part1').append($(`<div class="row row1"></div><div class="row row2 margin-top-20"></div>`));
    $('.part1 .row').append(`<div class="box"></div><div class="box"></div>`);
    $('.part1 .row1 .box').append(boom1Tpl);
    $('.part1 .row2 .box').append(boom2Tpl);

    /**
     * 新品推荐
     */
    var newTpl = [];
    GoodsInfo.newList.forEach(item => {
        newTpl.push($(`<div class="img-wrap goods" data="${item.skuId}"><img src="${item.url}"></div>`));
    });
    $('.part2').append(newTpl);

    /**
     * 三石哥推荐
     */
    var sanTpl = [];
    GoodsInfo.sanList.forEach(item => {
        sanTpl.push($(`<div class="img-wrap goods" data="${item.skuId}"><img src="${item.url}"></div>`));
    });
    $('.part3').append(sanTpl);


    /**
     * 查看评论
     */
    var commentEle = $('.comment');
    var commentTimeout;
    function commentOpen() {
        commentEle.removeClass('hide dialog-close');
        commentEle.addClass('dialog-open');
    }
    function commentClose() {
        commentEle.removeClass('dialog-open');
        commentEle.addClass('hide dialog-close');
    }
    var commentListTpl = [];
    $('.layout .part').on('click', '.goods', (event) => {
        var skuId = $(event.currentTarget).attr('data');

        // 埋点 - 点击商品查看评论 
        window.YXStat.q.push(['track_click', {
            event_name: 'click_OR-index_goods',
            page_name: 'OR-index',
            parameters: {skuId: Number(skuId)}
        }]);

        var list = CommentInfo[skuId] || [];
        list.forEach(item => {
            var imgTpl = '';
            item.imgs.forEach(img => {
                imgTpl += `<div class="img-wrap" style="background-image: url('${img}')"></div>`
            })
            commentListTpl.push($(`
                <div class="box">
                    <div class="user">
                        <div class="img-wrap"><img src="${item.userPic}" alt=""></div>
                        <span class="vertical-align-middle">${item.userName}</span>
                        <span><img src="${item.starPic}" alt=""></span>
                    </div>
                    <div class="time">
                        <span class="margin-right-30">${item.time}</span>
                        <span>${item.spec}</span>
                    </div>
                    <div class="desc">${item.desc}</div>
                    <div class="img">${imgTpl}</div>
                </div>
            `))
        });
        $('.comment .comment-content .contain .box-wrap').append(commentListTpl);
        commentOpen();
        commentTimeout = setTimeout(commentClose, 60000);
    });
    $('.comment .close').on('click', () => {
        commentListTpl = [];
        $('.comment .comment-content .contain .box-wrap').empty();
        commentClose();
        if(commentTimeout) clearTimeout(commentTimeout);
    })
    var containEle = $('.comment .contain');
    containEle.scroll(() => {
        if(containEle.scrollTop() % 5 === 0) {
            if(commentTimeout) clearTimeout(commentTimeout);
            commentTimeout = setTimeout(commentClose, 60000);
        }
    });


    /**
     * 领取优惠券
     */
    var couponEle = $('.coupon');
    var couponTimeout;
    function couponOpen() {
        couponEle.removeClass('hide dialog-close');
        couponEle.addClass('dialog-open');
    }
    function couponClose() {
        couponEle.removeClass('dialog-open');
        couponEle.addClass('hide dialog-close');
    }
    $('.layout .img-wrap2').on('click', () => {
        // 埋点 - 点击优惠券 
        window.YXStat.q.push(['track_click', {
            event_name: 'click_OR-index_coupon',
            page_name: 'OR-index',
            parameters: {}
        }]);

        couponOpen();
        couponTimeout = setTimeout(couponClose, 60000);
    });
    $('.coupon .close').on('click', () => {
        couponClose();
        if(couponTimeout) clearTimeout(couponTimeout);
    })

});