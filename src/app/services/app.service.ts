import {Injectable} from '@angular/core';
import {root} from 'rxjs/internal-compatibility';
import {of} from 'rxjs';
import {data} from './data';
import {DonutModel} from '../models/donut.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  dataOutput: DonutModel[];

  constructor() {
  }

  getData() {
    return of(data.Type);
  }
}
