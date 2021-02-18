<div id="visual" class="normal">
    <img src="resources/images/visual.jpg" alt="visual" title="visual" id="visual_img">
    <div id="visual_word">
        <p>제안하기</p>
    </div>
</div>

<div id="content">
    <div class="content_wrap green">
        <div class="content_box_title">
            <div class="content_box_title_circle"></div>
            <h2 class="content_title">제안하기</h2>
        </div>
        <div class="content_box">
            <table id="propose_table" class="table_design green">
                <thead>
                    <tr>
                        <th>요청자</th>
                        <th>요청명</th>
                        <th>가격 한도</th>
                        <th>오차 범위</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <?php if(isset($data)):?>
                    <?php foreach($data as $item):?>
                    <tr>
                        <td><?=$item->requester_name?></td>
                        <td><?=$item->request_name?></td>
                        <td><i class="fa fa-won-sign"></i> <?=number_format($item->price_limit)?></td>
                        <td><i class="fa fa-won-sign"></i> <?=number_format($item->error_range)?></td>
                        <td><a href="suggestion/<?=$item->id?>" class="propose_btn">제안</a></td>
                    </tr>
                    <?php endforeach;?>
                    <?php else:?>
                    <tr class="noInfo">
                        <td>관련 정보가 없습니다.</td>
                    </tr>
                    <?php endif;?>
                </tbody>
            </table>
        </div>
    </div>
</div>