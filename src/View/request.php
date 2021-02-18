<div id="visual" class="normal">
    <img src="resources/images/visual.jpg" alt="visual" title="visual" id="visual_img">
    <div id="visual_word">
        <p>제안 요청</p>
    </div>
</div>

<div id="content">
    <div class="content_wrap brown">
        <div class="content_box_title">
            <div class="content_box_title_circle"></div>
            <h2 class="content_title">제안 요청</h2>
        </div>

        <div class="content_box">
            <button id="request_btn">제안 요청</button>
            <table id="request_table" class="table_design">
                <thead>
                    <th>요청명</th>
                    <th>가격 한도</th>
                    <th>오차 범위</th>
                    <th></th>
                </thead>
                <tbody id="request_list">
                    <?php if($data):?>
                    <?php foreach($data as $item):?>
                    <tr>
                        <td><?=$item->request_name?></td>
                        <td><i class="fa fa-won-sign"></i> <?=number_format($item->price_limit)?></td>
                        <td><i class="fa fa-won-sign"></i> <?=number_format($item->error_range)?></td>
                        <td><a href="request/<?=$item->id?>" class="request_more_btn">상세</a></td>
                    </tr>
                    <?php endforeach;?>
                    <?php else:?>
                    <tr class="noInfo">
                        <td colspan="4">관련 정보가 없습니다.</td>
                    </tr>
                    <?php endif;?>
                </tbody>
            </table>
        </div>
    </div>
</div>

<script src="resources/js/app.js"></script>