<div id="visual" class="normal">
            <img src="resources/images/visual.jpg" alt="visual" title="visual" id="visual_img">
            <div id="visual_word">
                <p>쇼핑몰</p>
            </div>
        </div>
        
        <div id="content">
            <div class="content_wrap" id="shopping_basket">
                <div class="content_box_title">
                    <div class="content_box_title_circle"></div>
                    <h2>장바구니</h2>
                </div>
                <div class="content_box">
                    <table id="basket_table">
                        <thead>
                            <tr>
                                <th>상품명</th>
                                <th>가격</th>
                                <th>구매 개수</th>
                                <th>총 가격</th>
                            </tr>
                        </thead>
                        <tbody id="basket_area">

                        </tbody>
                    </table>
                    <button id="basket_buy_btn">구매</button>
                </div>
            </div>

            <div class="content_wrap" id="shopping_item">
                <div class="content_box_title">
                    <div class="content_box_title_circle"></div>
                    <h2>상품</h2>
                </div>
                <div class="content_box" id="item_area">
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

            <a id="sell_statistics_page" href="admin">판매 통계 페이지</a>
            <script src="resources/js/script.js"></script>
        </div>