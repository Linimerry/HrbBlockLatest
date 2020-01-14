import { Component } from '@angular/core';
import { ChartsService } from './charts.service';
import { SeatAllocationDetail } from '../../Model/seatallocation';
import { GlobalService } from '../../../../shared/services/global.service';

@Component({
  selector: 'app-echarts',
  templateUrl: './echarts.component.html',
  styleUrls: ['./echarts.component.scss'],
  providers: [ChartsService]
})
export class EChartsComponent {
  showloading: boolean = false;
  BarOption;  
  PieOption;
  AnimationBarOption;
  LineOption = {};

  constructor(private chartsService: ChartsService,private globalservice:GlobalService) {    
    this.BarOption = this.chartsService.getBarOption();    
    this.PieOption = this.chartsService.getPieOption();
    this.AnimationBarOption = this.chartsService.getAnimationBarOption();
  }
  ngOnInit() {    
    this.GenerateMonthlyLocationHeadCountChart();
  }
  GenerateMonthlyLocationHeadCountChart(){
    this.chartsService.GenerateMonthlyLocationHeadCountChart().subscribe(data=>{
      var legenddata:string[]=[];
      var series=[];
      data.forEach(item=>{
        legenddata.push(item.location);
        var seriesdata={name:item.location,type:'line',smooth:true,data:this.chartsService.GetMonthlyLocationDataFromDates(item,2017)}
        series.push(seriesdata)
      })  
      this.LineOption = {
        tooltip: {},
        legend: {
            data: legenddata,
            align: 'left'
        },
        xAxis: {
            type: 'category',
            data: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
        },
        yAxis: {
            type: 'value'
        },
        series: series
    };
},
error=>{
  this.globalservice.InactivityLogOut(error);
});
  }
}
