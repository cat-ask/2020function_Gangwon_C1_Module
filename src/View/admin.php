<div id="visual" class="normal">
            <img src="resources/images/visual.jpg" alt="visual" title="visual" id="visual_img">
            <div id="visual_word">
                <p>판매 통계 보기</p>
            </div>
        </div>
        
        <div id="content" class="admin">
            <div class="content_wrap" id="graph">
                <div class="content_box_title">
                    <div class="content_box_title_circle"></div>
                    <h2>통계 그래프</h2>
                </div>
                <div class="content_box">
                    <canvas id="graph_canvas"></canvas>
                </div>
            </div>

            <div class="content_wrap" id="table">
                <div class="content_box_title">
                    <div class="content_box_title_circle"></div>
                    <h2>판매 통계</h2>
                </div>
                <div class="content_box">
                    <table id="sell_table">
                        <thead>
                            <tr>
                                <th>구매자명</th>
                                <th>구매 상품명</th>
                                <th>구매 개수</th>
                                <th>구매일시</th>
                            </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <script src="resources/js/script.js"></script>

        </div>