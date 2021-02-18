<div id="visual" class="normal">
    <img src="resources/images/visual.jpg" alt="visual" title="visual" id="visual_img">
    <div id="visual_word">
        <p>회원가입</p>
    </div>
</div>

<div id="content">
    <div class="content_wrap" id="join">
        <div class="content_box_title">
            <div class="content_box_title_circle"></div>
            <h2 class="content_title">회원가입</h2>
        </div>

        <div class="content_box">
            <form action="/join" id="join_form" method="post">
                <div class="form-control">
                    <div class="form-header">
                        <label for="user_id" class="form-label">아이디</label>
                        <p class="form-error"></p>
                    </div>
                    <input type="text" id="user_id" name="user_id" class="form-input" data-column="아이디">
                </div>
                <div class="form-control">
                    <div class="form-header">
                        <label for="password" class="form-label">비밀번호</label>
                        <p class="form-error"></p>
                    </div>
                    <input type="password" id="password" name="password" class="form-input" data-column="비밀번호">
                </div>
                <div class="form-control">
                    <div class="form-header">
                        <label for="password_check" class="form-label">비밀번호 확인</label>
                        <p class="form-error"></p>
                    </div>
                    <input type="password" id="password_check" name="password_check" class="form-input" data-column="비밀번호 확인">
                </div>
                <div class="form-control">
                    <div class="form-header">
                        <label for="user_name" class="form-label">이름</label>
                        <p class="form-error"></p>
                    </div>
                    <input type="text" id="user_name" name="user_name" class="form-input" data-column="이름">
                </div>
                <div class="form-control">
                    <div class="form-header">
                        <label for="zip_code" class="form-label">우편번호</label>
                        <p class="form-error"></p>
                    </div>
                    <input type="number" id="zip_code" name="zip_code" class="form-input" data-column="우편번호">
                </div>
                <div class="form-control">
                    <div class="form-header">
                        <label for="address" class="form-label">주소</label>
                        <p class="form-error"></p>
                    </div>
                    <input type="text" id="address" name="address" class="form-input" data-column="주소">
                </div>
                <div class="form-control">
                    <div class="form-header">
                        <label for="detail_address" class="form-label">상세주소</label>
                        <p class="form-error"></p>
                    </div>
                    <input type="text" id="detail_address" name="detail_address" class="form-input" data-column="상세주소">
                </div>
                <div class="form-control">
                    <div class="form-header">
                        <label for="phone_number" class="form-label">전화번호</label>
                        <p class="form-error"></p>
                    </div>
                    <input type="text" id="phone_number" name="phone_number" class="form-input" data-column="전화번호">
                </div>
                <div class="form-control">
                    <div class="form-header">
                        <label for="phone_number" class="form-label">회원타입</label>
                        <p class="form-error"></p>
                    </div>
                    <div>
                        <span>일반</span>
                        <input type="radio" value="normal" id="normal_type" name="type" class="form-input" data-column="회원타입" checked>

                        <span>컨슈머</span>
                        <input type="radio" value="consumer" id="consumer_type" name="type" class="form-input" data-column="회원타입">
                    </div>
                </div>
            </form>
            <button id="join_btn">회원가입</button>
        </div>
    </div>
</div>

<script src="resources/js/app.js"></script>