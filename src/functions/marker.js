import proj4 from 'proj4';

// var marker = null;
// var infowindow = null;

export function transform(data){
    console.log('여기', data);
    // const title = data.title;
    // const address = data.address;
    // const category = data.category;
    const mapx = data.mapx;
    const mapy = data.mapy;

    //좌표 변환
    proj4.defs('TM128','+proj=tmerc +lat_0=38 +lon_0=128 +k=0.9999 +x_0=400000 +y_0=600000 +ellps=bessel +units=m +no_defs +towgs84=-115.80,474.99,674.11,1.16,-2.31,-1.63,6.43');
    proj4.defs('EPSG:5179','+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=400000 +y_0=600000 +ellps=GRS80 +units=m +no_defs');
    proj4.defs('WGS84', "+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +units=degrees");
    var transform = proj4('TM128','WGS84',[parseFloat(mapx),parseFloat(mapy)])
    return transform;
}
//     var moveLatLon = new window.daum.maps.LatLng(transform[1], transform[0]);

//     // 지도 중심을 부드럽게 이동시킵니다
//     map.panTo(moveLatLon);
//     // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
//     //this.map.setCenter(moveLatLon);

//     //기존에 생성된 마커제거
//     // if(marker!=null){
//     //     marker.setMap(null);  
//     //     infowindow.close();
//     // }

//     var markerPosition  = new window.daum.maps.LatLng(transform[1], transform[0]); 

//     // 마커를 생성합니다
//     marker = new window.daum.maps.Marker({
//         position: markerPosition
//     });

//     // 마커가 지도 위에 표시되도록 설정합니다
//     marker.setMap(map);

//     //인포윈도우
// var iwContent = `<div style="padding:5px;"><strong>${title}</strong></div>`, // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
//     iwRemoveable = true, 
    
//     iwPosition = new window.daum.maps.LatLng(transform[1], transform[0]); //인포윈도우 표시 위치입니다

//     // 인포윈도우를 생성합니다
//     infowindow = new window.daum.maps.InfoWindow({
//         position : iwPosition, 
//         content : iwContent,
//         removable : iwRemoveable
//     });
    
//     // 마커 위에 인포윈도우를 표시합니다. 두번째 파라미터인 marker를 넣어주지 않으면 지도 위에 표시됩니다
//     infowindow.open(map, marker);    
