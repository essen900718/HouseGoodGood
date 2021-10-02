let map
let hN = document.getElementsByClassName('name')
let adr = document.getElementsByClassName('addr')
let time = document.getElementsByClassName('year')
let hT = document.getElementsByClassName('houseType')
let p = document.getElementsByClassName('price')

let hos = document.getElementsByClassName('Hospital')
let EFadr = document.getElementById('EF').getAttribute('d')

let pos ={lat: 25.042053466882443 , lng: 121.520583083073}
let poslist =[]
let hoslist =[]
var data,la,ln,laT,lnT

 //區域列表
 const blocklist=[
  {lat: 0 , lng: 0},
  //中正區
  {lat: 25.042053466882443, lng: 121.520583083073},
  //大同區
  {lat:25.06278553772769, lng: 121.51194139212762},
  //中山區
  {lat:25.0684987,lng: 121.5105819},
  //松山區
  {lat: 25.05, lng: 121.56666666666666},
]


for( i = 0 ; i < adr.length ;i++){
    var loc
    var dataUrl= "https://maps.googleapis.com/maps/api/geocode/json?address="+adr[i].textContent+"&key=AIzaSyAui41PhiDPXFDiZcWUbp3h6mMCJ5Bjx6Q"
    var xhr = new XMLHttpRequest()
    xhr.open('GET',dataUrl, true)
    xhr.send()
    dataparse(poslist)
}

for( i = 0 ; i < hos.length ;i++){
  var loc
  var dataUrl= "https://maps.googleapis.com/maps/api/geocode/json?address="+hos[i].textContent+"&key=AIzaSyAui41PhiDPXFDiZcWUbp3h6mMCJ5Bjx6Q"
  var xhr = new XMLHttpRequest()
  xhr.open('GET',dataUrl, true)
  xhr.send()
  dataparse(hoslist)
}
//Xhr state function
function dataparse(list) {
      //status(HTTP狀態碼):200 正常完成
      xhr.onreadystatechange = function(){

        // 如果完成(readyState=4 , 且HTTP狀態正常 status=200)
        if(this.readyState === 4 && this.status === 200){
          data = JSON.parse(this.responseText);
          laT = data["results"][0]["geometry"]["location"]["lat"]
          lnT = data["results"][0]["geometry"]["location"]["lng"]
          la = parseFloat(laT);
          ln = parseFloat(lnT);
          list.push({
              lat: la,
              lng: ln
          });
        }
      }
}

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: pos,
    zoom: 15,
    mapTypeControl:false,
    fullscreenControl:true,
    rotateControl:true,
    scaleControl:false,
    streetViewControl:false,
    zoomControl:true,
  });

};

//當select不同區域切換center
select.addEventListener('change', function () {
    pos = blocklist[parseInt(this.value,10)]
    initMap()
});

//設置所有房子的marker
function setMarker(e){
   let marker = new google.maps.Marker({
      position: poslist[e],	//marker的放置位置
      map: map, //這邊的map指的是第四行的map變數
      zIndex:3
    })   

    var content = 'title : ' + hN[e].textContent + '</br>addr : ' + adr[e].textContent + '</br>time : ' + time[e].textContent 
    + '</br>houseType : ' + hT[e].textContent + '</br>price : ' + p[e].textContent ;

    attachInfo(marker,content);
}

//設置所有醫院的marker
function setHosMarker(e){
  let marker = new google.maps.Marker({
     position: hoslist[e],	//marker的放置位置
     map: map, //這邊的map指的是第四行的map變數
     label: 'H',
     zIndex:3
   })   

   var content = 'title : ' + hos[e].textContent

   attachInfo(marker,content);  
}

//設置windowinfo
function attachInfo(marker,tent){
  var infowindow = new google.maps.InfoWindow({
    content:tent,
    size: new google.maps.Size(200,200)
  });

  google.maps.event.addListener(marker,'click',function () {
    infowindow.open(marker.get('map'),marker)
  })
}

document.getElementById("btn").addEventListener("click", Click);

function Click() {
    for(var i = 0 ; i < hos.length ; i++)
      setHosMarker(i)
}

