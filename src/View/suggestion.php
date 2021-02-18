<div id="visual" class="normal">
            <img src="../resources/images/visual.jpg" alt="visual" title="visual" id="visual_img">
            <div id="visual_word">
                <p>제안하기</p>
            </div>
        </div>
        
        <div id="content">
            <div class="content_wrap brown" id="suggestion_basket">
                <div class="content_box_title">
                    <div class="content_box_title_circle"></div>
                    <h2 class="content_title">담은 상품 목록</h2>
                </div>
                <div class="content_box">
                    <table id="suggestion_basket_table" class="table_design">
                        <thead>
                            <tr>
                                <th>상품명</th>
                                <th>가격</th>
                                <th>구매 개수</th>
                                <th>총 가격</th>
                            </tr>
                        </thead>
                        <tbody id="suggestion_area">

                        </tbody>
                    </table>
                    <div id="suggestion_footer">
                        <p class="suggestion_price">가격 한도 : <?=number_format($data[0]->price_limit)?>원 [ ± <?=number_format($data[0]->error_range)?>원 ] / 총 합계 : <span class="suggestion_sum" data-max="<?=$data[0]->max?>" data-min="<?=$data[0]->min?>">0</span>원</p>
                        <button id="suggestion_btn" class="btn brown" data-max="<?=$data[0]->max?>" data-min="<?=$data[0]->min?>" data-id="<?=$data[0]->id?>">제안</button>
                    </div>
                </div>
            </div>

            <div class="content_wrap green" id="suggestion_list">
                <div class="content_box_title">
                    <div class="content_box_title_circle"></div>
                    <h2 class="content_title">상품 목록</h2>
                </div>
                <div class="content_box" id="suggestion_list_area">
                    <div class="item">
                        <div class="item-body">
                            <h5 class="item-name">감자</h5>
                            <h6 class="item-price"><i class="fas fa-won-sign"></i> 10,000</h6>
                            <div class="item-numberBox">
                                <input type="number" class="item-num" min="1" value="1">
                                <button class="item-numberBtn" id="item-numberPlus"><i class="fas fa-plus"></i></button>
                                <button class="item-numberBtn" id="item-numberMin"><i class="fas fa-minus"></i></button>
                            </div>
                            <div class="item-buttonBox">
                                <button class="item-basketBtn"><i class="fas fa-shopping-cart"></i>장바구니</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <script src="../resources/js/app.js"></script>
        </div>