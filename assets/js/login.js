$(function() {
    $('.login-page').delay(400).fadeIn(300);

    $('.loginbox a').click(function() {
        var username = $('.username').val();
        var password = $('.password').val();

        $('.login-detail')[0].className = 'login-detail';
        get('assets/php/login.php?username=' + username + '&password=' + password, function(data) {
            console.log(data);
            if(data.success == 0) {
                $('.login-detail').addClass('success').children('.login-text').text('用户名密码正确')
            } else {
                $('.login-detail').addClass('err').children('.login-text').text('用户名或密码错误')
            }
        })
    });

    // 输入显示清除按钮
    $('.inputbox .input input').keypress(function() {
        $(this).parent().siblings('.tip').css('display', 'block');
    }).blur(function() {
        if($(this).val() == '') {
            $(this).parent().siblings('.tip').css('display', 'none');
        }
    })

    // 清除按钮
    $('.inputbox .tip').click(function() {
        $(this).css('display', 'none').siblings('.input').children('input').val('');
    })
});