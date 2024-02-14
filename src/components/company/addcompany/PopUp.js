/*global kakao*/
import React from 'react';
import ScrollBar from 'react-free-scrollbar';
import * as api from '../../../functions/api';
import '../../../assets/css/popupstyle.css';
import NameItem from './NameItem';
import * as transform from '../../../functions/marker';
import * as TYPE from "../../../stringType";

class PopUp extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            items: [],
            loaded: false,
            search_first:true,
	          click_handle:true,
	        customAddressTitle:'',
	        customAddress:'',
	        customLat:'',
	        customLng:'',
	        customMapInput:false
        }
	    this.kakao = kakao.maps;
	
    }
    map;
    markers = []
    infowindows = []
    componentDidMount(){
      var container = document.getElementById('myMap'); //지도를 담을 영역의 DOM 레퍼런스
      var options = { //지도를 생성할 때 필요한 기본 옵션
          center: new kakao.maps.LatLng(35.157588, 129.058822), //지도의 중심좌표.
          level: 4 //지도의 레벨(확대, 축소 정도)
      };
      
      this.map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
	
	    // 좌표-주소로 변환 도와줄
	    // geocoder 라이브러리
	    const geocoder = new kakao.maps.services.Geocoder();
	
	    // mousedown 이벤트 맵에 등록
	
	    // 드래그가 끝날 때 이벤트 발생
	    this.kakao.event.addListener(this.map, 'drag', () => {
	    	console.log("드래그1")
		    this.setState({
			    click_handle:false
		    })
	    });
	    // 드래그가 끝날 때 이벤트 발생
	    this.kakao.event.addListener(this.map, 'dragend', () => {
		    console.log("드래그2")
		    console.log(this.state.customMapInput)
		    this.setState({
			    click_handle:true,
		    })
	    });
      this.kakao.event.addListener(this.map, 'mouseup', (mouseEvent) => {
      	
      	// click_handle, customMapInput = true일 때,
	      // default : click_handle = true, customMapInput = false
	      // click_handle : addListener 한번 돌려놓고 false로 바꿈. 이유는 다른 click 이벤트와 겹치지 않게 하기 위함
	      // customMapInput : 지도 위 마커 등록 버튼 활성화 일때만 클릭 가능하게끔 하기. 버튼 누르면 true, 팝업 닫히거나 확인 눌렀을때 false
	      console.log(this.state.customMapInput)
	      console.log(this.state.click_handle)
      	if(this.state.click_handle && this.state.customMapInput){
          this.removeMarker();
          // this.addMarker()
	        //geocoder 라이브러리 addressSearch 메서드 사용
	        console.log(mouseEvent)
	        geocoder.coord2Address(mouseEvent.latLng.getLng(), mouseEvent.latLng.getLat(), async (result, status) => {
		        let address =''
		        if(result.length>=1) {
			        if (result[0].road_address != null && result[0].road_address != undefined) {
				        address = result[0].road_address.address_name
			        }
			        else {
				        if (result[0].address != null && result[0].address != undefined) {
					        address = result[0].address.address_name
				        }
				        else {
					        address = "주소 정보 없음"
				        }
			        }
		        }
		        else {
			        if (result.length >= 1) {
				        if (result.road_address != null && result.road_address != undefined) {
					        address = result.road_address.address_name
				        }
				        else {
					        if (result.address != null && result.address != undefined) {
						        address = result.address.address_name
					        }
					        else {
						        address = "주소 정보 없음"
					        }
				        }
			        }
		        }
		        console.log(address)
		        if (status === kakao.maps.services.Status.OK) {
			        const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
			        console.log(coords);
			        this.setState({
				        customAddressTitle:'',
				        customAddress:address,
				        // customLat:mouseEvent.latLng.getLat(),
				        // customLng:mouseEvent.latLng.getLng(),
			        })
			        this.addMarker(mouseEvent.latLng)
		        }
	        });
	        this.setState({
		        click_handle:false
	        })
        }
      });
    }
    //items = new Array();
    getData = async (e) => {
        let { markers, infowindows, map } = this;
        e.preventDefault();
        // console.log(this.state.name);
        // kakao.maps.Marker.setMap(null);
        // kakao.maps.InfoWindow.close();
        this.setState({
	        search_first:false
        })
        while(markers.length){
            let marker = markers.pop()
            marker.setMap(null);
            let infowindow = infowindows.pop()
            infowindow.close();
        }
        try {
            const response = await api.getAPOD(this.state.name);
            await console.log(response.items.length);
            this.setState({
                items: []
            })
            if (map.getLevel() !== 4) {
                map.setLevel(4)
            }
            if (response.items.length === 0) {
                map.panTo(new kakao.maps.LatLng(35.157588, 129.058822));
                return
            }
            let centerX = 0, centerY = 0;
            let swX, swY, neX, neY;
            for(let i=0;i<response.items.length;i++){
                let tmpTitle = response.items[i].title;
                tmpTitle = tmpTitle.replace(/<b>/g,"");
                tmpTitle = tmpTitle.replace(/<\/b>/g,"");
                this.setState({
                    items: this.state.items.concat({
                        id: i,
                        title : tmpTitle,
                        category : response.items[i].category,
                        address : response.items[i].roadAddress,
                        mapx : response.items[i].mapx,
                        mapy : response.items[i].mapy
                    })
                })
                const XY = transform.transform(response.items[i])
                centerX += XY[1]
                centerY += XY[0]
                if (i === 0) {
                    swX = XY[0]
                    swY = XY[1]
                    neX = XY[0]
                    neY = XY[1]
                }
                else {
                    swX = Math.min(swX, XY[0])
                    swY = Math.min(swY, XY[1])
                    neX = Math.max(neX, XY[0])
                    neY = Math.max(neY, XY[1])
                }
                let marker = new kakao.maps.Marker({
                    position: new kakao.maps.LatLng(XY[1], XY[0])
                })
                // 마커가 지도 위에 표시되도록 설정합니다
                marker.setMap(map);
                markers.push(marker);
                let infowindow = new kakao.maps.InfoWindow({
                    position: new kakao.maps.LatLng(XY[1], XY[0]),
                    content: `<div style="padding:5px;"><strong>${tmpTitle}</strong></div>`,
                    removable: true
                })
                infowindow.open(map, marker);
                infowindows.push(infowindow);
            }
            map.panTo(new kakao.maps.LatLng(centerX / response.items.length, centerY / response.items.length));
            let bounds = map.getBounds()
            console.log(swX, swY)
            console.log(bounds.getSouthWest())
            console.log(neX, neY)
            console.log(bounds.getNorthEast())
            while(1){
                let bounds = map.getBounds()
                if (bounds.getSouthWest().ib > swX || bounds.getSouthWest().jb > swY || bounds.getNorthEast().ib < neX || bounds.getNorthEast().jb < neY) {
                    map.setLevel(map.getLevel() + 1)
                }
                else break
            }

            // await console.log(this.state.items);
            // marker.createMarker(this.map, response.items[0]);
        }
        catch (e) {
            // 오류가 났을 경우
            console.log(e);
        }
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleToggle = (id) => {
        const { items } = this.state;
        let { markers, infowindows, map } = this;
        if (map.getLevel() !== 4) {
            map.setLevel(4)
        }
        while(markers.length){
            let marker = markers.pop()
            marker.setMap(null);
            let infowindow = infowindows.pop()
            infowindow.close();
        }
        //파라미터로 받은 id를 가지고 몇번째 아이템인지 찾습니다.
        const index = items.findIndex(item => item.id === id);
        const selected = items[index]; // 선택한 객체
      
        // this.props.autoInput(selected.title, selected.address, selected.category,XY[1], XY[0]);
        //marker.createMarker(this.map, selected);
        const XY = transform.transform(selected)
	    console.log(XY[1])
	    console.log(XY[0])
	    this.props.autoInput(selected.title, selected.address, selected.category,XY[0], XY[1]);
	
	    let marker = new kakao.maps.Marker({
            position: new kakao.maps.LatLng(XY[1], XY[0])
        })
        let infowindow = new kakao.maps.InfoWindow({
            position: new kakao.maps.LatLng(XY[1], XY[0]),
            content: `<div style="padding:5px;"><strong>${selected.title}</strong></div>`,
            removable: true
        })
        marker.setMap(map);
        markers.push(marker);
        infowindow.open(map, marker);
        infowindows.push(infowindow)
        map.panTo(new kakao.maps.LatLng(XY[1], XY[0]));
    }
	removeMarker = () => {
		if (this.markers) {
			if (this.markers.length > 0) {
				for (let i = 0; i < this.markers.length; i += 1) {
					this.markers[i].setMap(null);
					// this.removeEventHandle(this.contents[i], 'mousemove', this.onMouseDown);
				}
				this.markers = [];
				this.contents = [];
				
			}
		}
		this.setState({
			click_handle:true,
			customMapInput:false
		})
	}
	addMarker(mouseLatLng) {
		const content = document.createElement('div');
		content.className = 'overlay_info';

		
		
		// const w1 = document.createElement('div');
		// w1.innerHTML = `<input type="text" name="customAddressTitle" class="marker-input" placeholder="표시할 이름?"  onkeyup=${() => this.handleChangeAddressTitle} />`;
		const w2 = document.createElement('div');
		w2.innerHTML = `<button class="goto_" onmouseup=${() => this.onMouseUp()}>확인</button>`;
		
		
		content.innerHTML = `<div class='post-marker'>
							<div class="kind">`+`
							
							
							</div>
							<div class='average-price'>
								<span>${this.state.customAddress}</span>
							</div>
							<div>
								<div class='counting'}>`+ w2.innerHTML +`
								
								</div>
							</div>
						</div>`;
		
		
		// 커스텀 오버레이가 표시될 위치입니다
    let latlng= mouseLatLng
		const po = new this.kakao.LatLng(latlng.getLat(), latlng.getLng());
    this.setState({
	    customLat:latlng.getLat(),
	    customLng:latlng.getLng(),
    })
    console.log(po)
		// 커스텀 오버레이를 생성합니다
		const mapCustomOverlay = new this.kakao.CustomOverlay({
			position: po,
			content: content,
			// xAnchor: 0.5, // 커스텀 오버레이의 x축 위치입니다. 1에 가까울수록 왼쪽에 위치합니다. 기본값은 0.5 입니다
			// yAnchor: 1.1 // 커스텀 오버레이의 y축 위치입니다. 1에 가까울수록 위쪽에 위치합니다. 기본값은 0.5 입니다
		});
		// 커스텀 오버레이를 지도에 표시합니다
		mapCustomOverlay.setMap(this.map);
		this.markers.push(mapCustomOverlay);
		// w1.addEventListener('onchange', this.handleChangeAddressTitle);
		// w2.addEventListener('mouseup', this.onMouseUp);
		// this.contents.push(content);
		
		content.addEventListener('onkeypress',this.handleChangeAddressTitle)
		content.addEventListener('mouseup',this.onMouseUp)
		// content.addEventListener('click', () => {
		// 	this.map.panTo(po);
		// 	// this.props.buildingPushData(row);
		// });
	}
	onMouseUp = (e)=> {
		const object = e.target
		console.log(object);
		
		if (object.classList.contains('goto_')) {
			console.log('dd')
			console.log(this.state.customLat)
			this.props.autoInput(this.state.customAddressTitle, this.state.customAddress,'' ,this.state.customLng,this.state.customLat);
			
			this.removeMarker()
			this.props.closePopup()
		}
		
	}
	
	focusOn = (e) => {
    	e.target.focus()
	}
	
	handleChangeAddressTitle = (e) => {
    	console.log(e.target.value)
		this.setState({
			[e.target.name]: e.target.value
		})
	}
	// handleChangeAddressTitle = (e) => {
   //
   //
	// 	const object = e.target
	// 	console.log(object);
	// 	if (object.classList.contains('marker-input')) {
	// 		console.log(e.target.value);
	// 		this.setState({customAddressTitle: e.target.value})
	// 	}
	// };
	onCustomMapInput = () =>{
		this.removeMarker()
		this.setState({
			customMapInput:true
		})
		console.log(this.state.customMapInput)
		console.log(this.state.click_handle)
	}
	addEventHandle(target, type, callback) {
		// target node에 이벤트 핸들러를 등록하는 함수힙니다
		if (target.addEventListener) { // Internet Explorer 11
			target.addEventListener(type, callback);
		} else { // below version 11
			target.attachEvent(`on${type}`, callback);
		}
	}
	removeEventHandle(target, type, callback) {
		// target node에 등록된 이벤트 핸들러를 제거하는 함수힙니다
		if (target.removeEventListener) {
			target.removeEventListener(type, callback);
		} else {
			target.detachEvent(`on${type}`, callback);
		}
	}
	
	getLatLng() {
		const bounds = this.map.getBounds();
		// 영역의 남서쪽 좌표를 얻어옵니다
		const swLatLng = bounds.getSouthWest();
		// 영역의 북동쪽 좌표를 얻어옵니다
		const neLatLng = bounds.getNorthEast();
		const message = `지도의 남서쪽 좌표는 ${swLatLng.getLat()}, ${swLatLng.getLng()} 이고 <br>
		북동쪽 좌표는 ${neLatLng.getLat()}, ${neLatLng.getLng()} 입니다`;
		const args = {
			sw_lat: swLatLng.getLat(),
			sw_lng: swLatLng.getLng(),
			ne_lat: neLatLng.getLat(),
			ne_lng: neLatLng.getLng(),
			message: message,
		};
		return args;
	}
	searchAddrFromCoords(coords, callback) {

		// const geocoder = kakao.maps.services.Geocoder();
		// // const geocoder = new mapObject.services.Geocoder();
		// console.log('keyowrd', keyword);
		// // getSearch(keyword).then((request) => {
		// // 	console.log('getSearch : ', request);
		// // 	object.props.reLoad(request.data);
		// // })
		// // 주소로 좌표를 검색합니다
		// geocoder.addressSearch(keyword, function (result, status) {
		// 	console.log('reuslt', result);
		// 	console.log('status', status);
		// 	if (status === mapObject.services.Status.OK) {
		//         console.log('확인')
		// 		const args = {
		// 			lat: Number(result[0].y),
		// 			lng: Number(result[0].x),
		// 		};
		// 		object.props.reLoad(args);
		// 	} else {
		// 		console.log('확인');
		// 		getSearchMapXY(keyword).then((request) => {
		// 			if (request.data.x || request.data.y) {
		// 				const args = {
		// 					lat: Number(request.data.x),
		// 					lng: Number(request.data.y),
		// 				};
		// 				object.props.reLoad(args);
		// 			} else {
		// 				alert('검색 결과가 없습니다.');
		// 			}
		// 		});
		// 	}
		// });
	}
    render() {
        const List = this.state.items.map(
            ({id, title, category, address, mapx, mapy}) => (
                <NameItem
                    id={id}
                    title={title}
                    category={category}
                    address={address}
                    mapx={mapx}
                    mapy={mapy}
                    key={id}
                    onToggle={this.handleToggle}
                />
            )
        )
        
        return (
            <div className='popup'>
                <div className='popup_inner'>
                    <div role="presentation" className='mm-popup__overlay'></div>
                    <article role='dialog' tabIndex='-1' className='mm-popup__box mm-popup__box--alert' style={{opacity:'1',outline: 'none'}}>
                    <button className="mm-popup__close" onClick={this.props.closePopup}></button>
                    <header className='mm-popup__box__header'>
                        <h1 className='mm-popup__box__header__title'>기업정보 입력</h1>
                    </header>
                    <div className='mm-popup__box__body'>
                        <div>
                            <form onSubmit={this.getData}>
                            <div className="search-wrapper page-search">
                                {/* <button className="search-button-submit" type="submit"><i className="icon dripicons-search"></i></button> */}
                                
                                <input
                                    value={this.state.name}
                                    onChange={this.handleChange}
                                    name="name"
                                    type="text"
                                    className="search-input"
                                    placeholder="Search..."
                                    autoComplete="off"/>
                                
                            </div>
                            </form>
                            <div className="itemList">
	                            <ScrollBar style={{width: "45%", height: "100%"}}>
	                            {
		                            List.length===0 &&
		                            !this.state.search_first ?
			
			                            <ul>
				                            <li><div className="card_body" ><span>검색 결과가 없습니다.</span></div> </li>
			                            </ul>  :
			                           
			                            <ul>
				                            {List}
			                            </ul>
			                            
			                         
	                            }
	                            </ScrollBar>
                            <div id='myMap'/>
                            </div>
                            
                        </div>
                    </div>
                    <footer className="mm-popup__box__footer">
                        <div className="mm-popup__box__footer__left-space">
                            <button className="mm-popup__btn mm-popup__btn--cancel btn line purple" onClick={this.props.closePopup}>작성 취소</button>
                        </div>
                        <div className="mm-popup__box__footer__right-space">
                            <button className="mm-popup__btn mm-popup__btn--success btn purple" onClick={this.props.closePopup}>입력하기</button>
                        </div>
	                    <div className="mm-popup__box__footer__right-space float-right">
		                    <button className="mm-popup__btn mm-popup__btn--success btn purple" onClick={this.onCustomMapInput}>지도에서 직접 찾기</button>
	                    </div>
                    </footer>
                    </article>
                </div>
            </div>
        )
    }
}
export default PopUp;