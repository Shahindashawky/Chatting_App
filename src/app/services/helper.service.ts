import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HelperService {

  dialogRef: any;
  constructor(private dialog: MatDialog, ) { }

  
  public openDialog(content, width?, val?): void {
    this.dialogRef = this.dialog.open(content, {
      width: width || '300px',
      maxHeight: '300px',
      data: val || {},
    });


    this.dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });

  }

  public closeModal(){
    this.dialogRef.close()
  }
}
