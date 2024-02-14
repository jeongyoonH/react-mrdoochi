import React from 'react';
//import axios from 'axios';
import PopUp from './PopUp'
import '../../../assets/css/popupstyle.css';
// import icon_close from '../../assets/images/icon_close.png';

class Form extends React.Component{

    render() {
        const menu = this.props.recommand_menu.map(
            (item) => {
                return (
                    <span className="badge tag i-close" id = {item} key={item} style={{marginRight:'10px', paddingTop: '4px', paddingBottom: '4px', cursor:'pointer'}} onClick={() => this.props.inputMenu(item)}>
                    {item}
                    {/* <img src={icon_close} onClick={() => this.props.removeKeyword(item)} alt="icon_close"/> */}
                    </span>
                )
            }
        );
        
        // const myKeywords = this.props.keywords.map(
        //     ({id, item})=> {
        //        return (
        //            <span className="badge tag i-close" id = {id} key={id} style={{marginRight:'10px', paddingTop: '4px', paddingBottom: '4px'}}>
        
        //             {item}
        //             {/* <img src={icon_close} onClick={() => this.props.removeKeyword(id)} alt="icon_close"/> */}
        //             </span>
        //         )
        //     }
        // );

        
        return (

            <div className="wrap">
	            <div className="page_title_wrap">
		            <div className="contents">
			            <h2 className="page_title"><span>기업 추가하기</span></h2>
			            <div className="sub_title"><span>현재 음식점만 추가 가능합니다.</span></div>
		            </div>
	            </div>
                <div className="contents_wrap">
                    <div className="contents">
                        <div className="row add_form">
                            <div className="row-3">
                                <form onSubmit={this.props.handleSubmit} >
                                    <section>
                                    <label>업체 위치</label>
                                    <input
                                        value={this.props.location}
                                        // onChange={this.props.handleChange}
                                        onClick={this.props.handleClick}
                                        name="location"
                                        type="text"
                                        placeholder="해당 업체의 위치를 검색하여 추가해 주세요."
                                        autoComplete="off"
                                        readOnly
                                    />
                                    </section>
                                    <section>
                                    <label>업체 이름</label>
                                    <input
                                        value={this.props.name}
                                        onChange={this.props.handleChange}
                                        // onClick={this.props.handleClick}
                                        name="name"
                                        type="text"
                                        placeholder="해당 업체의 이름을 기입해 주세요."
                                        autoComplete="off"
                                        // readOnly
                                    />
                                    </section>
                                    <section>
                                    <label>추출 키워드

                                    </label>
                                    <input
                                        value={this.props.menu}
                                        onChange={this.props.handleChange}
                                        name="menu"
                                        type="text"
                                        placeholder="경쟁업체 추출을 위한 주 키워드를 입력해 주세요."
                                        autoComplete="off"
                                        onKeyPress={(e) => {
                                            if(e.key === 'Enter'){
                                                e.preventDefault(); // Enter로 from 전송되는거 막음
                                              }
                                        }}
                                    />
                                    <div className="tag_item">
                                            {(this.props.recommand_menu).length !== 0 ?
                                                <div className="sub_title">
                                                    <span style={{color: "gray", fontSize: "0.8em", float: "left", paddingRight: "10px"}}>
                                                        추천메뉴(클릭):
                                                    </span>
                                                </div>
                                            : null}
                                            {menu}
                                        </div>
                                    </section>
                                    {/* <section>
                                    <label>키워드 (엔터키로 구분)</label>
                                    <input
                                        value={this.props.keyword}
                                        onChange={this.props.handleChange}
                                        name="keyword"
                                        type="text"
                                        placeholder="키워드 최소 2개 이상 입력해 주세요."
                                        autoComplete="off"
                                        onKeyPress={this.props.handleKeyPress}
                                    />
                                    </section>          */}

                                    <button
                                        className="btn line purple"
                                        onClick={this.props.handleCancle} >
                                        작성 취소
                                    </button>
                                    <button
                                        className="btn purple"
                                        //onClick={this.handleSubmit}
                                        type="submit">
                                        기업 정보 저장 후 경쟁사 추출하기
                                    </button>
                                </form>
                                <div className='myPopup'>

                                    {this.props.showPopup ?
                                    <PopUp
                                        closePopup={this.props.handleClick}
                                        autoInput={this.props.autoInput}
                                    />
                                    : null
                                    }
                                </div>

                                {/* <div className="keywords">
                                    <ul style={{height: '20px'}}>
                                            {myKeywords}
                                    </ul>
                                </div> */}
                                {/* <div className="tag_item">
                                    {myKeywords}
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default Form;