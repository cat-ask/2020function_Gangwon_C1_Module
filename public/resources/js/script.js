class Script{
    constructor(){
        this.item_list = [];
        this.basket_list = localStorage.getItem('basket_list') === null ? [] : JSON.parse(localStorage.getItem('basket_list'));
        this.buy_list = localStorage.getItem('buy_list') === null ? [] : JSON.parse(localStorage.getItem('buy_list'));
        this.item_area = document.querySelector("#item_area") === null ? null : document.querySelector("#item_area");
        this.basket_area = document.querySelector("#basket_area") === null ? null : document.querySelector("#basket_area");
        this.graph_canvas = document.querySelector("#graph_canvas") === null ? null : document.querySelector("#graph_canvas");
        this.sell_table = document.querySelector("#sell_table") === null ? null : document.querySelector("#sell_table tbody");

        fetch("../resources/js/item.json")
        .then(res=>res.json())
        .then(data=>this.setting(data))
    }

    async list_setting(){
        let list = [];
        await $.ajax({
            url:"/buysInfo",
            method:"post",
            success(data){
                list = JSON.parse(data);
                localStorage.setItem("buy_list",JSON.stringify(list));
            }
        });

        this.buy_list = list;
    }

    async setting(data){
        await this.list_setting();
        
        if(this.item_area !== null){
            this.item_area.innerHTML = "";

            data.forEach((x,idx)=>{
                x.price_num = parseInt(x.price.replace(/,/g,""));
                x.num = 1;
                x.idx = idx;
                x.sum = x.price_num;
                this.item_list.push(x);
    
                let box = this.itemMake(x);
                this.item_area.appendChild(box);
                box.querySelector(".item-numberPlus").addEventListener("click",this.itemPlus);
                box.querySelector(".item-numberMin").addEventListener("click",this.itemMin);
                box.querySelector(".item-basketBtn").addEventListener("click",this.addBasket);
                box.querySelector(".item-num").addEventListener("propertychange",this.itemInput);
                box.querySelector(".item-num").addEventListener("change",this.itemInput);
                box.querySelector(".item-num").addEventListener("keyup",this.itemInput);
                box.querySelector(".item-num").addEventListener("input",this.itemInput);
            });
    
            document.querySelector("#basket_buy_btn").addEventListener("click",()=>{this.buyer_infor_form_popup()});
    
            this.basket_setting();
        }else{
            let list = this.buy_list;
            this.sell_table.innerHTML = '';
            if(list.length){
                list.forEach(x=>{
                    let {buyer_name,buy_time} = x;
                    let buy_list = JSON.parse(x.buy_list);
    
                    buy_list.forEach(item=>{
                        let box = this.sellTableMake(buyer_name,item.product_name,item.num,buy_time);
                        if(this.sell_table.firstChild) this.sell_table.insertBefore(box,this.sell_table.firstChild);
                        else this.sell_table.appendChild(box);
                    });
                });
            }else this.sell_table.innerHTML = `<tr><td colspan="4">관련 정보가 없습니다.</td></tr>`;

            this.graph_setting();
        }
    }

    graph_setting(){
        let list = [];
        let now = new Date();
        let today = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`;
        let sum = 0;

        for(let i = 0; i < 7; i++){
            sum = 0;
            now.setDate(now.getDate()-1);
            today = `${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`;

            this.buy_list.forEach(x=>{
                let date = new Date(x.buy_time);
                date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;

                if(date === today){
                    let buy_list = JSON.parse(x.buy_list);
                    buy_list.forEach(item=>{
                        sum += item.sum;
                    });
                }
            });

            list.unshift({
                "date":today,
                "sum":sum
            });
        }

        this.make_graph(list);
    }

    make_graph(list){
        let max = 0, max_step = 0.5, max_val = 0;
        let step = 0;

        list.forEach(x=>{max = max <= x.sum ? x.sum : max});
        max_val = max;
        max = Math.pow(10,max.toString().length);

        while(true){
            if((max * max_step) <= max_val)break;
            max *= max_step;
        }

        step = max / 5;
        
        let canvas_width = this.graph_canvas.getBoundingClientRect().width;
        let canvas_height = this.graph_canvas.getBoundingClientRect().height;

        let canvas_Xspace = 100,canvas_Yspace = 50;
        let canvas_Xstart = canvas_Xspace,canvas_Xend = canvas_width - canvas_Xspace;
        let canvas_Ystart = canvas_Yspace, canvas_Yend = canvas_height - canvas_Yspace;
        let canvas_Xstep = (canvas_width - canvas_Xspace * 2) / 7,canvas_Ystep = (canvas_height - canvas_Yspace * 2) / 5;

        const canvas = document.querySelector("#graph_canvas");
        const ctx = canvas.getContext('2d');

        canvas.width = canvas_width;
        canvas.height = canvas_height;

        for(let i = 0; i < 5; i++){
            ctx.strokeStyle = "#dddddd";
            ctx.lineWidth = 1;

            let y = canvas_Ystart + (canvas_Ystep * i);

            ctx.beginPath();
            ctx.moveTo(canvas_Xstart,y);
            ctx.lineTo(canvas_Xend,y);
            ctx.stroke();

            let text = max - (step * i);
            text = text.toLocaleString();

            ctx.font = '15px 나눔스퀘어라운드';
            ctx.fillText(text,canvas_Xstart - (text.length * 9),y + 4);
        }

        // Draw graph X
        for(let j = 0; j < 7; j++){
            let text = list[j].date;
            let y = canvas_Yend + 30;
            let x = (canvas_Xstart + (canvas_Xstep * j)) + (canvas_Xstep / 2 - ((text.length * 8) / 2));

            ctx.fillText(text,x,y);
        }

        // Draw value
        for(let k = 0; k < 7; k++){
            let val = list[k].sum;
                        
            let val_width = canvas_Xstep / 2;
            let arc = val_width / 2;
            let val_height = (val / step * canvas_Ystep) - arc;

            let x = canvas_Xstart + (canvas_Xstep * k) + canvas_Xstep / 4;
            let y = canvas_Yend - val_height - 2.5;

            ctx.fillStyle = "#eeeeee";
            ctx.fillRect(x,canvas_Ystart + arc,val_width,((5 * canvas_Ystep )- arc -2.5));

            ctx.beginPath();
            ctx.arc(x + val_width / 2 ,canvas_Ystart + arc ,arc,x,x + val_width);
            ctx.fill();

            if(!val) continue;
            let p = val / (max / 100);
            let color = p >= 75 ? "#96EA98" : p >=50 ? "#78E27A" : "#55CD57" ;

            ctx.fillStyle = color;
            ctx.fillRect(x,y,val_width,val_height);

            ctx.beginPath();
            ctx.arc(x + val_width / 2 ,y ,arc,x,x + val_width);
            ctx.fill();

            let val_text = val.toLocaleString();

            ctx.font = "10px 나눔스퀘어라운드";
            ctx.fillStyle = color;
            ctx.fillText(val_text,(x + val_width / 2) - (val_text.length * 5 / 2) ,y - arc - 10);
        }

        // Draw graph Y
        ctx.strokeStyle = "#555555";
        ctx.lineWidth = 5;
        
        ctx.beginPath();
        ctx.moveTo(canvas_Xstart,canvas_Yend);
        ctx.lineTo(canvas_Xend,canvas_Yend);
        ctx.stroke();

    }

    sellTableMake(buyer_name,product_name,num,buy_time){
        let box = document.createElement("tr");
        box.innerHTML = `<td>${buyer_name}</td>
                        <td>${product_name}</td>
                        <td>${num} 개</td>
                        <td>${buy_time}</td>`;
        return box;
    }

    async buyer_infor_form_popup(){
        if(!this.basket_list.length) return alert("상품을 담아주세요.");
        let list = [];
        await $.ajax({
            url:"/userInfo",
            method:"post",
            success(data){
                list = JSON.parse(data);
            }
        });

        let title = "구매자 정보입력 ";
        let content = `<form id="buyer_info_form">
                            <div class="form-control">
                                <div class="form-header">
                                    <label for="delivery_date" class="form-label">배송일</label>
                                    <p class="form-error"></p>
                                </div>
                                <input type="date" id="delivery_date" data-column="배송일" name="delivery_date" class="form-input" min="2020-10-15" max="2020-10-20">
                            </div>
                            <div class="form-control">
                                <div class="form-header">
                                    <label for="delivery_time" class="form-label">배송시간</label>
                                    <p class="form-error"></p>
                                </div>
                                <select name="delivery_time" data-column="배송시간" id="delivery_time" name="delivery_date" class="form-input">
                                    <option value="" selected>--:--</option>
                                    <option value="09:00:00">09:00</option>
                                    <option value="11:00:00">11:00</option>
                                    <option value="13:00:00">13:00</option>
                                    <option value="15:00:00">15:00</option>
                                    <option value="17:00:00">17:00</option>
                                </select>
                            </div>
                            <div class="form-control">
                                <div class="form-header">
                                    <label for="buyer_name" class="form-label">구매자명</label>
                                    <p class="form-error"></p>
                                </div>
                                <input type="text" id="buyer_name" data-column="구매자명" name="buyer_name" class="form-input success" readonly value="${list.user_name}">
                            </div>
                            <div class="form-control">
                                <div class="form-header">
                                    <label for="buyer_phone" class="form-label">전화번호</label>
                                    <p class="form-error"></p>
                                </div>
                                <input type="text" id="buyer_phone" data-column="전화번호" name="buyer_phone" class="form-input success" readonly value="${list.phone_number}">
                            </div>
                            <div class="form-control">
                                <div class="form-header">
                                    <label for="buyer_zip_code" class="form-label">우편번호</label>
                                    <p class="form-error"></p>
                                </div>
                                <input type="text" id="buyer_zip_code" data-column="우편번호" name="buyer_zip_code" class="form-input success" readonly value="${list.zip_code}">
                            </div>
                            <div class="form-control">
                                <div class="form-header">
                                    <label for="buyer_address" class="form-label">주소</label>
                                    <p class="form-error"></p>
                                </div>
                                <input type="text" id="buyer_address" data-column="주소" name="buyer_address" class="form-input success" readonly value="${list.address}">
                            </div>
                            <div class="form-control">
                                <div class="form-header">
                                    <label for="buyer_detail_address" class="form-label">상세주소</label>
                                    <p class="form-error"></p>
                                </div>
                                <input type="text" id="buyer_detail_address" data-column="상세주소" name="buyer_detail_address" class="form-input success" readonly value="${list.detail_address}">
                            </div>
                        </form>
                        <button id="buyer_info_form_btn">구매 완료</button>`;

        await this.makePopup(title,content);

        document.querySelectorAll(".form-input").forEach(x=>{
            x.addEventListener("propertychange",e=>{if(e.keyCode === 13) e.preventDefault();this.form_check(e.target);});
            x.addEventListener("change",e=>{if(e.keyCode === 13) e.preventDefault();this.form_check(e.target);});
            x.addEventListener("keyup",e=>{if(e.keyCode === 13) e.preventDefault();this.form_check(e.target);});
            x.addEventListener("input",e=>{if(e.keyCode === 13) e.preventDefault();this.form_check(e.target);});
        });

        document.querySelector("#buyer_info_form_btn").addEventListener("click",()=>{this.buyer_info_form_send()});
    }

    async buyer_info_form_send(){
        document.querySelectorAll("#buyer_info_form .form-input").forEach(x=>{this.form_check(x,false)});
        if(document.querySelector(".form-input.warnning")) return false;
        let date = new Date();
        let form = document.querySelector("#buyer_info_form");
        let sum = 0;
        let user = [];

        this.basket_list.forEach(x=>{sum += x.sum});

        this.buy_list.push({
            "delivery_date":form.delivery_date.value,
            "delivery_time":form.delivery_time.value,
            "buyer_name":form.buyer_name.value,
            "buyer_phone":form.buyer_phone.value,
            "buyer_zip_code":form.buyer_zip_code.value,
            "buyer_address":form.buyer_address.value,
            "buyer_detail_address":form.buyer_detail_address.value,
            "buy_list":JSON.stringify(this.basket_list),
            "buy_time":`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
            "buy_sum":sum
        });

        await $.ajax({
            url:"/userInfo",
            method:"post",
            success(data){user = JSON.parse(data);}
        });

        await $.ajax({
            url:"/buysAdd",
            method:"post",
            data:{
                "delivery_date":form.delivery_date.value,
                "delivery_time":form.delivery_time.value,
                "buyer_name":form.buyer_name.value,
                "buyer_id":user.id,
                "buyer_phone":form.buyer_phone.value,
                "buyer_zip_code":form.buyer_zip_code.value,
                "buyer_address":form.buyer_address.value,
                "buyer_detail_address":form.buyer_detail_address.value,
                "buy_list":JSON.stringify(this.basket_list),
                "buy_time":`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
                "buy_sum":sum
            },
            success(data){console.log(JSON.parse(data))}
        });

        this.basket_list = [];
        localStorage.setItem("basket_list",JSON.stringify(this.basket_list));
        localStorage.setItem("buy_list",JSON.stringify(this.buy_list));

        alert("구매가 정상적으로 완료되었습니다.");
        this.basket_setting();
        document.querySelector("#wrap").removeChild(document.querySelector("#popup_bc"));
    }

    basket_setting(){
        if(this.basket_list.length){
            this.basket_area.innerHTML = '';
            this.basket_list.forEach(x=>{
                let box = this.basketMake(x);
                this.basket_area.appendChild(box);
            });
        }else{
           this.basket_area.innerHTML = `<tr>
                                            <td colspan="4" style="text-align:center;">장바구니에 담긴 상품이 없습니다.</td>
                                        </tr>`;
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
        let content = "장바구니에 담겼습니다."
        let flag = false;
        let target = x.target;
        let idx = target.dataset.idx;
        let {price,price_num,num,product_name,sum} = this.item_list[idx];

        target.parentNode.parentNode.querySelector("input").value = 1;
        this.item_list[idx].num = 1;

        this.basket_list.forEach(x=>{
            if(x.idx == idx){
                x.num += num;
                x.sum += sum;
                flag = true;
                content = "추가 상품이 담겼습니다.";
            }
        });

        if(!flag) this.basket_list.push({idx,price,price_num,num,product_name,sum});

        localStorage.setItem("basket_list",JSON.stringify(this.basket_list));
        this.makeToast(content);
        this.basket_setting();
    }

    itemPlus=x=>{
        let target = x.target;
        let idx = target.dataset.idx;
        let input = target.parentNode.querySelector(".item-num");
        let val = parseInt(input.value) + 1;
        input.value = val;

        this.item_list[idx].sum = this.item_list[idx].price_num * val;
        this.item_list[idx].num = val;
    }

    itemMin=x=>{
        let target = x.target;
        let idx = target.dataset.idx;
        let input = target.parentNode.querySelector(".item-num");
        let val = parseInt(input.value) - 1;

        if(val < 1) return alert("최소 구매 수량은 1개 입니다");
        input.value = val;

        this.item_list[idx].sum = this.item_list[idx].price_num * val;
        this.item_list[idx].num = val;
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

        this.item_list[idx].sum = this.item_list[idx].price_num * val;
        this.item_list[idx].num = val;
    }

    itemMake({idx,product_name,price}){
        let box = document.createElement("div");
        box.innerHTML = `<div class="item">
                            <div class="item-body">
                                <h5 class="item-name">${product_name}</h5>
                                <h6 class="item-price"><i class="fas fa-won-sign"></i> ${price}</h6>
                                <div class="item-numberBox">
                                    <input type="number" class="item-num" min="1" value="1">
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

    form_check(target,submit=true){
        let error = target.parentNode.querySelector(".form-header > .form-error");
        let id = target.id;
        let column = target.dataset.column;
        let val = target.value;
        let error_msg = "";

        if(val === "") error_msg = `* ${column}은(는) 필수 입력 사항입니다.`;
        else if(id === "buyer_name" && val.match(/^[ㄱ-ㅎㅏ-ㅣ가-힣]{2,7}$/g) === null) error_msg = `* 이름이 입력 조건에 일치하지 않습니다.`;
        else if(id === "buyer_phone" && val.match(/^[0-9]{3}-[0-9]{4}-[0-9]{4}$/g) === null) error_msg = "* 올바른 전화번호 형태는 000-0000-0000입니다.";
        else if(id === "buyer_zip_code" && val.match(/^[0-9]{5}$/g) === null) error_msg = "* 우편번호는 5자리 숫자만 가능합니다.";
        else if(id === "delivery_date" && submit){
            document.querySelector("#delivery_time").value = "";
            document.querySelectorAll(`#delivery_time > option`).forEach(item =>{item.removeAttribute("disabled")})
            this.buy_list.forEach(x=>{
                console.log(x.delivery_date,val);
                if(x.delivery_date === val) document.querySelector(`#delivery_time > option[value='${x.delivery_time}']`).setAttribute("disabled",true);
            });
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
        setTimeout(()=>{
            $("#popup_bc").animate({
                opacity:1
            },600);
        });
    }

}

window.onload = ()=>{
    let script = new Script();
}