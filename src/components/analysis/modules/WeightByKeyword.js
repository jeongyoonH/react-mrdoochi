import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';

class WeightByKeyword extends Component {
    render(){
        const category = this.props.category;
        
        var data = {
            labels: [
                'none',
                'none',
                'none',
                'none',
                'none',
            ],
            datasets: [{
                data: [
                    0,
                    0,
                    0,
                    0,
                    0
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ],
                hoverBackgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ]
            }]
        };
        let naver_ad = ''
        const initSet = () => {
            if(this.props.info!==''){
                naver_ad = this.props.info.myCompany.naver_ad;
                // let data1=0, data2=0, data3=0, data4=0, data5=0;
                // if(naver_ad.ad_keyword1['search_'+category]!==undefined)
                //     data1 = (naver_ad.ad_keyword1['search_'+category]).replace(',','');
                // if(naver_ad.ad_keyword2['search_'+category]!==undefined)
                //     data2 = (naver_ad.ad_keyword2['search_'+category]).replace(',','');
                // if(naver_ad.ad_keyword3['search_'+category]!==undefined)
                //     data3 = (naver_ad.ad_keyword3['search_'+category]).replace(',','');
                // if(naver_ad.ad_keyword4['search_'+category]!==undefined)
                //     data4 = (naver_ad.ad_keyword4['search_'+category]).replace(',','');
                // if(naver_ad.ad_keyword5['search_'+category]!==undefined)
                //     data5 = (naver_ad.ad_keyword5['search_'+category]).replace(',','');
                const label = []
              const data_num_set = []
	            if(Object.keys(naver_ad.ad_keyword1).length){
		            label.push(naver_ad.ad_keyword1.keyword)
		            data_num_set.push((naver_ad.ad_keyword1['search_'+category]).replace(',',''))
              }
		            
              
	            if(Object.keys(naver_ad.ad_keyword2).length){
		            label.push(naver_ad.ad_keyword2.keyword)
		            data_num_set.push((naver_ad.ad_keyword2['search_'+category]).replace(',',''))
		
	            }
		            
	            if(Object.keys(naver_ad.ad_keyword3).length){
		            label.push(naver_ad.ad_keyword3.keyword)
		            data_num_set.push((naver_ad.ad_keyword3['search_'+category]).replace(',',''))
		
		            // data3 = (naver_ad.ad_keyword3['search_'+category]).replace(',','');
		
	            }
	            if(Object.keys(naver_ad.ad_keyword4).length){
		            label.push(naver_ad.ad_keyword4.keyword)
		            data_num_set.push((naver_ad.ad_keyword4['search_'+category]).replace(',',''))
	            }
	            if(Object.keys(naver_ad.ad_keyword5).length){
		            label.push(naver_ad.ad_keyword5.keyword)
		            data_num_set.push((naver_ad.ad_keyword5['search_'+category]).replace(',',''))
	            }

                data = {
                    labels: label,
                    datasets: [{
                        data: data_num_set,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                            'rgba(255, 99, 132, 0.6)'
                        ],
                        hoverBackgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                            'rgba(255, 99, 132, 0.6)'
                        ],
                    }]
                };
            }
        }
        
        return (
            <React.Fragment>
                {initSet()}
                <div className="card">
                    <div className="card_header"><span>주요 키워드별 비중 - <span className="bold">{category==='pc'?'PC':'Mobile'}</span></span></div>
                    <div className="card_body">
                        <div className="graph pie">
                            
                            <Pie
                                data={data}
                                // legend={this.legendOpts}
                                options={{
                                    legend:{
                                        display:true,
                                        position:'right'
                                    }
                                }}
                                height={130}
                            />
                            
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
export default WeightByKeyword;