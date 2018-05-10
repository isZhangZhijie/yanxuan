// 轮播图效果

var carousel = document.querySelector('.body .carousel');
var imgs = document.querySelectorAll('.carousel-list li');
var nums = document.querySelectorAll('.carousel-index li');
var leftBtn = document.querySelector('.left-arrow');
var rightBtn = document.querySelector('.right-arrow');
var len = imgs.length;
var carouselTimer;
var carouselIndex = 0;

function run() {
    carouselTimer = setInterval(function() {
        slide(function() {
            carouselIndex = ++carouselIndex % len;
        })

    }, 4000);

}

run();

// 鼠标移入图片停止
carousel.onmouseenter = function() {
    clearInterval(carouselTimer);
};
carousel.onmouseleave = function() {
    run();
};

// 圆点控制显示
for(var i = 0; i < nums.length; i++) {
    nums[i].carouselIndex = i;
    nums[i].onmouseenter = function() {
        var that = this;
        slide(function() {
            carouselIndex = that.carouselIndex;
        })
    }
}

// 箭头控制
leftBtn.onclick = function() {
    slide(function() {
        carouselIndex = (--carouselIndex + len) % len;
    })
};
rightBtn.onclick = function() {
    slide(function() {
        carouselIndex = ++carouselIndex % len;
    })
};

function slide(callback) {
    // 去除上一图片的 active 属性
    imgs[carouselIndex].classList.remove('active');
    nums[carouselIndex].classList.remove('active');
    callback();
    // 添加 active 属性
    imgs[carouselIndex].classList.add('active');
    nums[carouselIndex].classList.add('active');
}


// 人气推荐选项卡
var recommendSelNum = 0;
var recommendSel = document.querySelectorAll('.popular .recommend-list a');
var showPopular = document.querySelectorAll('.popular .show-popular');
for(var i = 0; i < recommendSel.length; i++) {
    recommendSel[i].index = i;
    recommendSel[i].onclick = function() {
        recommendSel[recommendSelNum].classList.remove('on-sel');
        showPopular[recommendSelNum].classList.remove('on-show');
        recommendSelNum = this.index
        recommendSel[recommendSelNum].classList.add('on-sel');
        showPopular[recommendSelNum].classList.add('on-show');
    }
}