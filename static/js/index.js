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

let collen = document.getElementsByClassName('collegeName')
let collea = document.getElementsByClassName('collegeAdr')
let collla = document.getElementsByClassName('collegeLat')
let collln = document.getElementsByClassName('collegeLng')

let chargen = document.getElementsByClassName('chargeName')
let chargea = document.getElementsByClassName('chargeAdr')
let chargela = document.getElementsByClassName('chargeLat')
let chargeln = document.getElementsByClassName('chargeLng')

let caren = document.getElementsByClassName('careName')
let carea = document.getElementsByClassName('careAdr')
let carela = document.getElementsByClassName('careLat')
let careln = document.getElementsByClassName('careLng')

let wheeln = document.getElementsByClassName('wheelName')
let wheella = document.getElementsByClassName('wheelLat')
let wheelln = document.getElementsByClassName('wheelLng')

var House = []
var Market = []
var Markers = []
var Hospital = []
var College = []
var Charge = []
var Care = []

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
  controlDiv.style.padding = '10px';
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#a281b4';
  //controlUI.style.border='1px solid';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Set map to London';
  controlDiv.appendChild(controlUI);
  var controlText = document.createElement('div');
  controlText.style.fontFamily='Open Sans Condensed';
  controlText.style.fontSize='12px';
  controlText.style.color = "rgb(255,255,255)";
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
  controlDiv.style.padding = '10px';
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#a281b4';
  //controlUI.style.border='1px solid';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Set map to London';
  controlDiv.appendChild(controlUI);
  var controlText = document.createElement('div');
  controlText.style.fontFamily='Open Sans Condensed';
  controlText.style.fontSize='12px';
  controlText.style.color = "rgb(255,255,255)";
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
  controlDiv.style.padding = '10px';
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#a281b4';
  //controlUI.style.border='1px solid';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Set map to London';
  controlDiv.appendChild(controlUI);
  var controlText = document.createElement('div');
  controlText.style.fontFamily='Open Sans Condensed';
  controlText.style.fontSize='12px';
  controlText.style.color = "rgb(255,255,255)";
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.innerHTML = '<b>WheelChair<b>'
  controlUI.appendChild(controlText);

  // Setup click-event listener: simply set the map to London
  google.maps.event.addDomListener(controlUI, 'click', function() {
    for(var i = 0 ; i < Mla.length ; i++) 
    {
      var content = 'title : ' + Mn[i].textContent
      icon = 'https://img.icons8.com/external-justicon-flat-justicon/64/000000/external-wheelchair-hospital-justicon-flat-justicon.png'
      setMarker(Mla[i].textContent,Mln[i].textContent,content,Market,icon);
    }

    for(var i = 0 ; i < wheella.length ; i++) 
    {
      var content = 'title : ' + wheeln[i].textContent
      icon = 'https://img.icons8.com/external-justicon-flat-justicon/64/000000/external-wheelchair-hospital-justicon-flat-justicon.png'
      setMarker(wheella[i].textContent,wheelln[i].textContent,content,Market,icon);
    }

    Markers.push(Market)

    for(var i = 0 ; i < House.length ; i++) 
    {
      check = false
      tempLa = House[i].getPosition().lat()
      tempLn = House[i].getPosition().lng()
      for(var e = 0 ; e < Market.length ; e++)
      {
        houseLa = Market[e].getPosition().lat()
        houseLn = Market[e].getPosition().lng()
        distance = getDistance(houseLn,houseLa,tempLn,tempLa)
        if(distance < 1) check = true
      }

      if(check == false) House[i].setMap(null)
    }

  });
}

function HospitalControl(controlDiv, map) {
  controlDiv.style.padding = '10px';
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#a281b4';
  //controlUI.style.border='1px solid';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Set map to London';
  controlDiv.appendChild(controlUI);
  var controlText = document.createElement('div');
  controlText.style.fontFamily='Open Sans Condensed';
  controlText.style.fontSize='12px';
  controlText.style.color = "rgb(255,255,255)";
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.innerHTML = '<b>Hospital<b>'
  controlUI.appendChild(controlText);

  // Setup click-event listener: simply set the map to London
  google.maps.event.addDomListener(controlUI, 'click', function() {
    for(var i = 0 ; i < hospla.length ; i++) 
    {
      var content = 'title : ' + hospa[i].textContent
      icon = 'http://maps.google.com/mapfiles/kml/pal4/icon63.png'
      setMarker(hospla[i].textContent,hospln[i].textContent,content,Hospital,icon);
    }
    Markers.push(Hospital)

    for(var i = 0 ; i < House.length ; i++) 
    {
      check = false
      tempLa = House[i].getPosition().lat()
      tempLn = House[i].getPosition().lng()
      for(var e = 0 ; e < Hospital.length ; e++)
      {
        houseLa = Hospital[e].getPosition().lat()
        houseLn = Hospital[e].getPosition().lng()
        distance = getDistance(houseLn,houseLa,tempLn,tempLa)
        if(distance < 1) check = true
      }

      if(check == false) House[i].setMap(null)
    }

  });
}

function CollegeControl(controlDiv, map) {
  controlDiv.style.padding = '10px';
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#a281b4';
  //controlUI.style.border='1px solid';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Set map to London';
  // controlUI.style.height = '20px';
  controlDiv.appendChild(controlUI);
  var controlText = document.createElement('div');
  controlText.style.color = "rgb(25,25,25)";
  controlText.style.fontFamily='Open Sans Condensed';
  controlText.style.fontSize='12px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.innerHTML = '<b>College<b>'
  controlUI.appendChild(controlText);

  // Setup click-event listener: simply set the map to London
  google.maps.event.addDomListener(controlUI, 'click', function() {
    for(var i = 0 ; i < collla.length ; i++) 
    {
      var content = 'title : ' + collen[i].textContent
      icon = 'http://maps.google.com/mapfiles/kml/pal3/icon31.png'
      setMarker(collla[i].textContent,collln[i].textContent,content,College,icon);
    }
    Markers.push(College)

    for(var i = 0 ; i < House.length ; i++) 
    {
      check = false
      tempLa = House[i].getPosition().lat()
      tempLn = House[i].getPosition().lng()
      for(var e = 0 ; e < College.length ; e++)
      {
        houseLa = College[e].getPosition().lat()
        houseLn = College[e].getPosition().lng()
        distance = getDistance(houseLn,houseLa,tempLn,tempLa)
        if(distance < 1) check = true
      }

      if(check == false) House[i].setMap(null)
    }
  });
}

function ChargeControl(controlDiv, map) {
  controlDiv.style.padding = '10px';
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#a281b4';
  //controlUI.style.border='1px solid';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Set map to London';
  // controlUI.style.height = '20px';
  controlDiv.appendChild(controlUI);
  var controlText = document.createElement('div');
  controlText.style.color = "rgb(25,25,25)";
  controlText.style.fontFamily='Open Sans Condensed';
  controlText.style.fontSize='12px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.innerHTML = '<b>Charge<b>'
  controlUI.appendChild(controlText);

  // Setup click-event listener: simply set the map to London
  google.maps.event.addDomListener(controlUI, 'click', function() {
    for(var i = 0 ; i < chargela.length ; i++) 
    {
      var content = 'title : ' + chargen[i].textContent
      icon = 'http://maps.google.com/mapfiles/kml/pal2/icon29.png'
      setMarker(chargela[i].textContent,chargeln[i].textContent,content,Charge,icon);
    }
    Markers.push(Charge)

    for(var i = 0 ; i < House.length ; i++) 
    {
      check = false
      tempLa = House[i].getPosition().lat()
      tempLn = House[i].getPosition().lng()
      for(var e = 0 ; e < Charge.length ; e++)
      {
        houseLa = Charge[e].getPosition().lat()
        houseLn = Charge[e].getPosition().lng()
        distance = getDistance(houseLn,houseLa,tempLn,tempLa)
        console.log(distance);
        if(distance < 1) check = true
      }

      if(check == false) House[i].setMap(null)
    }
  });
}

function CareControl(controlDiv, map) {
  controlDiv.style.padding = '10px';
  var controlUI = document.createElement('div');
  controlUI.style.backgroundColor = '#a281b4';
  //controlUI.style.border='1px solid';
  controlUI.style.cursor = 'pointer';
  controlUI.style.textAlign = 'center';
  controlUI.title = 'Set map to London';
  // controlUI.style.height = '20px';
  controlDiv.appendChild(controlUI);
  var controlText = document.createElement('div');
  controlText.style.color = "rgb(25,25,25)";
  controlText.style.fontFamily='Open Sans Condensed';
  controlText.style.fontSize='12px';
  controlText.style.paddingLeft = '4px';
  controlText.style.paddingRight = '4px';
  controlText.innerHTML = '<b>Care<b>'
  controlUI.appendChild(controlText);

  // Setup click-event listener: simply set the map to London
  google.maps.event.addDomListener(controlUI, 'click', function() {
    for(var i = 0 ; i < carela.length ; i++) 
    {
      var content = 'title : ' + chargen[i].textContent
      icon = 'http://maps.google.com/mapfiles/kml/pal4/icon55.png'
      setMarker(carela[i].textContent,careln[i].textContent,content,Care,icon);
    }
    Markers.push(Care)

    for(var i = 0 ; i < House.length ; i++) 
    {
      check = false
      tempLa = House[i].getPosition().lat()
      tempLn = House[i].getPosition().lng()
      for(var e = 0 ; e < Care.length ; e++)
      {
        houseLa = Care[e].getPosition().lat()
        houseLn = Care[e].getPosition().lng()
        distance = getDistance(houseLn,houseLa,tempLn,tempLa)
        if(distance < 1) check = true
      }

      if(check == false) House[i].setMap(null)
    }
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
    //mapTypeId: "terrain",
    styles:
    [
        {
            "featureType": "road",
            "stylers": [
                {
                    "hue": "#5e00ff"
                },
                {
                    "saturation": -79
                }
            ]
        },
        {
            "featureType": "poi",
            "stylers": [
                {
                    "saturation": -78
                },
                {
                    "hue": "#6600ff"
                },
                {
                    "lightness": -47
                },
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road.local",
            "stylers": [
                {
                    "lightness": 22
                }
            ]
        },
        {
            "featureType": "landscape",
            "stylers": [
                {
                    "hue": "#6600ff"
                },
                {
                    "saturation": -11
                }
            ]
        },
        {},
        {},
        {
            "featureType": "water",
            "stylers": [
                {
                    "saturation": -65
                },
                {
                    "hue": "#1900ff"
                },
                {
                    "lightness": 8
                }
            ]
        },
        {
            "featureType": "road.local",
            "stylers": [
                {
                    "weight": 1.3
                },
                {
                    "lightness": 30
                }
            ]
        },
        {
            "featureType": "transit",
            "stylers": [
                {
                    "visibility": "simplified"
                },
                {
                    "hue": "#5e00ff"
                },
                {
                    "saturation": -16
                }
            ]
        },
        {
            "featureType": "transit.line",
            "stylers": [
                {
                    "saturation": -72
                }
            ]
        },
        {}
      ]
  });

  for(var e = 0 ; e < la.length ; e++) 
  {
      var content = 'title : ' + hN[e].textContent + '</br>addr : ' + adr[e].textContent + '</br>time : ' + time[e].textContent 
      + '</br>houseType : ' + hT[e].textContent + '</br>price : ' + p[e].textContent ;

      icon = 'http://maps.google.com/mapfiles/kml/pal3/icon56.png'
      setMarker(la[e].textContent,ln[e].textContent,content,House,icon);
  }
  Markers.push(House)

  var DeleteControlDiv = document.createElement('div');
  var Delete = new DeleteControl(DeleteControlDiv, map);

  var HomeControlDiv = document.createElement('div');
  var Home = new HomeControl(HomeControlDiv, map);

  var MarketControlDiv = document.createElement('div');
  var Mar = new MarketControl(MarketControlDiv,map)

  var HospitalControlDiv = document.createElement('div');
  var hosp = new HospitalControl(HospitalControlDiv,map)

  var CollegeControlDiv = document.createElement('div');
  var coll = new CollegeControl(CollegeControlDiv,map)

  
  var ChargeControlDiv = document.createElement('div');
  var char = new ChargeControl(ChargeControlDiv,map)

  var CareControlDiv = document.createElement('div');
  var care = new CareControl(CareControlDiv,map)

  //  homeControlDiv.index = 1;
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(DeleteControlDiv);
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(HomeControlDiv);
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(MarketControlDiv);
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(HospitalControlDiv);
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(CollegeControlDiv);
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(ChargeControlDiv);
  map.controls[google.maps.ControlPosition.TOP_RIGHT].push(CareControlDiv);
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
