//指定DOM
var list = document.querySelector('.list');
var send = document.querySelector('#btn');
var resetbtn = document.querySelector('#resetbtn');
var data = JSON.parse(localStorage.getItem('listData')) || [];






//監聽&更新
send.addEventListener('click',add);
list.addEventListener('click',deleteitem);
updateList(data);

//增加資料
function add(e){
    e.preventDefault();
    var height = document.querySelector('.height').value;
    var weight = document.querySelector('.weight').value;
    var BMI = weight / [(height/100)*(height/100)];
    BMI = BMI.toFixed(1);

    //判斷是否有正確輸入數值
    if (height == ''){
        alert('請輸入身高');
        return;
    } else if (weight == ''){
        alert('請輸入體重');
        return;
    } else if ( isNaN(BMI)){
        alert('請輸入正確的數值');
        return;
    }

    //根據資料改變 #button #btn顏色
    send.innerHTML = BMI + '<p style="font-size:8px; margin:0;">BMI</p>';
    resetbtn.style.visibility = 'visible';
    var button = document.querySelector('#button');
    var rate = document.querySelector('.rate');
    var status = '';
    var borderColor = '';
    if(18.5 <= BMI && BMI <24){
        button.className = 'green';
        send.className = 'green';
        resetbtn.className = 'green';
        rate.textContent = '理想';
        status = '理想'
        borderColor = 'green';
    } else 
    if(BMI < 18.5){
        button.className = 'blue';
        send.className = 'blue';
        resetbtn.className = 'blue';
        rate.textContent = '過輕';
        status = '過輕'
        borderColor = 'blue';
    } else if(24 <= BMI && BMI < 27){
        button.className = 'orange';
        send.className = 'orange';
        resetbtn.className = 'orange';
        rate.textContent = '過重';
        status = '過重';
        borderColor = 'orange';
    } else if(27 <= BMI && BMI <30){
        button.className = 'orange';
        send.className = 'orange';
        resetbtn.className = 'orange';
        rate.textContent = '輕度肥胖';
        status = '輕度肥胖';
        borderColor = 'orange';
    } else if(30 <= BMI && BMI <35){
        button.className = 'orange2';
        send.className = 'orange2';
        resetbtn.className = 'orange2';
        rate.textContent = '中度肥胖';
        status = '中度肥胖';
        borderColor = 'orange2';
    } else if(BMI >= 35){
        button.className = 'red';
        send.className = 'red';
        resetbtn.className = 'red';
        rate.textContent = '重度肥胖';
        status = '重度肥胖';
        borderColor = 'red';
    }

    //時間
    var date = new Date();
    var MM = (date.getMonth()+1);
    var DD = date.getDate();
    var YY = date.getFullYear();
    var hours = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    var time = YY+'-'+MM+'-'+DD+' '+hours+':'+ min+':'+sec;


    var info = {
        Height: height,
        Weight: weight,
        BMI: BMI,
        Status: status,
        Time: time,
        BorderColor: borderColor,
   }

//    console.log(info);

    data.push(info);
    updateList(data);
    localStorage.setItem('listData',JSON.stringify(data));

}

//更新
function updateList(items){
    var str = '';
    var len = items.length;
    for(var i=0; len>i; i++){
        str += '<li class="'+ items[i].BorderColor + '" data-index='+ i +'><span data-index='+ i +'>' + items[i].Status +' </span><span data-index='+ i +'><small data-index='+ i +'>BMI</small>' + items[i].BMI +'</span><span data-index='+ i +'><small data-index='+ i +'>Weight</small>'+ items[i].Weight + '</span><span data-index='+ i +'><small data-index='+ i +'>Height</small>' + items[i].Height + '</span><span data-index='+ i +'>'+ items[i].Time +'</span></li>';
    }
    list.innerHTML = str;
    // console.log('update');
}

//刪除
function deleteitem(e){
    e.preventDefault();
    if(e.target.nodeName !== 'SPAN' && e.target.nodeName!=='SMALL' && e.target.nodeName!=='LI'){return}
    var index = e.target.dataset.index;
    // console.log(e.target.dataset);
    data.splice(index,1);
    updateList(data);
    localStorage.setItem('listData',JSON.stringify(data));
}


