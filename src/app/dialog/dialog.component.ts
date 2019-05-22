import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogOptions } from '../shared/model/DialogOptions';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { SharedDataService } from '../service/shared-data.service';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
    public dialogOptions: DialogOptions;
    modifyForm: FormGroup;
    inputType: any = [];
    countries: string[];
    btnType: any = [];
    default: string = 'Select Option';

    constructor(public dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private formBuilder: FormBuilder,
        private sharedData: SharedDataService) {

        this.dialogOptions = data;
        this.dialogRef.disableClose = true;
        this.dialogRef.updateSize('500px');
        this.modifyForm = new FormGroup({
            fieldType: new FormControl(''),
            fieldValue: new FormControl('')
        });
    }

    ngOnInit() {
        this.inputType = this.sharedData.inputType;
        this.btnType = this.sharedData.btnType;
        this.countries = this.sharedData.countries;

        if (this.dialogOptions.inputType == 'S')
            this.modifyForm.controls['fieldValue'].setValue(this.default, { onlySelf: true });

    }

    onCancelClick() {
        this.dialogRef.close();
    }

    modifyFormSubmit() {
        if (this.dialogOptions.inputType == "R") this.modifyForm.patchValue({ 'fieldType': "radio" })
        else if (this.dialogOptions.inputType == "S") this.modifyForm.patchValue({ 'fieldType': "select" })
        else if (this.dialogOptions.inputType == "C") this.modifyForm.patchValue({ 'fieldType': "checkbox" })
        this.dialogRef.close(this.modifyForm.value);

    }

}
