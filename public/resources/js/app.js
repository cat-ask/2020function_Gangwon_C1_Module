class App{
    constructor(){
        this.suggestion_list = [];
        this.suggestion_basket = [];
        this.suggestion_basket_area = document.querySelector("#suggestion_area");
        this.suggestion_area = document.querySelector("#suggestion_list_area");
        this.setEvent();
    }

    setEvent(){
        if(document.querySelector(".content_wrap#join")){
            document.querySelectorAll(".form-input").forEach(x=>{
                $(x).on("propertychange change keyup input",e=>{if(e.keyCode == 13) e.preventDefault();this.form_check(e.target)});
            });

            document.querySelector("#join_btn").addEventListener("click",()=>{this.joinProcess()});
        }
        
        if(document.querySelector("#request_btn")){document.querySelector("#request_btn").addEventListener("click",()=>{this.requestPopup();});}
        if(document.querySelector("#suggestion_list_area")){
            fetch("../resources/js/item.json")
            .then(res=>res.json())
            .then(data=>this.suggestion_setting(data));
        }

        if(document.querySelector(".request_detail_more_btn")){
            document.querySelectorAll(".request_detail_more_btn").forEach(x=>{x.addEventListener("click",(e)=>{this.request_detail_more(e.target);});});
            document.querySelectorAll(".request_detail_buy_btn").forEach(x=>{x.addEventListener("click",(e)=>{this.request_detail_buy(e.target);});});
        }
    }

    request_detail_buy(target){
        let idx = target.dataset.id;
        let request_id = target.dataset.request_id;

        console.log(idx,request_id);

        $.ajax({
            url:"/proposeAddRequest",
            method:"post",
            data:{
                "request_id":request_id,
                "propose_id":idx
            },
            success(data){
                console.log(JSON.parse(data));
                alert("해당 상품이 구매되었습니다.");
                location.href="/request";
            }
        })
    }

    async request_detail_more(target){
        let idx = target.dataset.id;
        let propose = [];
        let list = [];
        let sum = 0;
        await $.ajax({
            url:"/proposeInfo",
            method:"post",
            data:{id:idx},
            success(data){
                propose = JSON.parse(data);
                list = JSON.parse(propose.item_list);
                list.forEach(x=>{sum+=x.sum});
            }
        });

        let title = "상세보기";
        let content = `<table class="table_design" id="request_detail_more_table">
                        <thead>
                            <tr>
                                <th>상품명</th>
                                <th>개수</th>
                            </tr>
                        </thead>
                        <tbody>`;
        list.forEach(x=>{
            content += `<tr>
                            <td>${x.product_name}</td>
                            <td>${x.num} 개</td>
                        </tr>`;
        });
        content +=`</tbody>
                </table>
                <p id="request_detail_more_sum">총 합계 : ${sum.toLocaleString()}원</p>`;
        
        this.makePopup(title,content);
    }

    suggestion_setting(data){
        this.suggestion_area.innerHTML = "";

        data.forEach((x,idx)=>{
            x.price_num = parseInt(x.price.replace(/,/g,""));
            x.num = 1;
            x.idx = idx;
            x.sum = x.price_num;
            this.suggestion_list.push(x);

            let box = this.itemMake(x);
            this.suggestion_area.appendChild(box);
            box.querySelector(".item-numberPlus").addEventListener("click",this.itemPlus);
            box.querySelector(".item-numberMin").addEventListener("click",this.itemMin);
            box.querySelector(".item-basketBtn").addEventListener("click",this.addBasket);
            box.querySelector(".item-num").addEventListener("propertychange",this.itemInput);
            box.querySelector(".item-num").addEventListener("change",this.itemInput);
            box.querySelector(".item-num").addEventListener("keyup",this.itemInput);
            box.querySelector(".item-num").addEventListener("input",this.itemInput);
        });

        this.basket_setting();
        document.querySelector("#suggestion_btn").addEventListener("click",this.suggestion_send);
    }

    suggestion_send=e=>{
        let min = e.target.dataset.min;
        let max = e.target.dataset.max;
        let idx = e.target.dataset.id;
        let sum = 0;
        this.suggestion_basket.forEach(x=>{sum+=x.sum});

        if(sum < 1) return alert("상품을 담아주세요.");
        if(sum < min) return alert(`총 가격은 ${min.toLocaleString()}원 이상이어야합니다.`);
        if(sum > max) return alert(`총 가격은 ${max.toLocaleString()}원 이하여야합니다.`);

        $.ajax({
            url:"/proposeAdd",
            method:"post",
            data:{
                item_list:JSON.stringify(this.suggestion_basket),
                request_id:idx,
            },
            success(data){
                alert("성공적으로 제안되었습니다.");
                location.href = "/propose";
            }
        });
    }

    basket_setting(){
        let suggestion_sum = document.querySelector(".suggestion_sum");
        if(this.suggestion_basket.length){
            let sum = 0;
            this.suggestion_basket_area.innerHTML = '';
            
            this.suggestion_basket.forEach(x=>{
                sum += x.sum;
                let box = this.basketMake(x);
                this.suggestion_basket_area.appendChild(box);
            });

            suggestion_sum.innerHTML = sum.toLocaleString();
            if(suggestion_sum.dataset.min > sum || suggestion_sum.dataset.max < sum){
                suggestion_sum.classList.remove("success");
                suggestion_sum.classList.add("warnning");
            }else{
                suggestion_sum.classList.add("success");
                suggestion_sum.classList.remove("warnning");
            }
        }else{
           this.suggestion_basket_area.innerHTML = `<tr>
                                            <td colspan="4" style="text-align:center;">담은 상품 목록에 담긴 상품이 없습니다.</td>
                                        </tr>`;
            suggestion_sum.classList.remove("warnning");
            suggestion_sum.classList.remove("success");
        }
    }

    basketMake({product_name,price,num,sum}){
        let box = document.createElement("tr");
        box.innerHTML = `<td>${product_name}</td>
                         <td><i class="fas fa-won-sign"></i>${price}</td>
                         <td>${num} 개</td>
                         <td><i class="fas fa-won-sign"></i>${sum.toLocaleString()}</td>`;
        return box;
    }

    addBasket=x=>{
        let content = "담은 상품 목록에 담겼습니다."
        let flag = false;
        let target = x.target;
        let idx = target.dataset.idx;
        let {price,price_num,num,product_name,sum} = this.suggestion_list[idx];

        target.parentNode.parentNode.querySelector("input").value = 1;
        this.suggestion_list[idx].num = 1;

        this.suggestion_basket.forEach(x=>{
            if(x.idx == idx){
                x.num += num;
                x.sum += sum;
                flag = true;
                content = "추가 상품이 담겼습니다.";
            }
        });

        if(!flag) this.suggestion_basket.push({idx,price,price_num,num,product_name,sum});

        this.makeToast(content);
        this.basket_setting();
    }

    itemPlus=x=>{
        let target = x.target;
        let idx = target.dataset.idx;
        let input = target.parentNode.querySelector(".item-num");
        let val = parseInt(input.value) + 1;
        input.value = val;

        this.suggestion_list[idx].sum = this.suggestion_list[idx].price_num * val;
        this.suggestion_list[idx].num = val;
    }

    itemMin=x=>{
        let target = x.target;
        let idx = target.dataset.idx;
        let input = target.parentNode.querySelector(".item-num");
        let val = parseInt(input.value) - 1;

        if(val < 1) return alert("최소 구매 수량은 1개 입니다");
        input.value = val;

        this.suggestion_list[idx].sum = this.suggestion_list[idx].price_num * val;
        this.suggestion_list[idx].num = val;
    }

    itemInput=x=>{
        let target = x.target;
        let idx = target.dataset.idx;
        let val = parseInt(target.value);

        if(val < 1){
            target.value = 1;
            return alert("최소 구매 수량은 1개 입니다");
        }

        target.value = val;

        this.suggestion_list[idx].sum = this.suggestion_list[idx].price_num * val;
        this.suggestion_list[idx].num = val;
    }

    itemMake({idx,product_name,price}){
        let box = document.createElement("div");
        box.innerHTML = `<div class="item">
                            <div class="item-body">
                                <h5 class="item-name">${product_name}</h5>
                                <h6 class="item-price"><i class="fas fa-won-sign"></i> ${price}</h6>
                                <div class="item-numberBox">
                                    <input data-idx="${idx}" type="number" class="item-num" min="1" value="1">
                                    <button data-idx="${idx}" class="item-numberBtn item-numberPlus"><i class="fas fa-plus"></i></button>
                                    <button data-idx="${idx}" class="item-numberBtn item-numberMin"><i class="fas fa-minus"></i></button>
                                </div>
                                <div class="item-buttonBox">
                                    <button class="item-basketBtn" data-idx="${idx}"><i class="fas fa-shopping-cart"></i>장바구니</button>
                                </div>
                            </div>
                        </div>`;
        return box.firstChild;
    }

    makeToast(content){
        if(document.querySelector("#toast")) document.querySelector("#wrap").removeChild(document.querySelector("#toast"));

        let box = document.createElement("div");
        box.innerHTML = `<div id="toast">${content}</div>`;
        document.querySelector("#wrap").appendChild(box.firstChild);

        setTimeout(()=>{
            document.querySelector("#toast").classList.add("close");
        },3000);
    }

    requestPopup(){
        let title = "요청 정보";
        let content = `<form action="/requestAdd" id="request_form" name="request_form" class="form_design" method="post">
                            <div class="form-control">
                                <div class="form-header">
                                    <label for="request_name" class="form-label">요청명</label>
                                    <p class="form-error"></p>
                                </div>
                                <input type="text" id="request_name" name="request_name" class="form-input" data-column="요청명">
                            </div>
                            <div class="form-control">
                                <div class="form-header">
                                    <label for="price_limit" class="form-label">가격 한도</label>
                                    <p class="form-error"></p>
                                </div>
                                <input type="number" id="price_limit" name="price_limit" class="form-input" data-column="가격 한도">
                            </div>
                            <div class="form-control">
                                <div class="form-header">
                                    <label for="error_range" class="form-label">오차 범위</label>
                                    <p class="form-error"></p>
                                </div>
                                <input type="number" id="error_range" name="error_range" class="form-input" data-column="오차 범위">
                            </div>
                        </form>
                        
                        <button id="request_send_btn">요청</button>`;
        this.makePopup(title,content);

        document.querySelectorAll(".form-input").forEach(x=>{$(x).on("propertychange change keyup input",(e)=>{if(e.keyCode==13) e.preventDefault(); this.form_check(e.target)})});
        document.querySelector("#request_send_btn").addEventListener("click",()=>{this.requestSend()});
    }

    requestSend(){
        document.querySelectorAll(".form-input").forEach(x=>{this.form_check(x,false)});
        if(document.querySelector(".warnning")) return false;

        document.querySelector("#request_form").submit();
    }

    joinProcess(){
        document.querySelectorAll(".form-input").forEach(x=>{
            this.form_check(x);
        });

        if(document.querySelector(".warnning")) return false;
        else document.querySelector("#join_form").submit();
    }

    async form_check(target,send=true){
        let id = target.id;
        let column = target.dataset.column;
        let error = column !== "회원타입" ? target.parentNode.querySelector(".form-header > .form-error") : target.parentNode.parentNode.querySelector(".form-header > .form-error");
        let val = target.value;
        let error_msg = "";

        if(val === "") error_msg = `* ${column}은(는) 필수 입력 사항입니다.`;
        else if(id === "user_name" && val.match(/^[ㄱ-ㅎㅏ-ㅣ가-힣]{2,7}$/g) === null) error_msg = `* 이름이 입력 조건에 일치하지 않습니다.`;
        else if(id === "phone_number" && val.match(/^[0-9]{3}-[0-9]{4}-[0-9]{4}$/g) === null) error_msg = "* 올바른 전화번호 형태는 000-0000-0000입니다.";
        else if(id === "zip_code" && val.match(/^[0-9]{5}$/g) === null) error_msg = "* 우편번호는 5자리 숫자만 가능합니다.";
        else if(id === "password_check" && val !== document.querySelector("#password").value) error_msg = "* 비밀번호와 비밀번호 확인이 일치하지 않습니다.";
        else if(id === "user_id"){
            await $.ajax({
                url:"/joinCheck",
                method:"post",
                data:{"user_id":val},
                success(data){
                    if(!JSON.parse(data)) error_msg = "* 이미 있는 아이디입니다.";
                }
            });
        }
        else if(id === "error_range" && (document.querySelector("#price_limit").value / 2) < val){
            error_msg = "* 오차범위는 가격 한도의 50% 이내여야합니다.";
            target.value = parseInt(document.querySelector("#price_limit").value / 2);
        }
        else if(id === "price_limit" && send){
            document.querySelector("#error_range").value = "";
            document.querySelector("#error_range").classList.remove("warnning");
            document.querySelector("#error_range").classList.remove("success");
        }

        if(error_msg === ""){
            error.innerHTML = "";
            target.classList.remove("warnning");
            target.classList.add("success");
        }else{
            error.innerHTML = error_msg;
            target.classList.add("warnning");
            target.classList.remove("success");
        }
    }

    makePopup(title,content){
        let box = document.createElement("div");
        box.innerHTML = `<div id="popup_bc">
                            <div id="popup">
                                <button id="popupClose"><i class="fas fa-times"></i></button>
                                <div id="popup_header">
                                    <h5>${title}</h5>
                                </div>
                                <div id="popup_body">
                                    ${content}
                                </div>
                            </div>
                        </div>`;

        box.querySelector("#popupClose").addEventListener("click",()=>{
            $("#popup_bc").fadeOut(600,()=>{document.querySelector("#wrap").removeChild(document.querySelector("#popup_bc"));});
        });

        document.querySelector("#wrap").appendChild(box.firstChild);
        setTimeout(()=>{$("#popup_bc").animate({opacity:1},600);});
    }

}

window.onload = () =>{
    let app = new App();
}