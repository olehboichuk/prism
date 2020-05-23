import {Component, OnInit, ViewChild} from '@angular/core';
import {AppService} from '../services/app.service';
import {TypeModel} from '../models/type.model';
import {TableModel} from '../models/table.model';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {DonutModel} from '../models/donut.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  displayedColumns = ['year', 'countOne', 'countTwo', 'countThree', 'countFour'];
  namesColumn: string[] = [];
  inputData: TypeModel[] = [];
  years: number[] = [];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  dataSource: any;
  tableData: TableModel[] = [];

  constructor(private appService: AppService) {
  }

  ngOnInit(): void {
    this.appService.getData().subscribe(res => {
      this.inputData = res;
      this.changeDataType();
      this.dataSource = new MatTableDataSource<TableModel>(this.tableData);
      this.dataSource.sort = this.sort;
    });
    this.appService.dataOutput = this.getTotalData();
  }

  changeDataType() {
    this.inputData.forEach(elem => {
      this.namesColumn.push(elem.types);
      for (const year in elem.count) {
        if (!this.years.includes(+year)) {
          this.years.push(+year);
        }
      }
    });
    this.years.sort((a, b) => b - a);
    this.years.forEach(year => {
      this.tableData.push({
        year,
        countOne: this.getCount(year, 0),
        countTwo: this.getCount(year, 1),
        countThree: this.getCount(year, 2),
        countFour: this.getCount(year, 3)
      });
    });
    console.log(this.tableData);
  }

  getCount(year: number, type: number) {
    if (this.inputData.find(el => el.types === this.namesColumn[type]).count[year]) {
      return this.inputData.find(el => el.types === this.namesColumn[type]).count[year];
    } else {
      return '-';
    }
  }

  getTotal(colunn: string) {
    return this.tableData.map(t => t[colunn]).reduce((acc, value) => acc + (value === '-' ? 0 : value), 0);
  }

  getTotalData() {
    const dataOutput: DonutModel[] = [];
    let i = 1;
    this.namesColumn.forEach(el => {
      dataOutput.push({name: el, count: this.getTotal(this.displayedColumns[i])});
      i++;
    });
    return dataOutput;
  }
}


