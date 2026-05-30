import React from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const ExportToExcel = ({ data }) => {
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Dashboard Data');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'DashboardData.xlsx');
  };

  return (
    <button onClick={exportToExcel}>
      Export to Excel
    </button>
  );
};

export default ExportToExcel;