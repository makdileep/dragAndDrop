import { Injectable } from '@angular/core';
import { InputContainer } from '../shared/model/inputContainer';

@Injectable({
    providedIn: 'root'
})
export class SharedDataService {

    constructor() { }
    todo = [
        "InputBox",
        "CheckBox",
        "SelectBox",
        "RadioBox",
        "Button"
    ];
    countries = ['Select Option','USA','India', 'UK', 'Canada'];
    inputType = [
        {
            title: "text",
            value: "T"
        },
        {
            title: "password",
            value: "P"
        },
        {
            title: "email",
            value: "E"
        },
        {
            title: "number",
            value: "N"
        }
    ]

    btnType = [
        {
            title: "Submit",
            value: "S"
        },
        {
            title: "Reset",
            value: "R"
        }
    ]
    inputArray: Array<InputContainer>;

}
