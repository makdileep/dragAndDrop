import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/service/shared-data.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
    selector: 'app-menus',
    templateUrl: './menus.component.html',
    styleUrls: ['./menus.component.scss'],

})
export class MenusComponent implements OnInit {
    sampleLogo: any = [];
    sampleLogoForm: FormGroup;
    countries: string[];
    constructor(private sd: SharedDataService) {
        this.sampleLogoForm = new FormGroup({
            inputBox: new FormControl(''),
            checkBox: new FormControl('true'),
            radioBox: new FormControl('true'),
            selectBox: new FormControl('')
        });
        this.countries = this.sd.countries;
    }

    ngOnInit() {
        this.sampleLogo = this.sd.inputArray;
        this.sampleLogo.forEach(element => {
            if (element.Name == 'input') {
                this.sampleLogoForm.patchValue({
                    'inputBox': element.Value
                })
            } else if(element.Name == 'select') {
                this.sampleLogoForm.controls['selectBox'].setValue( element.Value);
            }
        });

    }

}
