import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ExportToExcel from './ExportToExcel';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import '@testing-library/jest-dom';

jest.mock(
  'file-saver',
  () => ({
    saveAs: jest.fn(),
  }),
  { virtual: true }
);

jest.mock(
  'xlsx',
  () => ({
    utils: {
      json_to_sheet: jest.fn(),
      book_new: jest.fn(),
      book_append_sheet: jest.fn(),
    },
    write: jest.fn(),
  }),
  { virtual: true }
);

describe('ExportToExcel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Export to Excel button', () => {
    render(<ExportToExcel data={[]} />);
    expect(screen.getByRole('button', { name: /export to excel/i })).toBeInTheDocument();
  });

  test('exports provided data to an xlsx file on click', () => {
    const data = [{ timestamp: '2024-06-01', alerts: 10 }];
    const worksheet = { A1: { v: 'timestamp' } };
    const workbook = { Sheets: {}, SheetNames: [] };
    const excelBuffer = new Uint8Array([1, 2, 3]);

    XLSX.utils.json_to_sheet.mockReturnValue(worksheet);
    XLSX.utils.book_new.mockReturnValue(workbook);
    XLSX.write.mockReturnValue(excelBuffer);

    render(<ExportToExcel data={data} />);
    fireEvent.click(screen.getByRole('button', { name: /export to excel/i }));

    expect(XLSX.utils.json_to_sheet).toHaveBeenCalledWith(data);
    expect(XLSX.utils.book_new).toHaveBeenCalledTimes(1);
    expect(XLSX.utils.book_append_sheet).toHaveBeenCalledWith(workbook, worksheet, 'Dashboard Data');
    expect(XLSX.write).toHaveBeenCalledWith(workbook, { bookType: 'xlsx', type: 'buffer' });

    expect(saveAs).toHaveBeenCalledTimes(1);
    expect(saveAs).toHaveBeenCalledWith(expect.any(Blob), 'DashboardData.xlsx');
  });
});
