import React from 'react';
import ScrollBar from 'react-free-scrollbar';

import Item from './Item'

class RivalList extends React.Component {
    
    shouldComponentUpdate(nextProps, nextState) {
        return this.props.list !== nextProps.list;
    }

    render() {
        const { list, onToggle, kmSort, alSort} = this.props;
        const tmpList = list.filter(function(item, index, array){
            
            return !item.checked;
        })
        
        const List = tmpList.map(
            ({id, imageSrc, name, category, microReview, priceCategory, totalReviewCount, checked, distance}) => (
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
            <div className="card">
            <div className="card_header">
              <span>두치가 추천하는 경쟁사</span>
                <div className="sort-btn-box">
	                  <button onClick={() => alSort(list)}> 추정 경쟁사순 </button>
	                  <button onClick={() => kmSort(list)}> 거리순 </button>
                </div>
             
            </div>
            <div className="card_body">
                <div className="recommend_rival">
                {visible() && <div className="card_body" ><span>검색 결과가 없습니다.</span></div> }
                <ScrollBar style={{width: "780px", height: "680px"}} autohide={true}>
                    <ul>
                    {List} 
                    </ul>
                </ScrollBar>
                </div> 
            </div>
            </div>
        )
    }
}

export default RivalList;
