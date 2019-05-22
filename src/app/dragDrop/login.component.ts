import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NgSwitchCase } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogComponent } from '../dialog/dialog.component';
import { SharedDataService } from '../service/shared-data.service';
import { InputContainer } from '../shared/model/inputContainer';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    title = 'app';
    dragDropForm: FormGroup;
    todo: any = [];
    inputFields: any = [];
    radioLabel: string = "Radio label";
    cBoxLebel: string = "Checkbox label";
    private dialogData = {
        inputType: ""
    }
    done = [];
    countries: string[];
    default: string = 'Select Option';
    constructor(private formBuilder: FormBuilder, private sharedData: SharedDataService,
        private router: Router, private dialog: MatDialog) {
        this.dragDropForm = new FormGroup({
            InputBox: new FormControl(''),
            CheckBox: new FormControl(''),
            RadioBox: new FormControl(''),
            SelectBox: new FormControl('')
        });
        this.dragDropForm.controls['SelectBox'].setValue(this.default, {onlySelf: true});
    }

    ngOnInit() {
        this.todo = this.sharedData.todo;
        this.countries = this.sharedData.countries;
    }


    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex);
        }
    }

    opemModel(event) {
        this.dialogData.inputType = event;
        let dialogRef = this.dialog.open(DialogComponent, {
            width: '400px',
            data: this.dialogData,
        });

        dialogRef.afterClosed().subscribe(result => {
            if(result.fieldValue !== ""){
                this.patchModelValues(result);
            } else {
                return null;
            }
        });
    }

    patchModelValues(data: any) {
        switch (data.fieldType) {
            case "T":
            case "P":
            case "E":
            case "N":
                this.dragDropForm.patchValue({
                    "InputBox": data.fieldValue
                })
                let inputType = (data.fieldType == "T") ? "text" : (data.fieldType == "P") ? "password" : (data.fieldType == "E") ? "email" : (data.fieldType == "N") ? "number" : "text";
                let inputObj = {
                    Name: "input",
                    Type: inputType,
                    Value: data.fieldValue
                }
                this.inputFields.push(inputObj);
                break;
            case "S":
            case "R":
                let btnType = (data.fieldType == "S") ? "Submit" : "Reset";
                let btntObj = {
                    Name: "button",
                    Type: btnType,
                    Value: data.fieldValue
                }
                this.inputFields.push(btntObj);
                break;
            case "checkbox":
                this.inputFields.push({ Name: "checkbox" , Value :data.fieldValue});
                this.cBoxLebel = data.fieldValue;
                break;
            case "radio":
                this.inputFields.push({ Name: "radio" , Value :data.fieldValue});
                this.radioLabel = data.fieldValue; 
                break;
            case "select":
                this.inputFields.push({ Name: "select", Value :data.fieldValue });
                this.dragDropForm.controls['SelectBox'].setValue(data.fieldValue);
                break;
            default:
                console.log("Not correct type");
                break;
        }

        this.sharedData.inputArray = [];
        // for (let i = 0; i < this.inputFields.length; i++) {
        //     const input: InputContainer = new InputContainer(this.inputFields[i]);
        //     this.sharedData.inputArray.push(input);
        // }
        this.sharedData.inputArray = this.inputFields;
    }
    
    publishUI() {
        this.router.navigate(['menu']);
    }

    dragDrop() {

    }

}
