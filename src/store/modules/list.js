/*eslint-disable no-unused-vars*/
import { createAction, handleActions } from 'redux-actions'
import * as TYPE from '../../stringType'

// 액션 타입을 정의해줍니다.
const GETLIST = 'list/GETLIST'
const SETFILTER = 'list/SETFILTER'
const SETSTATUSCOUNT = 'list/SETSTATUSCOUNT'
const HANDLECHANGE = 'list/HANDLECHANGE'
const DELETECOMPANY = 'list/DELETECOMPANY'
const OPENOPTION = 'list/OPENOPTION'
const CLOSEOPTIONS = 'list/CLOSEOPTIONS'
const CLOSEOPTION = 'list/CLOSEOPTION'
const TOGGLEOPTION = 'list/TOGGLEOPTION'
const OPENEXPAND = 'list/OPTIONEXPAND'
const CLOSEEXPAND = 'list/CLOSEEXPAND'
const TOGGLEEXPAND = 'list/TOGGLEEXPAND'
const HANDLESORT = 'list/HANDLESORT'
const SETTASKNUM = 'list/SETTASKNUM'
const HANDLESTATUS = 'list/HANDLESTATUS'
const HANDLERESCRAP = 'list/HANDLERESCRAP'
const HANDLECATEGORY = 'list/HANDLEHANDLECATEGORY'
const UPDATECOMPANY = 'list/UPDATECOMPANY'

//액션을 생성해 줍니다
export const getList = createAction(GETLIST)
export const setFilter = createAction(SETFILTER)
export const setStatusCount = createAction(SETSTATUSCOUNT)
export const handleChange = createAction(HANDLECHANGE)
export const deleteCompany = createAction(DELETECOMPANY)
export const openOption = createAction(OPENOPTION)
export const closeOption = createAction(CLOSEOPTION)
export const closeOptions = createAction(CLOSEOPTIONS)
export const toggleOption = createAction(TOGGLEOPTION)
export const openExpand = createAction(OPENEXPAND)
export const closeExpand = createAction(CLOSEEXPAND)
export const toggleExpand = createAction(TOGGLEEXPAND)
export const handleSort = createAction(HANDLESORT)
export const setTaskNum = createAction(SETTASKNUM)
export const handleStatus = createAction(HANDLESTATUS)
export const handleRescrap = createAction(HANDLERESCRAP)
export const handleCategory = createAction(HANDLECATEGORY)
export const updateCompany = createAction(UPDATECOMPANY)

//초기 state를 정해줍니다
const initialState = {
  category: TYPE.SALESSUPPORT,
  myCompanyList: [],
  scrapingCount: 0,
  completeCount: 0,
  salesCount: 0,
  marketingCount: 0,
  finishCount: 0,
  waitingTaskNum: 0,
  searchInput: '',
  filter: TYPE.ALL, // 전체, 수집중, 수집완료, 영업중, 마케팅진행, 진행완료
  sortType: TYPE.TIMEORDER
}

//액션함수들을 정의해 줍니다
export default handleActions({
  [GETLIST]: (state, action) => {
    // console.log(action.payload)
    return {
      ...state,
      myCompanyList: action.payload
    }
  },
  [SETFILTER]: (state, action) => {
    // console.log('filter')
    if (state.filter === action.payload) {
      return {...state}
    }
    return {
      ...state,
      filter: action.payload
    }
  },
  [SETSTATUSCOUNT]: (state, action) => {
    const statusCount = action.payload
    for (let name in statusCount) {
	    state[name] = statusCount[name]
    }
    return {
      ...state
    }
  },
  [HANDLECHANGE]: (state, action) => {
    return {
      ...state,
      searchInput: action.payload.target.value
    }
  },
  [DELETECOMPANY]: (state, action) => {
    const nextCompanyList = state.myCompanyList.filter(item => item.name !== action.payload);
    return {
      ...state,
      myCompanyList: nextCompanyList
    }
  },
  [UPDATECOMPANY]: (state, action) => {
	  const nextCompanyList = state.myCompanyList.concat(action.payload);
	  // const nextCompanyList = action.payload;
	  return {
		  ...state,
		  myCompanyList: nextCompanyList
	  }
  },
  [OPENOPTION]: (state, action) => {},
  [CLOSEOPTION]: (state, action) => {
    const nextCompanyList = [...state.myCompanyList]
    const itemIdx = nextCompanyList.findIndex(item => item.id === action.payload)
    nextCompanyList[itemIdx].moreOptionState = false
    return {
      ...state,
      myCompanyList: nextCompanyList
    }
  },
  [CLOSEOPTIONS]: (state, action) => {
    const nextCompanyList = [...state.myCompanyList]
    let flag = false
    nextCompanyList.forEach(item => {
        if (item.moreOptionState) {
          item.moreOptionState = false
          flag = true
        }
      })
    if (flag) {
      return {
        ...state,
        myCompanyList: nextCompanyList
      }
    }
    else return {...state}
  },
  [TOGGLEOPTION]: (state, action) => {
    const nextCompanyList = [...state.myCompanyList];
    const itemIdx = nextCompanyList.findIndex(item => item.id === action.payload);
	  for (let key in nextCompanyList) {
	  	if(itemIdx!==key)
		    nextCompanyList[key].moreOptionState = false;
	  }
    nextCompanyList[itemIdx].moreOptionState = !nextCompanyList[itemIdx].moreOptionState;
    return {
      ...state,
      myCompanyList: nextCompanyList
    }
  },
  [TOGGLEEXPAND]: (state, action) => {
    const nextCompanyList = [...state.myCompanyList];
    const itemIdx = nextCompanyList.findIndex(item => item.id === action.payload);
    nextCompanyList[itemIdx].collapsible = !nextCompanyList[itemIdx].collapsible;
    return {
      ...state,
      myCompanyList: nextCompanyList
    }
  },
  [HANDLESORT]: (state, action ) => {
    // console.log('list', action.payload)
    if (state.sortType === action.payload) return {...state}
    let nextCompanyList = [...state.myCompanyList]
    
    if (action.payload === TYPE.NAMEORDER) {
      nextCompanyList.sort((a, b) => {
        if (a.info.name > b.info.name) return 1;
        else return -1;
      })
    }
    else if (action.payload === TYPE.TIMEORDER) {
      nextCompanyList.sort((a, b) => {
        if (a.date < b.date) return 1;
        else return -1;
      })
    }
    else if(action.payload === TYPE.TIMEMAKETINGORDER){
	    const list_ = nextCompanyList.orderBy(nextCompanyList, ['marketing_start_date', 'id'], ['marketing_start_date', 'desc']);
	
	    nextCompanyList = list_
	    // nextCompanyList.sort((a, b)=>{
		   //  if (a.marketing_start_date > b.marketing_start_date) return 1;
		   //  else return -1;
	    // })
    }
    else if(action.payload === TYPE.TIMEMAKETINGDEORDER){
      nextCompanyList.sort((a, b)=>{
        if (a.marketing_start_date < b.marketing_start_date) return 1;
        else return -1;
      })
    }
    else {
      nextCompanyList.sort((a, b) => {
        if (a.date > b.date) return 1;
        else return -1;
      })
    }
    console.log(nextCompanyList)
    return {
      ...state,
      myCompanyList: nextCompanyList,
      sortType: action.payload
    }
  },
  [SETTASKNUM]: (state, action) => {
    return {
      ...state,
      waitingTaskNum: action.payload
    }
  },
  [HANDLESTATUS]: (state, action) => {
    const { name, status } = action.payload
    const nextCompanyList = [...state.myCompanyList]
    const itemIdx = nextCompanyList.findIndex(item => item.info.name === name)
	  const prevStatus = status
	
	  // console.log(  nextCompanyList[itemId])
	  // if(Object.keys(nextCompanyList[itemIdx]).length){
		 //  nextCompanyList[itemIdx].status = status
	  // }
    
    return {
      ...state,
      [prevStatus + "Count"]: state[prevStatus + "Count"] - 1,
      [status + "Count"]: state[status + "Count"] + 1,
      myCompanyList: nextCompanyList
    }
  },
  [HANDLERESCRAP]: (state, action) => {
    const nextCompanyList = [...state.myCompanyList]
    const itemIdx = nextCompanyList.findIndex(item => item.info.name === action.payload)
    const status = nextCompanyList[itemIdx].status
    nextCompanyList[itemIdx].status = TYPE.SCRAP
    const prevStatus = nextCompanyList[itemIdx].status
    return {
      ...state,
      [prevStatus + "Count"]: state[prevStatus + "Count"] - 1,
      [status + "Count"]: state[status + "Count"] + 1,
      myCompanyList: nextCompanyList
    }
  },
  [HANDLECATEGORY]: (state, action) => {
    return {
      ...state,
      category: action.payload,
      filter: TYPE.ALL
    }
  }
}, initialState)