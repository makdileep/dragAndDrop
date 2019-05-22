import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-menus',
    templateUrl: './menus.component.html',
    styleUrls: ['./menus.component.css'],

})
export class MenusComponent implements OnInit {
    sampleLogo: any = [];
    sampleLogoForm: FormGroup;
    constructor(private sd: SharedDataService) {
        this.sampleLogoForm = new FormGroup({
            inputBox: new FormControl(''),
            checkBox: new FormControl(''),
            radioBox: new FormControl(''),
            selectBox: new FormControl('')
        });
    }

    ngOnInit() {
        console.log(this.sd.inputArray);
        this.sampleLogo = this.sd.inputArray;
        this.sampleLogo.forEach(element => {
            if (element.Name == 'input') {
                this.sampleLogoForm.patchValue({
                    'inputBox': element.Value
                })
            }
        });

    }

}
