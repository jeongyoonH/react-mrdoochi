import React, { Component } from 'react';
import Alert from 'react-s-alert'
import { connect } from 'react-redux';
import Form from './addcompany/Form';
import RivalTemplate from './addcompany/RivalTemplate';
import * as parsing from '../../functions/parsing';
import * as sendRival from '../../functions/sendRival';

class AddCompany extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            submit_state: false,
            location: '',
            name: '',
            menu: '',
            keyword: '',
            keywords: [ ],
            showPopup: false,
            rivalList: [ ],
            recommand_menu: [],
            x: '',
            y: '',
            kmSortToggle:false,
            alSortToggle:false,
        }
	    this.handleKMSort = this.handleKMSort.bind(this);
	    this.handleAlSort = this.handleAlSort.bind(this);
	
    }
    keywordId = 0;
    rivalId = 0;
    rivalSize = 3;
    //esc 키 누르면 popup창 사라지게 하기
    escFunction = (event) => {
        if(event.keyCode === 27) {
          if(this.state.showPopup===true){
              this.setState({
                  showPopup: !this.state.showPopup
              })
          }
        }
    }
    componentDidMount(){
        document.addEventListener("keydown", this.escFunction, false);
        
        if(sessionStorage.auth === undefined){
            Alert.info('로그인이 필요한 페이지 입니다!', {
                position: 'top-right',
                effect: 'slide'
            });
            this.props.history.push('/Login');
        }
      }

    handleRivalToggle = (id) => {

        //파라미터로 받은 id를 가지고 몇번째 아이템인지 찾습니다.
        const index = this.state.rivalList.findIndex(item => item.id === id);
        const selected = this.state.rivalList[index]; // 선택한 객체

        if(selected.checked){
            this.rivalSize--;
        }else{
            if(this.rivalSize === 3){
                Alert.warning('최대 3개까지 선택할 수 있습니다.', {
                    position: 'bottom-right',
                    effect: 'slide'
                });
                return;
            }else{
                this.rivalSize++;
            }
        }

        const nextList = [...this.state.rivalList]; // 배열을 복사
    
        //기존의 값들을 복사하고, checked 값을 덮어쓰기
        nextList[index] = {
          ...selected,
          checked: !selected.checked
        };
    
        this.setState({
          rivalList: nextList
        });
    }
    handleKeyPress = (e) => {
        //눌려진 키가 Enter면 handlerCreate 호출
        if(e.key === 'Enter'){
          this.handleCreateKeyword(); //keywords 배열에 추가
          e.preventDefault(); // Enter로 from 전송되는거 막음
        }  
    }

    handleCreateKeyword = () => {
        const { keyword, keywords } = this.state;
        this.setState({
          keyword: '', // 인풋 비우고 concat을 사용하여 배열에 추가
          keywords: keywords.concat({
            id: this.keywordId++,
            item: keyword
          })
        });
    }
    print = () => {
        // console.log(this.state.rivalList)
    }
    inputMenu = (item) => {
        this.setState({
            menu: item
        })
    }
    togglePopup = () => {
        // e.preventDefault()
        console.log('toggle');
        this.setState({
            showPopup: !this.state.showPopup
        });
      }
    handleSubmit = async(e) => {
        e.preventDefault();
        // if (this.state.location===''||this.state.name===''||this.state.keywords.length<2) {
        if (this.state.location===''||this.state.name===''||this.state.menu==='') {
            Alert.warning('빈칸을 모두 채우세요!', {
                position: 'bottom-right',
                effect: 'slide'
              });
        }
        else {
            await this.setState({
                submit_state: false
            })
            await this.getRival()
        }
    }
    handleScrollToElement = () => {
        console.log('이동');
        //const tesNode = ReactDOM.findDOMNode(this.refs.test);
        const tesNode = document.getElementById('scrollPoint');
        tesNode.scrollIntoView({  behavior: 'smooth' });        
    }
    getRival = async () => {
        //e.preventDefault();
        try {
            const rankedList = await parsing.getRival(this.state.location, this.state.menu, this.state.name, this.state.x, this.state.y);
            await this.setState({
                rivalList: rankedList
            })
            await this.setState({
                submit_state: true
            })
            await this.handleScrollToElement();
        } 
        catch (e) {
            // 오류가 났을 경우
            console.log(e);
            console.log(this.state)
        }
    };
    sendMyRivalToServer = async () => {
	    const { location, keywords } = this.state;
	    let locationArray = location.split(' ');
	    // let menus = menu.split('>');
	    // menus = menus[menus.length  - 1].split(',');
	    // let menuKey = menus[0];
	    let locationKey = '';
	    let locationKey2 = '';
	    
		    
         locationArray.some(item => {
          if(item[item.length - 1] === '시') {
            locationKey = item;
	          return true;
          }
	        return false;
        });
          
         locationArray.some(item => {
          if (item[item.length - 1] === '구'){
            // location =
	          locationKey2 = item;
            console.log(locationKey2)
            locationKey = item.slice(0, item.length - 1);
            return true;
          }
          return false;
        });

         locationArray.some(item => {
          if (item[item.length - 1] === '동'){
            // location = item.slice(0, item.length - 1);
            locationKey = item;
            return true;
          }
          return false;
        });

        keywords.push({id: 0, item: locationKey2 + ' ' + this.state.menu});
        keywords.push({id: 0, item: locationKey2 + ' 맛집'});
		    Alert.info('데이터 수집을 시작합니다.', {
			    position: 'top-right',
			    effect: 'slide'
		    });
	    try {
          const tmpList = this.state.rivalList.filter(function(item, index, array){
              return item.checked;
          });
          const username = JSON.parse(sessionStorage.auth).user.username;
          let keywords = new Array(3)
          keywords[0] = {'id': -1, 'item': locationKey + ' 맛집'}
          keywords[1] = this.state.keywords[0]
          keywords[2] = this.state.keywords[1]
	    
          const response = await sendRival.sendMyRival(username, tmpList, this.state.name, keywords, this.state.location);
          
			    const link = await this.props.history.push('/Marketing')
		
		
		
		      console.log("동시에...")
	        // window.location.href="/Marketing";
	        // await this.props.history.push('/Marketing')
	        // window.location.href="/Marketing";
	        if(response === "success"){
		        const pop  = await sendRival.sendMyRival(username, tmpList, this.state.name, keywords, this.state.location);
		        await Alert.success('저장완료!.', {
			        position: 'top-right',
			        effect: 'slide'
		        });
		        // 수집기업 얼마나 남았는지 체크하는 함수 없애는것
		        // clearInterval(this.intervalFlag);
		        const prevurl = decodeURI(document.referrer)
		        // :: 현재 주소 '/' 단위로 분리
		        const after = prevurl.split('/')
		        const page_name = String(after[3])
		        console.log('page_name')
		        console.log(prevurl)
		        console.log(after)
		        console.log(page_name)
		        if(page_name!=='undefined' && page_name !== 'Marketing'){
			        window.location.reload()
		        }
	        }
	        
        }
        catch (e) {
          await console.log(e);
	        window.location.href="/Marketing";
          await this.props.history.push('/Marketing')
        }
    };
    removeKeyword = (id) => {
        const { keywords } = this.state;
        this.setState({
        keywords: keywords.filter(keyword => keyword.id !== id)
        });
    };
    autoInput = (title, address, menu, x, y) => {
        // console.log(title, address, menu);
        if (menu !== undefined) {
            menu = menu.split('>')
            if (menu.length > 1) {
                menu = menu[1].split(',')
            }
        }
        this.setState({
            location: address,
            name: title,
            recommand_menu: menu,
            x : x,
            y : y
            // showPopup: false
        })
      console.log(x)
      console.log(y)
    };
    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleClick = (e) => {
      // e.preventDefault();
      //this.togglePopup;
      this.setState({
          showPopup: !this.state.showPopup
      });
    }
    handleCancle = () => {
      this.setState({
        submit_state: false,
        location: '',
        name: '',
        menu: '',
        keyword: '',
        keywords: [ ],
        showPopup: false,
        rivalList: [ ],
        recommand_menu: [],
      });
    };
	async handleKMSort (args) {
		// this.state.rivalList.sort((a,b) => {
		// 	return a.distance > b.distance ? -1 : a.distance < b.distance ? 1: 0;
		// });
		// const rankedList = args
		const rankedList = args.filter(function(item, index, array){

			return item
		})
		if ( this.state.kmSortToggle===false ){
			rankedList.sort((a, b) => {
				if (parseFloat(a.distance) > parseFloat(b.distance)) return 1;
				else return -1;
			})
    }else{
			rankedList.sort((a, b) => {
				if (parseFloat(a.distance) < parseFloat(b.distance)) return 1;
				else return -1;
			})
    }
		
    console.log(rankedList)
    this.setState({
			rivalList: rankedList,
	    sortToggle:this.state.sortToggle===false?true:false
		})
  }
	async handleAlSort (args) {
		// this.state.rivalList.sort((a,b) => {
		// 	return a.distance > b.distance ? -1 : a.distance < b.distance ? 1: 0;
		// });
		// const rankedList = args
		const rankedList = args.filter(function(item, index, array){
			
			return item
		})
		if ( this.state.alSortToggle===false ){
			rankedList.sort((a, b) => {
				if (parseFloat(a.score) < parseFloat(b.score)) return 1;
				else return -1;
			})
		}else{
			rankedList.sort((a, b) => {
				if (parseFloat(a.score) > parseFloat(b.score)) return 1;
				else return -1;
			})
		}
		
		console.log(rankedList)
		this.setState({
			rivalList: rankedList,
			sortToggle:this.state.sortToggle===false?true:false
		})
	}
    render () {
      const { location, name, menu, keyword, keywords, showPopup, rivalList, recommand_menu } = this.state;
      const {
        handleCreate,
        handleCreateKeyword,
        handleSubmit,
        removeKeyword,
        autoInput,
        handleChange,
        handleClick,
        handleKeyPress,
        handleRivalToggle,
        sendMyRivalToServer,
        handleCancle,
        inputMenu,
	      handleKMSort,
	      handleAlSort
      } = this;
      return (
        <div>
          <Form
            onCreate={handleCreate}
            handleCreateKeyword={handleCreateKeyword}
            handleSubmit={handleSubmit}
            handleClick={handleClick}
            removeKeyword={removeKeyword}
            autoInput={autoInput}
            handleChange={handleChange}
            handleKeyPress={handleKeyPress}
            location = {location}
            menu = {menu}
            name = {name}
            keyword = {keyword}
            keywords = {keywords}
            showPopup = {showPopup}
            handleCancle = {handleCancle}
            recommand_menu = {recommand_menu}
            inputMenu = {inputMenu}
            />
          <div id="scrollPoint">
            { this.state.submit_state &&
	              <RivalTemplate
	                  handleToggle={handleRivalToggle}
	                  list={rivalList}
	                  selectedRival={sendMyRivalToServer}
	                  kmSort={handleKMSort}
	                  alSort={handleAlSort}
                   
		          />}
          </div>
        </div>
      );
  }
}

export default connect(
    (state) => ({
      userState: state.auth.userState
    })
)(AddCompany);