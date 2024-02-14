import axios from 'axios';
import Alert from 'react-s-alert';
import * as config from '../store/config/config'

export async function getRival(location_, menu, name,x,y) {
  const locationArray = location_.split(" ");
  let location = '';
  await locationArray.some(item => {
    if(item[item.length - 1] === '시') {
      location = item;
      return true;
    }
    return false;
  });
  await locationArray.some(item => {
    if (item[item.length - 1] === '구'){
      location += (' ' + item);
      return true;
    }
    return false;
  });
  await locationArray.some(item => {
    if (item[item.length - 1] === '동'){
      location += (' ' + item);
      return true;
    }
    return false;
  });
  const options = {
    method: 'GET',
    headers: {
    },
    params: {
      'location': location,
      'menu': menu
    },
    url: config.vars.URL+'parsing/'
  };
  let response ;
  await axios(options)
  .then(res => {
    response = res.data;
    // console.log('received rivalList');
  })
  .catch(error => {
    // console.log(error);
    Alert.error('<h4>Server Error!<h4>'+error, {
      position: 'bottom-right',
      effect: 'slide',
      html: true
    });
  });
  // var resultList = ;
  return rankingRival(response, menu, name,x,y);
}
function rankingRival(rivalList, menu, name,x,y){
  //var json_data = JSON.parse(rivalList);
  // console.log(rivalList);
  if (rivalList.length < 3) {
	  // eslint-disable-next-line no-useless-concat
	  Alert.info('<h4>경쟁사가 3개 이하입니다.<h4>'+'메뉴를 다시 입력해 주세요!', {
      position: 'top-right',
      effect: 'slide',
      html: true
    });
    return
  }
  var json_data = rivalList;
  let count = 0;
  const rankingList = [];
  // let mapx = ''
  // let mapy = ''
  json_data.items.forEach(element => {
    //var categorys = element.category.split(',');
    console.log(element)
    if (element === null) return
    if (element.name === name) {
      console.log("같은이름이당")
      console.log(x.toFixed(7))
      console.log(y.toFixed(7))
	
	
      return
    }
    if (element == null){
      return
    }
    let keyword_score = 0;
    let menumatch_score = 0;
    let reviewcount_score = 0;
    
    if (element.category !== undefined && element.category !== null) {
      if(element['category'].match(menu) === menu){
        menumatch_score++;
      }
    }

    if(element.totalReviewCount !== undefined || element.totalReviewCount !== null){
      reviewcount_score = element.totalReviewCount.replace(',','')*1;
    }

    let total_score = keyword_score*100 + menumatch_score*200 + reviewcount_score/10;
	  let dist = distance(x.toFixed(7), y.toFixed(7), element.x, element.y,"kilometer")
	  // let dist = distance(mapx.toFixed(7), mapy.toFixed(7), element.x, element.y,"kilometer")
	  // let dist = distance( element.x, element.y,mapx, mapy,"kilometer")
	  // let dist = distance2(x.toFixed(7), y.toFixed(7), element.x, element.y)
    console.log(element.name+"dist")
    console.log(dist)
    console.log(element.x + ','+ element.y)
    console.log(element.elat)
    console.log(element.elng)
    rankingList[count] = {
      id: count++,
      imageSrc: element.imageSrc,
      name: element.name,
      category: element.category,
      microReview: element.microReview,
      priceCategory: element.priceCategory,
      totalReviewCount: element.totalReviewCount,
      x: element.x,
      y: element.y,
      distance:dist.toFixed(1) ,
      // distance:(Math.abs(mid_distance - element.distance)/1000).toFixed(2),
      address: element.roadAddr === undefined ? element.addr : element.roadAddr,
      tags: element.tags,
      checked: false,
      score: total_score
    }
  });

  rankingList.sort((a,b) => {
    return a.score > b.score ? -1 : a.score < b.score ? 1: 0;
  });
  const switchChecked = () => {
    rankingList[0].checked = true;
    if (rankingList.length > 1) rankingList[1].checked = true;
    if (rankingList.length > 2) rankingList[2].checked = true;
  };
  switchChecked();
  return rankingList;
}

//출력되는 값
 /*
  0: "id"
  1: "name"
  2: "businessCategory"
  3: "dbType"
  4: "category"
  5: "desc"
  6: "hasBooking"
  7: "hasNPay"
  8: "x"
  9: "y"
  10: "distance"
  11: "imageSrc"
  12: "imageCount"
  13: "phone"
  14: "routeUrl"
  15: "streetViewUrl"
  16: "street_panorama"
  17: "microReview"
  18: "roadAddr"
  19: "commonAddr"
  20: "addr"
  21: "blogCafeReviewCount"
  22: "bookingReviewCount"
  23: "totalReviewCount"
  24: "moreUGCReviewsPath"
  25: "moreFsasReviewsPath"
  26: "tags"
  27: "priceCategory" 
 */

 
function distance(lat1 , lon1 , lat2 , lon2 , unit ) {

	 let theta = lon1 - lon2;
	 let dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));

	dist = Math.acos(dist);
	dist = rad2deg(dist);
	// dist = dist * 60 * 1.1515;
	dist = dist * 60 * 1.2;

	if (unit === "kilometer") {
		// dist = dist * 1.609344;
		dist = dist * 1.9;
	} else if(unit === "meter"){
		dist = dist * 1609.344;
	}

	return (dist);
}
// function distance2(lat1,lng1,lat2,lng2){
//
//
// 	var r = 6371; //지구의 반지름(km)
// 	var dLat = deg2rad(lat2-lat1);
// 	var dLon = deg2rad(lng2-lng1);
// 	var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon/2) * Math.sin(dLon/2);
// 	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
// 	var d = r * c; // Distance in km
// 	return Math.round(d*1000);
//
//
// }

function  deg2rad(deg) {
	return (deg * Math.PI / 180.0);
}
//
// // This function converts radians to decimal degrees
function  rad2deg(rad) {
	return (rad * 180 / Math.PI);
}


