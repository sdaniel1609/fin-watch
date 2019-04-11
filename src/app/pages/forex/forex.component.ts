import { Component, OnInit } from '@angular/core';
import {ForexService} from '../../services/forex.service';
import {Forex} from '../../model/forex';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-forex',
  templateUrl: './forex.component.html',
  styleUrls: ['./forex.component.css']
})
export class ForexComponent implements OnInit {

  forexPrice: Forex;

  public barChartOptions = {
    scaleShowVertivalLines: false,
    resposive: true
  };

  public barChartLabels = [this.forexPrice];
  public barChartType = 'line';
  public barChartLegend = true;

  public barChartData = [
    {data: [this.forexPrice], label: 'Series A'},
  ]
  constructor(private forexService: ForexService) { }

  ngOnInit() {
   // this.forexService.getCurrencyPrice()
   //   .subscribe(res => {
  //      console.log(res);


  /*      const occurred_at = res.map(res => res.occurred_at);
        const close_bid = res.map(res => res.close_bid);

        const date = []
        occurred_at.forEach((res) => {
          const jsdate = new Date(res * 1000)
          date.push(jsdate.toLocaleDateString('en', {year: 'numeric', month: 'short', day: 'numeric'}));
        })
          console.log(date);*/
     // });
  }

}
