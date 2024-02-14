import React ,{ Component, Fragment } from 'react';
// import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CompanyItem from './modules/CompanyItem';
import InfoPopupContainer from './modules/InfoPopupContainer';
import '../etc/loadingview';

import * as myCompanys from '../../functions/myCompanys';
import * as deleteCompany from '../../functions/delete';
import * as reScrap from '../../functions/reScrap';
import * as taskList from '../../functions/taskList';
import * as listActions from '../../store/modules/list';
import * as listInfoPopupActions from '../../store/modules/listInfoPopup';
import * as TYPE from '../../stringType'
import Alert from 'react-s-alert'
import {setState} from "../../store/modules/listInfoPopup";
import LoadingView from "../etc/loadingview";

class ListComponent extends Component {
    // 서버에 주기적으로 Task 받아오는 Flag, 절대로 지우면 안됨 지우면 unmount때 안없어짐
    intervalFlag = null;
    state = {
	    myCompanyList: [],
      isEmployed: sessionStorage.getItem("employ"),
	    isFirst : false,
      preItems:0,
      items:20,
      page : 1,
	    scroll_status:true,
	    page_name:''
    };
    handleOpenPopup = async () => {
	    const { listInfoPopupActions } = this.props
      // console.log(11)
	    this.props.popupState = true
	    listInfoPopupActions.openPopup({id:'',name:'',state:TYPE.STEP5, popupStatus:TYPE.STEP5})
    }
    componentDidMount () {
      this.setState({
	      myCompanyList : []
      })
      const prevurl = decodeURI(document.referrer)
      // :: 현재 주소 '/' 단위로 분리
      const after = prevurl.split('/')
      const page_name = String(after[3])
      // let page_name = 'Marketing'
      
      if(sessionStorage.auth === undefined){
          Alert.info('로그인이 필요한 페이지 입니다!', {
            position: 'top-right',
            effect: 'slide'
          });
          this.props.history.push('/');
      }
      if(page_name!=='undefined' && page_name !== 'Marketing'){
        window.location.reload()
      }
      if (!this.state.isFirst && this.props.myCompanyList.length === 0) {
        this.initialGetCompanys(1);
        window.addEventListener('scroll',this._infiniteScroll,true)
        setState({
          'isFirst' : true
        });
        
        
      }
      this.getTaskList()
	    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
	    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
	    let clientHeight = document.documentElement.clientHeight;
	    if(scrollTop + clientHeight == scrollHeight){
		    for(let is_for=1; is_for<2; is_for++){
			    if(scrollTop + clientHeight === scrollHeight)
			    {
				    //
				    this.setState({
					    preItems: this.state.items,
					    items: this.state.items + 20,
					    page: this.state.page + 1
				    })
				    this.initialGetCompanys(this.state.page+1)
				    console.log(this.state.page+1);
			    }else{
				    break;
			    }
			    if(!this.state.isFirst && this.state.scroll_status==false){
				    break;
			    }
		    }
      }
	    console.log(scrollTop + clientHeight)
	    console.log(scrollHeight)
      // 지금 수집기업 얼마나 남았는지 체크하는 것
      // this.intervalFlag = setInterval(this.getTaskList, 30000)
    }
    componentWillUmount () {
    
    }
    _infiniteScroll = async()=> {
	
	    let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
	    let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
	    let clientHeight = document.documentElement.clientHeight;
	
	    // console.log(scrollTop+clientHeight);
	    // console.log(scrollHeight);
	
	    if (scrollTop + clientHeight >= scrollHeight) {
		    // console.log(this.state.page);
		    this.setState({
			    preItems: this.state.items,
			    items: this.state.items + 20,
			    page: this.state.page + 1
		    })
		    this.initialGetCompanys(this.state.page)
	    }
	    
    }
    
    initialGetCompanys = async (page) => {
        const current = decodeURI(window.location.href)
        // const current = "http://localhost:3000/test01_스시하루_서울특별시 종로구 삼봉로 81 두산위브파빌리온"
  
        // http://localhost:3000/test01_영훈식당_부산시 금정구 하단
        // http://localhost:3000/test01_스시하루_서울특별시 종로구 삼봉로 81 두산위브파빌리온
  
        // :: 현재 주소 '/' 단위로 분리
        const after = current.split('/')
        console.log(after)
        let page_name = String(after[3])
        // let page_name = 'Marketing'
      
        if(this.props.popupState) {
	        page_name = ''
        }
        console.log(page_name)
        this.setState({
	        page_name:page_name,
        })
      
        const {updateCompany} = this.props.listActions
        try{
	        if(page_name === 'Marketing'){
		        const companyList= await myCompanys.getCompanys(page)
            
            // this.state.companyList =
            if (companyList.length === 0) {
                Alert.info('등록된 가게가 없습니다.', {
                    position: 'top-right',
                    effect: 'slide'
                });
            }
            if(this.state.scroll_status){
	            let count=0;
	            let statusCount = {
		            scrapingCount: 0,
		            completeCount: 0,
		            salesCount: 0,
		            marketingCount: 0,
		            finishCount: 0,
	            };
		        	const concat_list =this.state.myCompanyList.concat(companyList)
	            concat_list.forEach((item) => {
		            item.id = ++count;
		            item.moreOptionState = false;
		            item.collapsible = false;
		            statusCount[item.status + "Count"]++;
	            });
              this.setState({
                myCompanyList: concat_list
              });
	            
              console.log(this.state.myCompanyList);
	            // await updateCompany(companyList)
	            
	
	            // await this.state.myCompanyList.forEach((item) => {
		           //  item.id = ++count;
		           //  item.moreOptionState = false;
		           //  item.collapsible = false;
		           //  statusCount[item.status + "Count"]++;
	            // });
	            if(this.props.category===TYPE.SALESSUPPORT){
		
		            console.log('a')
		            // await listActions.handleSort(TYPE.TIMEORDER);
		            await this.state.myCompanyList.sort((a, b) => {
			            if (a.date < b.date) {
				            a.id = ++count;
				            a.moreOptionState = false;
				            a.collapsible = false;
				            statusCount[a.status + "Count"]++;
				            return 1;
			            }
			            else return -1;
		            });
	            }
	
	            if(this.props.category===TYPE.MARKETINGMANAGEMENT){
		            
		            // list_ = this.state.myCompanyList.orderBy(this.state.myCompanyList, ['marketing_start_date'], ['marketing_start_date', 'desc']);
		            //
		            console.log('b')
		            console.log('c')
		            // await listActions.handleSort(TYPE.TIMEMAKETINGDEORDER);
		            // console.log('b')
		            //
		            // console.log(this.state.myCompanyList);
		            // console.log(this.props.category);
		            // this.setState({
		            //  myCompanyList:list_
		            // });
		            await this.state.myCompanyList.sort((a, b) => {
			            if (a.marketing_start_date < b.marketing_start_date){
				            a.id = ++count;
				            a.moreOptionState = false;
				            a.collapsible = false;
				            statusCount[a.status + "Count"]++;
				            return 1;
			            }
			            else return -1;
		            });
	            }
	            
	            
              // await this.state.myCompanyList.sort((a, b) => {
              //     if (a.date < b.date) return 1;
              //     else return -1;
              // });
	            
              console.log(this.state.myCompanyList)
              const { listActions, sortType } = this.props;
	            await listActions.getList(this.state.myCompanyList);
              await listActions.setStatusCount(statusCount);
              await listActions.handleSort(sortType);
	            
              console.log("companylist length")
              console.log(companyList.length)
	            
	            let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
	            let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
	            let clientHeight = document.documentElement.clientHeight;
	            // if(scrollTop + clientHeight === scrollHeight)
	            // {
		           //  //
		           //  this.setState({
			         //    preItems: this.state.items,
			         //    items: this.state.items + 20,
			         //    page: this.state.page + 1
		           //  })
		           //  this.initialGetCompanys(this.state.page+1)
		           //  console.log(this.state.page+1);
	            // }
	            console.log(scrollTop + clientHeight)
	            console.log(scrollHeight)
              if( scrollTop + clientHeight === scrollHeight){
	              this.setState({
		              scroll_status: true
	              });
              }else if(companyList.length < 20 ) {
	              this.setState({
		              scroll_status: false
	              });
              }
	            console.log(this.state.scroll_status)
            }
	        }
	    
	    }
	    catch (e) {
		    // console.log(e);
	    }
    };
    getTaskList = async () => {
        let tasks = await taskList.taskList();
        listActions.setTaskNum(tasks);
    };
    handleClick = (name, status) => {
	    console.log(status)
	    console.log(this.props.category)
        if (status === TYPE.SCRAP) {
            Alert.info(`${name}는 현재 데이터 수집중 입니다.`, {
                position: 'top-right',
                effect: 'slide'
            });
            return;
        }
        else if (this.props.category!==TYPE.SALESSUPPORT) {
	        this.props.history.push(`/Completereport/${name}`)
        }
        else{
            this.props.history.push(`/Analysis/${name}`)
        }
    };
    handleDelete = async(name) => {
        let bool = window.confirm(`${name} 삭제 하시겠습니까?`);
        console.log(name)
            if (!bool) {
                return
            }
        let msg = await deleteCompany.deleteCompany( JSON.parse(sessionStorage.auth).user.username, name);
        // await console.log(msg)
        if (msg ==='delete complete'){
            const { listActions } = this.props;
            listActions.deleteCompany(name);
        }
    };
    handleRescrap = async(name,location) => {
        let bool = window.confirm(`${name} 다시 재수집 하시겠습니까?`);
            if (!bool) {
                return;            
            }
        await reScrap.rescrap(name,location);
        await this.props.listActions.handleRescrap(name,location);
    };
    totalNum = () => {
        const { category, scrapingCount, completeCount, salesCount, marketingCount, finishCount } = this.props;
        if (category === TYPE.SALESSUPPORT) {
            return scrapingCount + completeCount + salesCount
        } else {
            return salesCount + marketingCount + finishCount
        }
    };
    handleFilter = (status) => {
        const { category } = this.props;
        if (category === TYPE.SALESSUPPORT) {
            return status === TYPE.SCRAP || status === TYPE.COMPLETE || status === TYPE.SALES || status === TYPE.ERROR
        } else {
            return  status === TYPE.MARKETING || status === TYPE.FINISH
        }
    };
    handleMaketinTap = (status) =>{
	    const {
		    listActions
	    } = this.props;
    	
    	if(status ===TYPE.SALESSUPPORT){
		    console.log(status)
		    console.log(TYPE.SALESSUPPORT)
		    listActions.handleSort(TYPE.TIMEORDER)
	    }else{
		    console.log(status)
		    console.log(TYPE.SALESSUPPORT)
		    listActions.handleSort(TYPE.TIMEMAKETINGDEORDER)
	    }
	    listActions.handleCategory(status)
    }
    render(){
        const {
            myCompanyList,
            filter,
            searchInput,
            listActions,
            sortType,
            scrapingCount,
            completeCount,
            salesCount,
            marketingCount,
            finishCount,
            category
        } = this.props;
        const {
            handleOpenPopup,
            handleClick,
            handleMoreIconClick,
            handleDelete,
            handleRescrap,
            handleChildOption,
            totalNum,
            handleFilter
        } = this;

        const companyList = myCompanyList.filter((item) => {
	        // console.log(item)
	        // console.log(item.status)
          if (filter === TYPE.ALL &&
            item.info.name.includes(searchInput) &&
            handleFilter(item.status)
          ) return true;
          else return (item.status === filter && item.info.name.includes(searchInput))
          }).map(
            ({id, status, day, marketing_start_date, marketing_end_date,advertiser_name,advertiser_phone, info, moreOptionState, collapsible}) => (
              <CompanyItem
                id={id}
                name={info.name}
                day={day}
                marketing_start_date={marketing_start_date}
                marketing_end_date={marketing_end_date}
                advertiser_name={advertiser_name}
                advertiser_phone={advertiser_phone}
                status={status}
                location={info.location}
                keyword={info.keyword}
                moreIconClick={handleMoreIconClick}
                handleClick={handleClick}
                handleDelete={handleDelete}
                handleRescrap={handleRescrap}
                key={id}
                handleChildOption={handleChildOption}
                moreOptionState={moreOptionState}
                collapsible={collapsible}
              />
            )
        );
        return (
            <Fragment>
	            <div className="wrap" onClick={(e) => {
	                if (e.target.children.length >= 1){
	                    listActions.closeOptions();
	                }
	            }}>
	            <div className="page_title_wrap">
                <div className="contents">
                <h2 className="page_title"><span>마케팅</span></h2>
                </div>
              </div>
	            <div className="page_menu_wrap">
		            <div className="contents">
			            <div className="page_menu_tab">
				            <div
					            className={`menu_tab ${category===TYPE.SALESSUPPORT?'active':''}`}
					            onClick={() => this.handleMaketinTap(TYPE.SALESSUPPORT)}>
					            <span>영업 지원</span>
				            </div>
                    { this.state.isEmployed === 'True' &&

                        <div
                        className={`menu_tab ${category===TYPE.MARKETINGMANAGEMENT?'active':''}`}
                        onClick={() => this.handleMaketinTap(TYPE.MARKETINGMANAGEMENT)}>
                        <span>마케팅 관리</span>
	                    </div>
                    }
				            <div className="search_section">
					            <input
						            type="text"
						            className="form_rec"
						            placeholder="이름으로 검색"
						            value={searchInput}
						            name="searchInput"
						            onChange={(e) => {listActions.handleChange(e)}}
						            autoComplete="off"
					            />
				            </div>
			            </div>
		            </div>
	            </div>
	            <div className="contents_wrap">
                <div className="contents">
                  <div className="row my_filter">
                    <div className="filter_select">
                     
	                    {category===TYPE.MARKETINGMANAGEMENT?
	                    <select value={sortType} onChange={(e) => {listActions.handleSort(e.target.value)}}>
		                    <option value={TYPE.TIMEORDER}>등록 날짜 오름차순</option>
		                    <option value={TYPE.TIMEDEORDER}>등록 날짜 내림차순</option>
		                    <option value={TYPE.TIMEMAKETINGORDER}>마케팅진행 날짜 오름차순</option>
		                    <option value={TYPE.TIMEMAKETINGDEORDER}>마케팅진행 날짜 내림차순</option>
		                    <option value={TYPE.NAMEORDER}>가나다 순</option>
	                    </select>
	                    :
		                    <select value={sortType} onChange={(e) => {listActions.handleSort(e.target.value)}}>
			                    <option value={TYPE.TIMEORDER}>등록 날짜 오름차순</option>
			                    <option value={TYPE.TIMEDEORDER}>등록 날짜 내림차순</option>
			                    <option value={TYPE.NAMEORDER}>가나다 순</option>
		                    </select>
	                    }
                    </div>
                    <div className="filter_tab">
                      <ul>
                        <li
                          className={filter===TYPE.ALL? "active" : ""}
                          onClick={() => listActions.setFilter(TYPE.ALL)}
                          style={{cursor:'pointer'}}>
                          전체 <span>{totalNum()}</span>
                        </li>
                        {
                          category===TYPE.SALESSUPPORT &&
                          <li
                            className={filter === TYPE.SCRAP ? "active" : ""}
                            onClick={() => listActions.setFilter(TYPE.SCRAP)}
                            style={{cursor:'pointer'}}>
                            수집중 <span>{scrapingCount}</span>
                          </li>
                        }
                        {
                          category===TYPE.SALESSUPPORT &&
                          <li
                            className={filter === TYPE.COMPLETE ? "active" : ""}
                            onClick={() => listActions.setFilter(TYPE.COMPLETE)}
                            style={{cursor:'pointer'}}>
                            수집완료 <span>{completeCount}</span>
                          </li>
                        }
                        {
	                        category===TYPE.SALESSUPPORT &&
                          <li
                            className={filter === TYPE.SALES ? "active" : ""}
                            onClick={() => listActions.setFilter(TYPE.SALES)}
                            style={{cursor:'pointer'}}>
                            영업중 <span>{salesCount}</span>
                          </li>
                        }
                        {
                          category===TYPE.MARKETINGMANAGEMENT &&
                          <li
                              className={filter === TYPE.MARKETING ? "active" : ""}
                              onClick={() => listActions.setFilter(TYPE.MARKETING)}
                              style={{cursor:'pointer'}}>
                              마케팅진행 <span>{marketingCount}</span>
                          </li>
                        }
                        {
                          category===TYPE.MARKETINGMANAGEMENT &&
                          <li
                              className={filter === TYPE.FINISH ? "active" : ""}
                              onClick={() => listActions.setFilter(TYPE.FINISH)} style={{cursor:'pointer'}}>
                              진행완료 <span>{finishCount}</span>
                          </li>
                        }
                      </ul>
                    </div>
                    {
                    category===TYPE.SALESSUPPORT &&
                      <div className="add_company_wrap">
                        <button className="btn btn_md line purple btn_round i-add"><a href="/AddCompany">기업 추가</a></button>
                      </div>
                    }
                    {
	                    category===TYPE.MARKETINGMANAGEMENT &&
	                    <div className="add_company_wrap">
		                    <button className="btn btn_md line purple btn_round i-add" onClick={handleOpenPopup}>기업 추가</button>
	                    </div>
                    }
                  </div>
                  <div className="row my_list">
                  {
                    !this.state.isFirst && this.props.myCompanyList.length === 0 &&
                    <LoadingView/>
                  }
                  <div className="company_list">
                    <ul>
                      {companyList}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
              </div>
		          {
		            this.props.popupState &&
		            <InfoPopupContainer/>
		          }
          </Fragment>
        )
    };
}

export default connect(
  (state) => ({
      myCompanyList: state.list.myCompanyList,
      filter: state.list.filter,
      scrapingCount: state.list.scrapingCount,
      completeCount: state.list.completeCount,
      salesCount: state.list.salesCount,
      marketingCount: state.list.marketingCount,
      finishCount: state.list.finishCount,
      searchInput: state.list.searchInput,
      sortType: state.list.sortType,
      waitingTaskNum: state.list.waitingTaskNum,
      category: state.list.category,
      popupState: state.listInfoPopup.popupState
  }),
  (dispatch) => ({
      listActions: bindActionCreators(listActions, dispatch),
      listInfoPopupActions: bindActionCreators(listInfoPopupActions, dispatch)
  })
)(ListComponent)