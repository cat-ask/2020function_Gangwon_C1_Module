<div id="visual" class="normal">
    <img src="resources/images/visual.jpg" alt="visual" title="visual" id="visual_img">
    <div id="visual_word">
        <p>로그인</p>
    </div>
</div>

<div id="content">
    <div class="content_wrap" id="login">
        <div class="content_box_title">
            <div class="content_box_title_circle"></div>
            <h2 class="content_title">로그인</h2>
        </div>

        <div class="content_box">
            <form action="/login" method="post" id="login_form" class="form_design">
                <div class="form-control">
                    <div class="form-header">
                        <label for="user_id" class="form-label">아이디</label>
                        <p class="form-error"></p>
                    </div>
                    <input type="text" id="user_id" name="user_id" class="form-input" required>
                </div>
                <div class="form-control">
                    <div class="form-header">
                        <label for="password" class="form-label">비밀번호</label>
                        <p class="form-error"></p>
                    </div>
                    <input type="password" id="password" name="password" class="form-input" required>
                </div>
                <button id="login_btn">로그인</button>
            </form>
        </div>
    </div>
</div>