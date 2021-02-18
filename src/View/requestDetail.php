<div id="visual" class="normal">
    <img src="../resources/images/visual.jpg" alt="visual" title="visual" id="visual_img">
    <div id="visual_word">
        <p>제안 요청 - 상세보기</p>
    </div>
</div>

<div id="content">
    <div class="content_wrap brown">
        <div class="content_box_title">
            <div class="content_box_title_circle"></div>
            <h2 class="content_title">제안한 목록</h2>
        </div>

        <div class="content_box">
            <table id="request_detail_table" class="table_design">
                <thead>
                    <th>제안자</th>
                    <th>제안명</th>
                    <th></th>
                </thead>
                <tbody id="request_list">
                    <?php if($data):?>
                    <?php foreach($data as $item):?>
                    <tr>
                        <td><?=$item->proposer_name?></td>
                        <td><?=$item->request_name?></td>
                        <td><button class="request_detail_more_btn btn brown" data-id="<?=$item->id?>">상세</button><button class="request_detail_buy_btn btn green" data-id="<?=$item->id?>" data-request_id="<?=$item->request_id?>">구매</button></td>
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

<script src="../resources/js/app.js"></script>