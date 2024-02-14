import React from 'react';
// import ReactDOM from 'react-dom';
import RivalList from './RivalList';
import MyRival from './MyRival';


class RivalTemplate extends React.Component{

    render() {
        const{ list } = this.props;
        const {            
            handleToggle,
            selectedRival,
	          kmSort,
	          alSort
        } = this.props;
        return (
            <div className="contents" ref="test">
                <div className="row fixed">
                    <div className="row-2 column">
                        <RivalList list={list} onToggle={handleToggle} kmSort={kmSort} alSort={alSort}/>
                    </div>
                    <div className="row-1 column">
                        <MyRival 
                            list={list} 
                            onToggle={handleToggle}
                            selectedRival={selectedRival}
                        />
                    </div>
                    {/* {setTimeout(handleScrollToElement,10)} */}
                </div>
            </div>
        )
    }
    // handleScrollToElement = () => {
    //     const tesNode = ReactDOM.findDOMNode(this.refs.test);
    //     //window.scrollTo(0, tesNode.offsetTop, "smooth");
    //     tesNode.scrollIntoView();        
    // }
}



export default RivalTemplate;