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
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    title = 'app';
    loginForm: FormGroup;
    inputFields: any = [];
    radioLabel: string = "Radio label";
    cBoxLebel: string = "Checkbox label";
    private dialogData = {
        inputType: ""
    }

    // todo = [
    //   {
    //     type: "T",
    //     name: "UserName"
    //   },
    //   {
    //     type: "C",
    //     name: "UserCheck"
    //   },
    //   {
    //     type: "R",
    //     name: "UserRadio"
    //   },
    //   {
    //     type: "D",
    //     name: "Select"
    //   }
    // ];

    // todo = [
    //   {
    //     id: "I",
    //     value: "Input Box"
    //   },
    //   {
    //     id: "C",
    //     value: "Check Box"
    //   },
    //   {
    //     id: "S",
    //     value: "Select Box"
    //   },
    //   {
    //     id: "R",
    //     value: "Radio Box"
    //   }
    // ];

    todo = [
        "InputBox",
        "CheckBox",
        "SelectBox",
        "RadioBox",
        "Button"
    ];

    done = [

    ];

    constructor(private formBuilder: FormBuilder, private sharedData: SharedDataService,
        private router: Router, private dialog: MatDialog) {
        this.loginForm = new FormGroup({
            InputBox: new FormControl(''),
            CheckBox: new FormControl(''),
            RadioBox: new FormControl(''),
            SelectBox: new FormControl('')
        });

        // this.loginForm.addControl('mani', new FormControl(''));
        // this.loginForm.addControl('kalai', new FormControl(''));

    }

    ngOnInit() {
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
        // this.inputFields.push(this.done);
        // console.log(this.done);

        switch (event.container.data) {
            // case 'InputBox':
        }
    }

    opemModel(event) {
        this.dialogData.inputType = event;
        console.log(event);
        let dialogRef = this.dialog.open(DialogComponent, {
            width: '500px',
            data: this.dialogData,
            // autoFocus: false
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
            if(result.fieldValue !== ""){
                this.patchModelValues(result);
            } else {
                return null;
            }
        });
    }

    patchModelValues(data: any) {
        // console.log(data.fieldType);
        // console.log(data.fieldValue);
        switch (data.fieldType) {
            case "T":
            case "P":
            case "E":
            case "N":
                this.loginForm.patchValue({
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
                break;
            default:
                console.log(this.loginForm.value.InputBox);
        }

        this.sharedData.inputArray = [];
        // for (let i = 0; i < this.inputFields.length; i++) {
        //     const input: InputContainer = new InputContainer(this.inputFields[i]);
        //     this.sharedData.inputArray.push(input);
        // }
        this.sharedData.inputArray = this.inputFields;
        console.log(this.sharedData.inputArray);
    }
    
    publishUI() {
        this.router.navigate(['menu']);
    }

    login() {

    }

}
