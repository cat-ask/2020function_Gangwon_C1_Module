<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>완주와일드푸드축제</title>
    <link rel="stylesheet" href="../resources/css/style.css">
    <link rel="stylesheet" href="../resources/fontawesome-free-5.1.0-web/css/all.css">
    <script src="../resources/js/jquery-3.4.1.min.js"></script>
</head>
<body>
    <div id="wrap">
        <header>
            <div id="header_top">
                <div id="user">
                    <?php if(user()):?>
                    <span style="padding:0 10px;"><?=user()->user_name?>님</span>
                    <a href="/logout">로그아웃</a>
                    <?php else:?>
                    <a href="/login">로그인</a>
                    <a href="/join">회원가입</a>
                    <?php endif;?>
                </div>
            </div>
            <div id="header_bottom">
                <div id="logo">
                    <img src="../resources/images/logo.png" alt="Logo">
                </div>
                <nav>
                    <ul>
                        <li><a href="/">홈</a></li>
                        <li><a href="/shopping">쇼핑몰</a></li>
                        <li><a href="/request">제안 요청</a></li>
                        <li><a href="/propose">제안 하기</a></li>
                        <?php if(admin()):?>
                        <li><a href="/admin">판매 통계 보기</a></li>
                        <?php endif;?>
                    </ul>
                </nav>
                <div id="sns">
                    <i class="fab fa-instagram"></i>
                    <i class="fab fa-twitter"></i>
                    <i class="fab fa-facebook"></i>
                </div>
            </div>
        </header>