import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

class NaverBlogContents extends Component {
    info = ''
    data = ''
    componentDidMount(){
        this.initFunc();
        this.canvasFunc();
    }
    componentDidUpdate(){
        this.canvasFunc();
    }
    canvasFunc = () => {
        const graph_line = document.getElementById('graph_line').lastChild
        graph_line.width = 1300
        graph_line.height = 600
        // graph_line.style.width = "1000"
        // graph_line.style.height = "600"
    }
    initFunc = () => {
        if(this.props.info!==''){
            this.info = this.props.info;
            let date = (this.props.info.date).split('.');
            let dateArray = [];
            for (let i=1; i<=6; i++){
                if (date[1]*1 - i <= 0 ) {
                    dateArray.push((date[0] - 1).toString() + '년 ' + (date[1] - i + 12).toString() + '월')
                } else dateArray.push(date[0].toString() + '년 ' + (date[1] - i).toString() + '월')
            }
            this.data = {
                labels: [dateArray[5], dateArray[4], dateArray[3], dateArray[2], dateArray[1], dateArray[0]],
                datasets: [
                    {
                        label: this.info.myCompany.info.name,
                        fillColor: 'rgba(220,220,220,0.2)',
                        strokeColor: 'rgba(220,220,220,1)',
                        pointColor: 'rgba(220,220,220,1)',
                        pointStrokeColor: '#fff',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: 'rgba(220,220,220,1)',
                        data: [this.info.myCompany.naver_blog.last_6, this.info.myCompany.naver_blog.last_5, this.info.myCompany.naver_blog.last_4, this.info.myCompany.naver_blog.last_3, this.info.myCompany.naver_blog.last_2, this.info.myCompany.naver_blog.last_1] ,
                        backgroundColor:  'rgba(75, 192, 192, 0.6)',
                        hoverBackgroundColor:  'rgba(75, 192, 192, 0.6)',
                        borderColor: 'rgba(75, 192, 192, 0.6)',
                        fill: false
                    },
                    {
                        label: this.info.Rival1.info.name,
                        fillColor: 'rgba(220,220,220,0.2)',
                        strokeColor: 'rgba(220,220,220,1)',
                        pointColor: 'rgba(220,220,220,1)',
                        pointStrokeColor: '#fff',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: 'rgba(220,220,220,1)',
                        data: [this.info.Rival1.naver_blog.last_6, this.info.Rival1.naver_blog.last_5, this.info.Rival1.naver_blog.last_4, this.info.Rival1.naver_blog.last_3, this.info.Rival1.naver_blog.last_2, this.info.Rival1.naver_blog.last_1],
                        backgroundColor: 'rgba(255, 99, 132, 0.6)',
                        hoverBackgroundColor: 'rgba(255, 99, 132, 0.6)',
                        borderColor: 'rgba(255, 99, 132, 0.6)',
                        fill: false
                    },
                    {
                        label: this.info.Rival2.info.name,
                        fillColor: 'rgba(151,187,205,0.2)',
                        strokeColor: 'rgba(151,187,205,1)',
                        pointColor: 'rgba(151,187,205,1)',
                        pointStrokeColor: '#fff',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: 'rgba(151,187,205,1)',
                        data: [this.info.Rival2.naver_blog.last_6, this.info.Rival2.naver_blog.last_5, this.info.Rival2.naver_blog.last_4, this.info.Rival2.naver_blog.last_3, this.info.Rival2.naver_blog.last_2, this.info.Rival2.naver_blog.last_1],
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        hoverBackgroundColor: 'rgba(54, 162, 235, 0.6)',
                        borderColor: 'rgba(54, 162, 235, 0.6)',
                        fill: false
                    },
                    {
                        label: this.info.Rival3.info.name,
                        fillColor: 'rgba(50, 92, 125, 0.2)',
                        strokeColor: 'rgba(50, 92, 125, 1)',
                        pointColor: 'rgba(50, 92, 125, 1)',
                        pointStrokeColor: '#fff',
                        pointHighlightFill: '#fff',
                        pointHighlightStroke: 'rgba(50, 92, 125, 1)',
                        data: [this.info.Rival3.naver_blog.last_6, this.info.Rival3.naver_blog.last_5, this.info.Rival3.naver_blog.last_4, this.info.Rival3.naver_blog.last_3, this.info.Rival3.naver_blog.last_2, this.info.Rival3.naver_blog.last_1],
                        backgroundColor: 'rgba(47, 30, 154, 0.6)',
                        hoverBackgroundColor: 'rgba(47, 30, 154, 0.6)',
                        borderColor: 'rgba(47, 30, 154, 0.6)',
                        fill: false
                    },
                ]
            }
        }
    }
    
    render(){        
        return (
            <React.Fragment>
                {this.initFunc()}
                <div className="card">
                    <div className="card_header"><span>네이버 플레이스 콘텐츠 수</span></div>
                    <div className="line_card card_body">
                        <div className="row-3 column">
                            <div className="graph line" id="graph_line">
                                {/* <div className="graph_title">#대표 키워드</div>
                                <div className="graph_desc">회사대표 키워드의 월별 네이버 블로그 컨텐치 수</div> */}
                                <Line
                                    data={this.info === '' ? data_ : this.data}
                                    options={options}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default NaverBlogContents;

var data_ = {
    labels: ['6개월 전', '5개월 전', '4개월 전', '3개월 전', '2개월 전', '한달 전'],
    datasets: [
        {
            label: '라이벌1',
            fillColor: 'rgba(151,187,205,0.2)',
            strokeColor: 'rgba(151,187,205,1)',
            pointColor: 'rgba(151,187,205,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(151,187,205,1)',
            data: [28, 48, 40, 19, 86, 27, 90],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            hoverBackgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 0.6)',
            fill: false
        },
    ]
};
  
const options = {
    // scaleShowGridLines: true,
    // scaleGridLineColor: 'rgba(0,0,0,.05)',
    // scaleGridLineWidth: 1,
    // scaleShowHorizontalLines: true,
    // scaleShowVerticalLines: true,
    // bezierCurve: true,
    // bezierCurveTension: 0.4,
    // pointDot: true,
    // pointDotRadius: 4,
    // pointDotStrokeWidth: 1,
    // pointHitDetectionRadius: 20,
    // datasetStroke: true,
    // datasetStrokeWidth: 2,
    // datasetFill: true,
    // responsive: true,
    // maintainAspectRatio: false,
    // legendTemplate: '<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>',
    legend:{
        position: 'bottom'
    }
}
  