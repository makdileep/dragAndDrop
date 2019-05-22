import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogOptions } from '../shared/model/DialogOptions';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
    selector: 'app-dialog',
    templateUrl: './dialog.component.html',
    styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
    public dialogOptions: DialogOptions;
    modifyForm: FormGroup;
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
    constructor(public dialogRef: MatDialogRef<DialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder: FormBuilder) {
        this.dialogOptions = data;
        this.dialogRef.disableClose = true;
        this.dialogRef.updateSize('500px');
        this.modifyForm = new FormGroup({
            fieldType: new FormControl(''),
            fieldValue: new FormControl('')
        });
    }

    ngOnInit() {
        console.log(this.dialogOptions.inputType);
    }

    onCancelClick() {
        this.dialogRef.close();
    }

    modifyFormSubmit() {
        if(this.dialogOptions.inputType == "R") this.modifyForm.patchValue({ 'fieldType': "radio"})
        else if(this.dialogOptions.inputType == "S") this.modifyForm.patchValue({ 'fieldType': "select"})
        else if(this.dialogOptions.inputType == "C") this.modifyForm.patchValue({ 'fieldType': "checkbox"})
        this.dialogRef.close(this.modifyForm.value);
        
    }

}
