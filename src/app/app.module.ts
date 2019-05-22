import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MenusComponent } from './dashboard/menus/menus.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
// import { MatDialogModule } from '@angular/material';
import { DialogComponent } from './dialog/dialog.component';
// import { MaterialModule } from '.@angular/material.module';
import {
  MatCardModule,
  MatButtonModule,
  MatGridListModule,
  MatToolbarModule,
  MatMenuModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatDialogModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatStepperModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,    
  MatSelectModule,
  MatTabsModule,
  MatAutocompleteModule,
  MatButtonToggleModule,
  MatBottomSheetModule,
  MatTableModule
} from '@angular/material';
import { SharedDataService } from './service/shared-data.service';

@NgModule({
  declarations: [
    AppComponent,
    MenusComponent,
    LoginComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule
    // MaterialModule
  ],
  entryComponents: [DialogComponent],
  providers: [SharedDataService],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
