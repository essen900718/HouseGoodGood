let map
let hN = document.getElementsByClassName('name')
let adr = document.getElementsByClassName('addr')
let time = document.getElementsByClassName('year')
let hT = document.getElementsByClassName('houseType')
let p = document.getElementsByClassName('price')
let la = document.getElementsByClassName('la')
let ln = document.getElementsByClassName('ln')


let Mn = document.getElementsByClassName('MarketName')
let Ma = document.getElementsByClassName('MarketAdr')
let Mla = document.getElementsByClassName('MarketLat')
let Mln = document.getElementsByClassName('MarketLng')

let hospn = document.getElementsByClassName('hosptalName')
let hospa = document.getElementsByClassName('hospitalAdr')
let hospla = document.getElementsByClassName('hospitalLat')
let hospln = document.getElementsByClassName('hospitalLng')

console.log(typeof(hospa[0]));
console.log(hospla[0].textContent);
console.log(hospln[0].textContent);
console.log(Mn[0].textContent);
console.log(typeof(hospn[0]));


var House = []
var Market = []
var Markers = []
var Hospital = []

let pos ={lat: 25.042053466882443 , lng: 121.520583083073}

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

//Delete Marker
function DeleteControl(controlDiv, map) {
  controlDiv.style.padding = '5px';
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = 'yellow';
  controlUI.style.border='1px solid';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Set map to London';
  controlDiv.appendChild(controlUI);
  var controlText = document.createElement('div');
  controlText.style.fontFamily='Arial,sans-serif';
  controlText.style.fontSize='12px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.innerHTML = '<b>Delete<b>'
  controlUI.appendChild(controlText);

  // Setup click-event listener: simply set the map to London
  google.maps.event.addDomListener(controlUI, 'click', function() {
    for(var i = 0 ; i < Markers.length ; i++){
      Markers[i].forEach(element => {
        element.setMap(null)
      });
    }
    Markers=[]
  });
}

function HomeControl(controlDiv,map) {
  controlDiv.style.padding = '5px';
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = 'yellow';
  controlUI.style.border='1px solid';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Set map to London';
  controlDiv.appendChild(controlUI);
  var controlText = document.createElement('div');
  controlText.style.fontFamily='Arial,sans-serif';
  controlText.style.fontSize='12px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.innerHTML = '<b>House<b>'
  controlUI.appendChild(controlText);

  // Setup click-event listener: simply set the map to London
  google.maps.event.addDomListener(controlUI, 'click', function() {
    for(var e = 0 ; e < la.length ; e++) 
    {
      var content = 'title : ' + hN[e].textContent + '</br>addr : ' + adr[e].textContent + '</br>time : ' + time[e].textContent 
      + '</br>houseType : ' + hT[e].textContent + '</br>price : ' + p[e].textContent ;

      icon = 'http://maps.google.com/mapfiles/kml/pal3/icon56.png'
      setMarker(la[e].textContent,ln[e].textContent,content,House,icon);
    }
    Markers.push(House)
  });
}

function MarketControl(controlDiv, map) {
  controlDiv.style.padding = '5px';
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = 'yellow';
  controlUI.style.border='1px solid';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Set map to London';
  controlDiv.appendChild(controlUI);
  var controlText = document.createElement('div');
  controlText.style.fontFamily='Arial,sans-serif';
  controlText.style.fontSize='12px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.innerHTML = '<b>Market<b>'
  controlUI.appendChild(controlText);

  // Setup click-event listener: simply set the map to London
  google.maps.event.addDomListener(controlUI, 'click', function() {
    for(var i = 0 ; i < Mla.length ; i++) 
    {
      var content = 'title : ' + Mn[i].textContent
      icon = 'http://maps.google.com/mapfiles/kml/pal3/icon26.png'
      setMarker(Mla[i].textContent,Mln[i].textContent,content,Market,icon);
    }
    Markers.push(Market)
  });
}

function HospitalControl(controlDiv, map) {
  controlDiv.style.padding = '5px';
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = 'yellow';
  controlUI.style.border='1px solid';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Set map to London';
  controlDiv.appendChild(controlUI);
  var controlText = document.createElement('div');
  controlText.style.fontFamily='Arial,sans-serif';
  controlText.style.fontSize='12px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.innerHTML = '<b>Hospital<b>'
  controlUI.appendChild(controlText);

  // Setup click-event listener: simply set the map to London
  google.maps.event.addDomListener(controlUI, 'click', function() {
    for(var i = 0 ; i < hospla.length ; i++) 
    {
      var content = 'title : ' + hospn[i].textContent
      icon = 'http://maps.google.com/mapfiles/kml/pal4/icon63.png'
      setMarker(hospla[i].textContent,hospln[i].textContent,content,Hospital,icon);
    }
    Markers.push(Hospital)
  });
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
    mapTypeId: "terrain",
  });

  var DeleteControlDiv = document.createElement('div');
  var Delete = new DeleteControl(DeleteControlDiv, map);

  var HomeControlDiv = document.createElement('div');
  var Home = new HomeControl(HomeControlDiv, map);

  var MarketControlDiv = document.createElement('div');
  var Mar = new MarketControl(MarketControlDiv,map)

  var HospitalControlDiv = document.createElement('div');
  var hosp = new HospitalControl(HospitalControlDiv,map)

  //  homeControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(DeleteControlDiv);
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(HomeControlDiv);
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(MarketControlDiv);
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(HospitalControlDiv);

};

//當select不同區域切換center
select.addEventListener('change', function () {
    pos = blocklist[parseInt(this.value,10)]
    initMap()
});

// function setMarker(La,Ln,tent,Marker,Icon){
//   var tempLa = parseFloat(La)
//   var tempLn = parseFloat(Ln)
//   let marker = new google.maps.Marker({
//     position: {lat: tempLa, lng: tempLn},	//marker的放置位置
//     map: map, //這邊的map指的是第四行的map變數
//     icon: Icon,
//     zIndex:5
//   }) 

//   var infowindow = new google.maps.InfoWindow({
//     content:tent,
//     size: new google.maps.Size(200,200)
//   });

//   attachInfo(marker,tent);  
//   Marker.push(marker)
// }

// //設置windowinfo
// function attachInfo(marker,tent){
//   var infowindow = new google.maps.InfoWindow({
//     content:tent,
//     size: new google.maps.Size(200,200)
//   });

//   google.maps.event.addListener(marker,'click',function () {
//     infowindow.open(marker.get('map'),marker)
//   })
// }

function setMarker(La,Ln,tent,Marker,Icon){
  var tempLa = parseFloat(La)
  var tempLn = parseFloat(Ln)
  let marker = new google.maps.Marker({
    position: {lat: tempLa, lng: tempLn},	//marker的放置位置
    map: map, //這邊的map指的是第四行的map變數
    icon: Icon,
    zIndex:5
  }) 

  var infowindow = new google.maps.InfoWindow({
    content:tent,
    size: new google.maps.Size(200,200)
  });
  
  google.maps.event.addListener(marker,'click',function () {
    infowindow.open(marker.get('map'),marker)
    DeleteMarker(Marker,marker)
    showNear(tempLa,tempLn,Markers)
  })

  Marker.push(marker)
}

function DeleteMarker(Marker,marker){
  for(var i = 0 ; i < Marker.length ; i++){
    if(Marker[i] == marker) continue
    Marker[i].setMap(null)
  }
}

function showNear(La,Ln,Markers){
  for(var i = 0 ; i < Markers.length ; i++){
    Markers[i].forEach(element => {
      tempLa = element.getPosition().lat()
      tempLn = element.getPosition().lng()
      distance = getDistance(Ln,La,tempLn,tempLa)
      console.log(distance);
      if(distance > 1)  element.setMap(null)
    });
  }
}

//計算兩經緯度之間的距離
function getDistance(LngA, LatA, LngB, LatB){
        // 地球半徑(千米)
        R = 6371.004;
        C = Math.sin(rad(LatA)) * Math.sin(rad(LatB)) + Math.cos(rad(LatA)) * Math.cos(rad(LatB)) * Math.cos(rad(LngA - LngB));
        return (R * Math.acos(C));
}

function rad(d){
   return d * Math.PI / 180.0;
}
