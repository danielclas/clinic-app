import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { COLLECTION_ACTIVITY, COLLECTION_LOGS } from './constants';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

@Injectable({
  providedIn: 'root'
})

export class ReportsService {

  constructor(
    private firestore: AngularFirestore) { }

  exportAsExcelFile(json: any[], name: string): void {

    let worksheet = XLSX.utils.json_to_sheet(json);
    let workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    let excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    this.saveAsExcelFile(excelBuffer, name);
  }

  getSignUpLog(){
    return this.firestore.collection(COLLECTION_LOGS).get();
  }

  getSpecialtiesLog(){
    return this.firestore.collection(COLLECTION_ACTIVITY).get();
  }

  private saveAsExcelFile(buffer: any, name: string): void {
      let data = new Blob([buffer], {type: EXCEL_TYPE});
      saveAs(data, name + '.xlsx');
  }


}
