import { Injectable } from '@angular/core';
import { InputContainer } from '../shared/model/inputContainer';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }

  inputArray: Array<InputContainer>;

}
