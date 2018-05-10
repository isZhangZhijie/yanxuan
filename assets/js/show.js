$(function() {

    // 详情页头部轮播图
    var selPics = document.querySelectorAll('.detail-hd .list li');
    var view = document.querySelector('.detail-hd .view img');
    var viewIndex = 0;
    var i, j;
    for(i = 0; i < selPics.length; i++) {
        selPics[i].index = i;
        selPics[i].onmouseenter = function() {
            selPics[viewIndex].classList.remove('active');
            this.classList.add('active');
            viewIndex = this.index;
            view.src = 'assets/images/show/topSlide/big-' + viewIndex + '.jpg'
        }
    }

    // 颜色选择切换
    var selCol = document.querySelectorAll('.detail-hd .sel-color .tab-con');
    var colorIndex = 0;
    for(i = 0; i < selCol.length; i++) {
        selCol[i].index = i;
        selCol[i].onclick = function() {
            selCol[colorIndex].children[0].classList.remove('tab-sel');
            this.children[0].classList.add('tab-sel');
            colorIndex = this.index;
            view.src = 'assets/images/show/topSlide/big-' + colorIndex + '.png'
        }
    }

    // 尺寸选择切换
    var selSize = document.querySelectorAll('.detail-hd .sel-size .tab-con');
    var sizeIndex = 0;
    for(i = 0; i < selSize.length; i++) {
        selSize[i].index = i;
        selSize[i].onclick = function() {
            selSize[sizeIndex].children[0].classList.remove('tab-sel');
            this.children[0].classList.add('tab-sel');
            sizeIndex = this.index;
        }
    }

    // 件数选择
    var lessBtn = document.querySelector('.detail-hd .number .less');
    var moreBtn = document.querySelector('.detail-hd .number .more');
    var num = document.querySelector('.detail-hd .number .num');
    lessBtn.onclick = function() {
        if(num.value > 2) {
            num.value--;
        } else if(num.value == 2) {
            num.value--;
            lessBtn.classList.add('z-dis');
        }
    };
    moreBtn.onclick = function() {
        num.value++;
        if(num.value > 1) {
            lessBtn.classList.remove('z-dis');
        }
    };



    // 中部 大家都在看 swiper
    var recommend = new Swiper('.recommend-container', {
        slidesPerView: 4,
        spaceBetween: 30,
        slidesPerGroup: 4,
        loopFillGroupWithBlank: true,
    });
    $('.promContainer .recommend .icon-left').click(function () {
        if(!$('.promContainer .recommend .icon-left').hasClass('disable')) {
            recommend.slidePrev();
            $('.promContainer .recommend .icon-left').addClass('disable');
            $('.promContainer .recommend .icon-right').removeClass('disable');
        }
    });
    $('.promContainer .recommend .icon-right').click(function () {
        if(!$('.promContainer .recommend .icon-right').hasClass('disable')) {
            recommend.slideNext();
            $('.promContainer .recommend .icon-right').addClass('disable');
            $('.promContainer .recommend .icon-left').removeClass('disable');
        }
    });



    // 详情评价切换
    $('.detailBd .detailNav .item').click(function() {
        if(!$(this).hasClass('item-active')) {
            $('.detailBd .detailNav .item').removeClass('item-active');
            $(this).addClass('item-active');
            $('.detailHtml, .detailCommentContainer').css('display', 'none').eq($(this).index()).css('display', 'block');
        }
    });


    // 评价-大家都在说-标签切换
    var labelIndex = 0;
    $('.commentNav .label').click(function() {
        if (!$(this).hasClass('active')) {
            $('.commentNav .label').eq(labelIndex).removeClass('active');
            $(this).addClass('active');
            labelIndex = $(this).index();
        }
    });







    // 质检报告 swiper
    var report;

    $('.detailHtml .img-wrap').click(function() {
        $('.report-show').css('display', 'block');
        $('.report-show .report').css('top', $(window).scrollTop());
        // report = null;

        report = new Swiper('.report-container', {
            loop: true,
            // autoplay: true,
        });
        $('.report .icon-left').click(function () {
            report.slidePrev();
        });
        $('.report .icon-right').click(function () {
            console.log(report);
            report.slideNext();
        });
    });

    $('.report-show .close').click(function() {
        $('.report-show').css('display', 'none');
    })
});