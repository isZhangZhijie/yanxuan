/*
    * 1.帐号须由字母开头，尝试注册当前帐号？
    * 2.帐号请以字母或数字结尾，尝试注册当前帐号？
    * 3.帐号须由6-18个字符组成，尝试注册当前帐号？
    * 4.请用字母、数字或下划线命名
    * 5.该账户已经被注册
    *
    * 密码：
    * 1.密码须由6-16个字符组成，区分大小写
    * 2.空格不可以
    * 3.不能是纯数字
    * 4.不能是纯字母
    * */
$(function(){
    var uBool = false;
    var pBool = false;
    var repBool = false;
    var picBool = false;
    var phoneBool = false;
    var msgBool = false;
    var clauseBool = true;


    // 用户名验证
    $('.username').blur(function() {

        // 根据上述的规则一一验证用户输入的值是否正确

        // 获取用户输入的值(删除两边可能出现的空格)
        var value = $(this).val().trim();

        // 每次失去焦点，重新验证
        if(value.length == 0) {
            $(this).removeClass('err').siblings('.popb')[0].className = 'popb';
            $(this).siblings('.popb').children('span').text('');
            $(this).siblings('.tip').addClass('f-dn');
        } else {

            // 1.帐号须由字母开头，尝试注册当前帐号？
            var reg1 = /^[a-zA-Z]/;
            if (!reg1.test(value)) {
                $(this).siblings('.popb')[0].className = 'popb';
                // 添加错误的class
                $(this).addClass('err').siblings('.popb').addClass('warn animation').children('span').text('帐号须由字母开头，尝试注册当前帐号？');
                uBool = false;
                // 没有通过，阻止执行
                return;
            }

            // 2.帐号请以字母或数字结尾，尝试注册当前帐号？
            var reg2 = /[a-zA-Z0-9]$/;
            if (!reg2.test(value)) {
                $(this).siblings('.popb')[0].className = 'popb';
                $(this).addClass('err').siblings('.popb').addClass('warn animation').children('span').text('帐号请以字母或数字结尾，尝试注册当前帐号？');
                uBool = false;
                // 没有通过，阻止执行
                return;
            }

            // 3.帐号须由6-18个字符组成，尝试注册当前帐号？
            var reg3 = /^.{6,18}$/;
            if (!reg3.test(value)) {
                $(this).siblings('.popb')[0].className = 'popb';
                $(this).addClass('err').siblings('.popb').addClass('warn animation').children('span').text('帐号须由6-18个字符组成，尝试注册当前帐号？');
                uBool = false;
                return;
            }

            // 4. 请用字母、数字或下划线命名
            var reg4 = /^\w*$/;
            if (!reg4.test(value)) {
                $(this).siblings('.popb')[0].className = 'popb';
                $(this).addClass('err').siblings('.popb').addClass('err animation').children('span').text('请用字母、数字或下划线命名');
                uBool = false;
                return;
            } else {
                // 验证成功
                // 判断用户名是否重复
                // 将用户名发送到远程的服务器
                get('assets/php/regJson.php?username=' + value, function(data){
                    if (data.success == 1) {

                        $('.username').siblings('.popb')[0].className = 'popb';
                        // 添加错误的class
                        $('.username').addClass('err').siblings('.popb').addClass('warn animation').children('span').text('该帐号已注册');
                        uBool = false;
                    } else {
                        uBool = true;
                        // 没有注册
                        $('.username').removeClass('err').siblings('.popb')[0].className = 'popb';
                        // 添加错误的class
                        $('.username').siblings('.popb').addClass('success').children('span').text('恭喜你，用户名可用');
                    }
                })
            }
        }
    }).keypress(function() {
        $(this).siblings('.tip').removeClass('f-dn');
    });

    // 密码验证
    $('.password').blur(function(){
        // 1.获取用户输入的密码
        var value = $(this).val();
        if(value.length == 0) {
            $(this).removeClass('err').siblings('.popb')[0].className = 'popb';
            $(this).siblings('.popb').children('span').text('');
            $(this).siblings('.tip').addClass('f-dn');
        } else {

            // 2..密码须由6-16个字符组成，区分大小写
            var reg1 = /^.{6,16}$/;
            if (!reg1.test(value)) {
                // $(this).parents('tr').addClass('error');
                // $(this).parent().next().children('span').text('密码须由6-16个字符组成，区分大小写');

                $(this).siblings('.popb')[0].className = 'popb';
                $(this).addClass('err').siblings('.popb').addClass('err animation').children('span').text('密码须由6-16个字符组成，区分大小写');
                pBool = false;
                return;
            }

            // 3.验证不能是空格
            var reg2 = /\s/;
            if (reg2.test(value)) {
                $(this).siblings('.popb')[0].className = 'popb';
                $(this).addClass('err').siblings('.popb').addClass('err animation').children('span').text('密码不符合规范');
                pBool = false;
                return;
            }

            // 3.不能是纯字母
            var reg3 = /^[a-zA-Z]*$/;
            if (reg3.test(value)) {

                $(this).siblings('.popb')[0].className = 'popb';
                $(this).addClass('err').siblings('.popb').addClass('err animation').children('span').text('密码过于简单-纯字母不可以');
                pBool = false;
                return;
            }

            // 4.不是是纯数字
            var reg4 = /^[0-9]*$/;
            if (reg4.test(value)) {

                $(this).siblings('.popb')[0].className = 'popb';
                $(this).addClass('err').siblings('.popb').addClass('err animation').children('span').text('密码过于简单-纯数字不可以');
                pBool = false;
            } else {
                $(this).removeClass('err').siblings('.popb')[0].className = 'popb';
                $(this).siblings('.popb').addClass('success');
                $(this).siblings('.popb').children('span').text('');
                pBool = true;
            }
        }
    }).keydown(function(){
        $('.repassword').val('');
        $(this).siblings('.tip').removeClass('f-dn');
    });

    // 确认密码验证
    $('.repassword').blur(function(){
        // 1.获取用户输入的值，并且和一次密码中的值比较，如果一致，则通过验证
        var reValue = $(this).val();
        var value = $('.password').val();

        // 2.比较
        if(value.length > 0) {
            if (reValue !== value) {
                $(this).siblings('.popb')[0].className = 'popb';
                $(this).addClass('err').siblings('.popb').addClass('err animation').children('span').text('密码不一致');
                repBool = false;
                return;
            } else {
                repBool = true;

                $(this).removeClass('err').siblings('.popb')[0].className = 'popb';
                $(this).siblings('.popb').addClass('success');
                $(this).siblings('.popb').children('span').text('');
            }
        } else {
            $(this).siblings('.tip').addClass('f-dn');
        }
    }).keydown(function() {
        $(this).siblings('.tip').removeClass('f-dn');
    });

    // 图片验证码验证
    $('.yanzheng-content').mouseenter(function() {
        $(this).find('.yanzhengPic').css('display', 'block');
    }).mouseleave(function() {
        $(this).find('.yanzhengPic').css('display', 'none');
    }).find('.yanzhengPic').click(function() {
        $(this).parent().siblings('.popb').addClass('success');
        picBool = true;
        $('.yanzheng-content').siblings('.popb').removeClass('err').children('span').text('');
    })

    // 手机号码验证
    $('.phone').blur(function(){
        $(this).attr('maxlength', '20');

        // 1.获取用户输入的手机号
        var value = $(this).val().trim();
        if(value.length == 0) {
            $(this).removeClass('err').siblings('.popb')[0].className = 'popb';
            $(this).siblings('.popb').children('span').text('');
            $(this).siblings('.tip').addClass('f-dn');
        } else {


            //
            var reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
            if (!reg.test(value)) {

                $(this).siblings('.popb')[0].className = 'popb';
                $(this).addClass('err').siblings('.popb').addClass('err animation').children('span').text('请输入正确的手机号');
                phoneBool = false;
            } else {
                $(this).removeClass('err').siblings('.popb')[0].className = 'popb';
                $(this).siblings('.popb').addClass('success');
                $(this).siblings('.popb').children('span').text('');
                phoneBool = true;

                // 手机号码验证成功获取验证码按钮可点击
                $('.btn-getsms').removeClass('btn-getsms-btndisabled');
            }
        }
    });
    // 用户名为空或不正确时手机号不能输入
    $('.phone').keydown(function() {
        $(this).siblings('.tip').removeClass('f-dn');
        if(!$('.username').val() || !uBool) {
            $(this).attr('maxlength', '0');
            $('.username').siblings('.popb').addClass('err animation').children('span').text('请先输入帐号')
        }
    });

    // 短信验证码
    // 当手机号验证正常才能点击获取验证码
    $('.btn-getsms').click(function() {
        if(!picBool) {
            $('.yanzheng-content').siblings('.popb').addClass('err animation').children('span').text('请点击验证码');
        } else if(!phoneBool) {
            $('.phone').siblings('.popb').addClass('err animation').children('span').text('请先输入手机号');
        } else if(!$(this).hasClass('btn-getsms-btndisabled')) {
            // 倒数时不可点击
            $('.btn-getsms').addClass('btn-getsms-btndisabled');
            var timer, second = 5;
            $(this).text(second + '秒');
            timer = setInterval(function() {
                console.log(111);
                second--;
                $('.btn-getsms').text(second + '秒');
                if(second == 0) {
                    clearInterval(timer);
                    $('.btn-getsms').text('获取验证码').removeClass('btn-getsms-btndisabled').siblings('.popb').children('span').text('验证码 : 123456');
                }
            }, 1000);
        }
    });
    // 短信验证码输入框
    $('.smsize').keydown(function() {
        if(uBool && phoneBool) {
            $(this).siblings('.tip').removeClass('f-dn');
        }
        $(this).attr('maxlength', '6');
        if(!$('.username').val() || !uBool) {
            $(this).attr('maxlength', '0');
            $('.username').siblings('.popb').addClass('err animation').children('span').text('请先输入帐号')
        } else if(!$('.phone').val() || !phoneBool) {
            $(this).attr('maxlength', '0');
            $('.phone').siblings('.popb').addClass('err animation').children('span').text('请先输入手机号')
        }
    }).blur(function() {
        if($(this).val() == 123456) {
            msgBool = true;
            $(this).siblings('.popb').addClass('success').children('span').text('')
        } else if($(this).val() != '') {
            $(this).siblings('.popb').addClass('err animation').children('span').text('请输入正确的验证码')
        }
    });


    // 输入框清除按钮 清除内容
    $('.opr .tip').click(function() {
        $(this).addClass('f-dn').siblings('.i-inpt').removeClass('err').val('').focus();
        $(this).addClass('f-dn').siblings('.popb')[0].className = 'popb';
        $(this).siblings('.popb').children('span').text('');
    });
    // 手机号框清除手机号，获取验证码按钮不可点击
    $('.opr .tip-in-phone.tip').click(function() {
        $('.btn-getsms').addClass('btn-getsms-btndisabled');
    });


    // 用户条款选择
    $('.m-agree').click(function() {
        $(this).toggleClass('m-agree-ok');
        clauseBool = $(this).hasClass('m-agree-ok');
    });






    // 表单提交
    $('.reg').submit(function(e){
        // e.preventDefault();
        // 判断用户名和密码是否正确
        if (uBool && pBool && repBool && picBool && phoneBool && msgBool && clauseBool) {
            // 正常提交
        } else {
            console.log('用户名密码不正确');
            e.preventDefault();
        }
    })
});