window.onload = function() {

    // 轮播图
    var swiper = new Swiper('.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 30,
        autoplay: {
            delay: 3000,
        },
        loop: true,
        // 淡入淡出效果
        effect: 'fade',
        fadeEffect: {
            crossFade: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });


    // 商品列表输入及切换

    var i, j, k, contentInner;
    // 商品最大容器
    var content = document.querySelector('.body .content');
    // 大类选项
    var bigKind = document.querySelectorAll('.goods-area .category .category-item');
    // 大类列表(床品件套 被枕 家具 收纳 布艺软装 家饰 宠物)
    var list;
    // 全部商品集合数组
    // var allItemList = [];
    // list.forEach(function(value) {
    //     console.log(value['itemList']);
    //     allItemList = allItemList.concat(value['itemList'])
    // });

    function get(url, cb){
        // 3.1 生成请求xhr对象
        var xhr = new XMLHttpRequest();

        // 3.2 配置（请求的方式，请求的目的）
        xhr.open('GET', url, true);

        // 3.3 发送
        xhr.send();

        // 3.4 请求完成的事件
        xhr.onload = function(){
            // 服务器返回的是json字符串，将json字符串转换为json对象
            // console.log(xhr.responseText);
            var data = JSON.parse(xhr.responseText);
            // console.log(data);

            // ajax返回数据之后，不知道未来做什么事情，于是设置一个回调函数，后期自定义
            cb(data);
        }
    }

    // 生成单独一个商品
    function insertItem(item) {
        var contentInner = '';
        contentInner += '<li class="item m-product">';
        contentInner +='<div class="hd">';
        contentInner +='<a href="">';
        contentInner +='<img class="img" src="' + item['listPicUrl'] + '" alt="">';

        // 多少色可选
        if(item['colorNum'] > 0) {
            contentInner +='<span class="left-top-tag">';
            contentInner +='<span class="num">' + item['colorNum'] + '</span><span class="">色可选</span>';
            contentInner +='</span>';
        }

        contentInner += '</a>';
        contentInner += '</div>';
        contentInner += '<div class="bd">';
        contentInner += '<div class="add-price">';

        var itemTagList = item['itemTagList'];//数组
        if(itemTagList.length > 0) {
            for(k = 0; k < itemTagList.length; k++) {
                if(itemTagList[k]['type'] == 0) {
                    contentInner += '<span class="hot">' + itemTagList[k]['name'] + '</span>'
                } else {
                    contentInner += '<span>' + itemTagList[k]['name'] + '</span>'
                }
            }
        }

        contentInner += '</div>';
        contentInner += '<h4 class="name">';
        contentInner += '<a href="">' + item['name'] + '</a>';
        contentInner += '</h4>';
        contentInner += '<p class="price">';
        contentInner += '<span class="retail-price">¥' + item['retailPrice'] + '</span>';
        contentInner += '</p>';
        contentInner += '<div>';
        contentInner += '<hr>';
        contentInner += '<p class="desc">' + item['simpleDesc'] + '</p>';
        contentInner += '</div>';
        contentInner += '</div>';
        contentInner += '</li>';
        return contentInner;
    }

    // 插入全部商品
    function loadAllGoods(list) {
        contentInner = '';
        // 循环插入大类
        for(i = 0; i < list.length; i++) {
            contentInner += '<div class="goods-category">';
            contentInner += '<div class="hd">';
            contentInner += '<p class="title">';
            contentInner += '<img src="' + list[i]['category']['bannerUrl'] + '" alt="" class="icon">';
            contentInner += '<span class="name">' + list[i]['category']['name'] + '</span>';
            contentInner += '</p>';
            contentInner += '<p class="desc">' + list[i]['category']['frontName'] + '</p>';
            contentInner += '</div><ul class="item-list clearfix">';

            var itemList = list[i]['itemList'];
            // 循环插入大类中的单独商品
            for(j = 0; j < itemList.length; j++) {
                contentInner += insertItem(itemList[j])
            }

            contentInner += '</ul></div>';
        }

        content.innerHTML = contentInner;
    }

    // 大类选项卡选择
    function bigKindSel(list) {
        var bigKindIndex = 0;
        for(i = 1; i < bigKind.length; i++) {
            bigKind[i].index = i;
            bigKind[i].onclick = function() {
                contentInner = '';
                bigKind[bigKindIndex].classList.remove('active');
                this.classList.add('active');
                bigKindIndex = this.index;

                contentInner += '<ul class="item-list clearfix">';
                // 循环插入单独商品
                for(j = 0; j < list[bigKindIndex - 1]['itemList'].length; j++) {
                    contentInner += insertItem(list[bigKindIndex - 1]['itemList'][j]);
                }
                contentInner += '</ul>';

                content.innerHTML = contentInner;
            }
        }
        bigKind[0].onclick = function() {
            loadAllGoods(list);
            this.classList.add('active');
            bigKind[bigKindIndex].classList.remove('active');
            bigKindIndex = 0;
        }

    }

    function getJson() {
        get('assets/php/yanxuanListData.php', function (data) {
            // data就是上一个页面的自定义的data,循环遍历也是一致的

            list = data[0]['categoryItemList'];
            // console.log(list);
            // console.log(typeof list);

            loadAllGoods(list);
            bigKindSel(list);
        })
    }

    // 全部选项

    getJson();


};


