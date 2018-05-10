var serviceNav = document.querySelector('.nav-right-list:nth-of-type(5)');
var serviceList = document.querySelector('.service-list');
var downloadApp = document.querySelector('.nav-right-list:nth-of-type(6)');
var downloadCode = document.querySelector('.download-code');
var navTimer;

// 客户服务弹出框
serviceNav.onmouseenter = function() {
    // 设置 200ms 延迟弹出,若200ms内鼠标移出,弹出框依然会弹出,且不会收起
    navTimer = setTimeout(function() {
        serviceList.style.display = 'inline-block';
    }, 200)
};
serviceNav.onmouseleave = function() {
    // 鼠标移出后,若还未弹出则取消弹出,防止鼠标移动过快移出后弹出框依然弹出
    clearTimeout(navTimer);
    serviceList.style.display = 'none';
};
// app 下载二维码弹出框
downloadApp.onmouseenter = function() {
    navTimer = setTimeout(function() {
        downloadCode.style.display = 'inline-block';
    }, 200)
};
downloadApp.onmouseleave = function() {
    clearTimeout(navTimer);
    downloadCode.style.display = 'none';
};


var rollList = document.querySelector('.nav-roll-list');
var rollItem = document.querySelectorAll('.nav-roll-item');
var navIndex = 0;
var navRollLen = rollItem.length;

// 导航栏信息持续向上移动效果
setInterval(function() {
    if(navIndex == 1) {
        navIndex = 0;
        rollList.style.top = -(navRollLen - 1) * 36 + 'px';
        setTimeout(function() {
            rollList.style.transition = 'none';
            rollList.style.top = '0px';
        }, 800)
    } else {
        navIndex = ++navIndex % navRollLen;
        rollList.style.transition = 'top 600ms linear';
        rollList.style.top = -navIndex * 36 + 'px';
    }
}, 4000);





// 下拉列表满屏宽度
autoWidth();
$(window).resize(function() {
    autoWidth()
});
// 下拉列表自动占满横屏函数
function autoWidth() {
    $('.header .goods-item').each(function() {
        var leftDis = $(this).offset().left;
        var screenWidth = $(window).width();
        $(this).find('.dropdown-container').css({'left': -leftDis, width: screenWidth});
    });
}

// 下拉列表直接显示
$('.header .goods-item').mouseenter(function() {
    $(this).find('.dropdown-container').show();
}).mouseleave(function() {
    $(this).find('.dropdown-container').hide();
});

// 下拉列表渐入
// var showIndex;
// $('.header .goods-item').mouseenter(function() {
//     showIndex = $(this).index();
//     $(this).find('.dropdown-container').show();
// }).mouseleave(function() {
//     showIndex = $(this).index();
//     $(this).find('.dropdown-container').hide();
// });
// $('.header .goods-list').mouseenter(function() {
//     $('.header .goods-item').eq(showIndex).find('.dropdown-container').hide().fadeIn(200);
// }).mouseleave(function() {
//     $('.header .goods-item').eq(showIndex).find('.dropdown-container').show().fadeOut(200);
// });


// 滚动式下拉列表固定
var header = document.querySelector('.header');
var headPic = document.querySelector('.header .header-pic');
var goTop = document.querySelector('.fixedtoolGoTop');
window.onscroll = function() {
    if(document.documentElement.scrollTop >= 180) {
        header.classList.add('header-fixed');
        headPic.style.display = 'none';
    } else {
        header.classList.remove('header-fixed');
        headPic.style.display = 'block';
    }

    // 滚动也调用满屏函数
    autoWidth();



    // 侧边栏回顶部
    if(document.documentElement.scrollTop >= 800) {
        goTop.classList.add('active');
    } else {
        goTop.classList.remove('active');
    }
}
var goTopTimer;
goTop.onclick = function() {
    goTopTimer = setInterval(function() {
        var topDis = $(window).scrollTop();
        if(topDis <= 50) {
            clearInterval(goTopTimer);
            $(window).scrollTop(0);
        }
        topDis -= 50;
        $(window).scrollTop(topDis);
    }, 10);
}


// 搜索框下拉效果
var searchSuggest = document.querySelector('.search-box .search-suggest');
var searchInput = document.querySelector('.search-box .search-input');
var searchBox = document.querySelector('.search-box')
searchInput.onfocus = function() {
    searchSuggest.classList.remove('search-suggest-hide');
    setTimeout(function() {
        searchSuggest.classList.add('search-suggest-show');
    }, 10)
};
searchBox.onmouseleave = function() {
    searchSuggest.classList.remove('search-suggest-show');
    searchSuggest.classList.add('search-suggest-hide');
};
searchInput.onblur = function() {
    searchSuggest.classList.remove('search-suggest-show');
    searchSuggest.classList.add('search-suggest-hide');
};

// 下拉列表滚动式搜索框样式
var searchBtn = document.querySelector('.header .icon-search');
var searchInputWrap = document.querySelector('.header .searchInputWrap');
var searchHideBtn = document.querySelector('.header .hiddenFixedSearchInputButton');
searchBtn.onclick = function() {
    if(header.classList.contains('header-fixed')) {
        searchInputWrap.classList.add('fixedSearchInputDisplay');
        searchHideBtn.classList.add('fixedSearchInputDisplay');
        searchInput.focus();
    }
};
searchHideBtn.onclick = function() {
    if(header.classList.contains('header-fixed')) {
        searchInputWrap.classList.remove('fixedSearchInputDisplay');
        searchHideBtn.classList.remove('fixedSearchInputDisplay');
    }
};



// 侧边栏回顶部
var goTop = document.querySelector('.fixedtoolGoTop');




