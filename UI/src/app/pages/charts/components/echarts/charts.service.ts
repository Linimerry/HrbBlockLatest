import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SeatAllocationDetail }  from '../../Model/seatallocation'
import {  AuthGuardSeviceGuard } from '../../../../shared/services/auth-guard.service';
import { VendorPieChartModel } from '../../Model/vendorpiechartmodel';

@Injectable()
export class ChartsService {
    xAxisData = [];
    data1 = [];
    data2 = [];
    MsquareLocationData=[];
    YamunaLocationData=[];    
    LineOption = {};
    constructor(private httpClient:HttpClient,private authGuardService: AuthGuardSeviceGuard) {        

        for (var i = 0; i < 32; i++) {
            this.xAxisData.push(i);
            this.data1.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5); 
            this.data2.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
        }    
        //this.GenerateMonthlyLocationHeadCountChart();    
    }
    GenerateMonthlyLocationHeadCountChart(){
        var url = this.authGuardService.APIHost + "api/chart/seatallocation";
        return this.httpClient.get<SeatAllocationDetail[]>(url,{
            headers: new HttpHeaders(this.authGuardService.GetAuthHeader)
          });
    }

    GenerateVendorPieChart(){
        var url = this.authGuardService.APIHost + "api/chart/vendordetails";
        return this.httpClient.get<VendorPieChartModel[]>(url,{
            headers: new HttpHeaders(this.authGuardService.GetAuthHeader)
          });
    }

    GetMonthlyLocationDataFromDates(data:SeatAllocationDetail,currentyear:Number){     
        var datearray:Date[]=data.ActualHireDate;
        var valuearray:Number[]=data.SeatAllocation;   
        var LocationData:Number[]=[0,0,0,0,0,0,0,0,0,0,0,0];
        datearray.forEach((x,index)=>{
            var curdate = new Date(x);
            if(curdate.getFullYear()==currentyear){
            var month = curdate.getMonth()
                switch (month) {
                    case 0:
                        LocationData[0] = valuearray[index];
                        break
                    case 1:
                        LocationData[1] = valuearray[index];
                        break
                    case 2:
                        LocationData[2] = valuearray[index];
                        break
                    case 3:
                        LocationData[3] = valuearray[index];
                        break
                    case 4:
                        LocationData[4] = valuearray[index];
                        break
                    case 5:
                        LocationData[5] = valuearray[index];
                        break
                    case 6:
                        LocationData[6] = valuearray[index];
                        break
                    case 7:
                        LocationData[7] = valuearray[index];
                        break
                    case 8:
                        LocationData[8] = valuearray[index];
                        break
                    case 9:
                        LocationData[9] = valuearray[index];
                        break
                    case 10:
                        LocationData[10] = valuearray[index];
                        break
                    case 11:
                        LocationData[11] = valuearray[index];
                        break
                }  
        }                              
        })
        return LocationData;
    }

    GeneratePieOptions(data:VendorPieChartModel[]){
        var legenddata:string[]=[];
        var seriesdata=[];
        var pieoption={};
        var name:string="";
        data.forEach(detail => {
          legenddata.push(detail.VendorName);
          seriesdata.push({value: detail.TotalCount, name: detail.VendorName});
          name= detail.Value;               
        });
        // legenddata.push("Example1");
        // seriesdata.push({value: 18, name: "Example1"});
        pieoption = {
          tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
              orient: 'vertical',
              x: 'left',
              data: legenddata
          },
          roseType: '',
          series: [
              {
                  name: name,
                  type: 'pie',
                  radius: [0, '50%'],
                  data: seriesdata
              }
          ]
      }      
        return pieoption;   
    }

    PieOption = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data: ['Example1', 'Example2', 'Example3']
        },
        roseType: 'angle',
        series: [
            {
                name: 'PieChart',
                type: 'pie',
                radius: [0, '50%'],
                data: [
                    { value: 235, name: 'Example1' },
                    { value: 210, name: 'Example2' },
                    { value: 162, name: 'Example3' }
                ]
            }
        ]
    }    

    BarOption = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {            
                type: 'shadow'       
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: 'Barchart',
                type: 'bar',
                barWidth: '60%',
                data: [10, 52, 200, 334, 390, 330, 220]
            }
        ]
    };

    AnimationBarOption = {
        legend: {
            data: ['MSquare', 'Yamuna'],
            align: 'left'
        },
        /* toolbox: {
            // y: 'bottom',
            feature: {
                magicType: {
                    type: ['stack', 'tiled']
                },
                dataView: {},
                saveAsImage: {
                    pixelRatio: 2
                }
            }
        }, */
        tooltip: {},
        xAxis: {
            data: this.xAxisData,
            silent: false,
            splitLine: {
                show: false
            }
        },
        yAxis: {
        },
        series: [{
            name: 'MSquare',
            type: 'line',
            data: this.data1,
            animationDelay: function (idx) {
                return idx * 10;
            }
        }, {
            name: 'Yamuna',
            type: 'line',
            data: this.data2,
            animationDelay: function (idx) {
                return idx * 10 + 100;
            }
        }],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
            return idx * 5;
        }
    };

    getBarOption() {
        return this.BarOption;
    }
    getLineOption():any {
        return this.LineOption;
    }
    getPieOption() {
        return this.PieOption;
    }
    getAnimationBarOption() {
        return this.AnimationBarOption;
    }


    
}
