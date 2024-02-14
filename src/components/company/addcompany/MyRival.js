import React from 'react';
import ScrollBar from 'react-free-scrollbar';
// import { Link } from 'react-router-dom';

import Item from './Item'

class MyRival extends React.Component {
    
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.list !== nextProps.list;
    }
    
    render() {
        const { list, onToggle, selectedRival } = this.props;
        
        const tmpList = list.filter(function(item, index, array){
            
            return item.checked;
        })
        const List = tmpList.map(
            ({id, imageSrc, name, category, microReview, priceCategory, totalReviewCount, checked,distance}) => (
                <Item
                    id={id}
                    imageSrc={imageSrc}
                    name={name}
                    category={category}
                    microReview={microReview}
                    priceCategory={priceCategory}
                    totalReviewCount={totalReviewCount}
                    checked={checked}
                    key={id}
                    onToggle={onToggle}
                    distance={distance}
                />
            )
        );
        const visible = () => {
            if( List.length===0){
                return true;
            }
            else return false;
        }
        return (
        <div>    
            <div className="card">
                <div className="card_header">
                    <span>선택한 경쟁사</span>
                    <button className="btn purple" onClick={selectedRival}>완료 및 저장</button>
                </div>
                <div className="card_body">
                {visible() && <div className="card_body" ><span>검색 결과에서 찜하기를 눌러보세요.</span></div> }
                    <div className="my_rival">
                    <ScrollBar style={{width: "395px", height: "680px"}}>
                        <ul>
                        {List} 
                        </ul>
                    </ScrollBar>
                    </div>
                </div>
            </div>  
        </div>  
        )
    }
};

export default MyRival;
