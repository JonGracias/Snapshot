import openpyxl
import json

def iterate_column_data(sheet, column_index, word_to_count):
    column_data = []
    word_count = 0
    row_occurrences = []

    data_range = sheet.iter_rows(min_row=2, values_only=True, min_col=column_index, max_col=column_index)

    for row_index, cell_value in enumerate(data_range, start=2):
        if cell_value[0]:
            cell_value_lower = str(cell_value[0]).lower()
            if word_to_count.lower() in cell_value_lower:
                column_data.append(str(cell_value[0]))
                word_count += 1
                row_occurrences.append(row_index)

    return column_data, word_count, row_occurrences

def create_json_data():
    # Load the Excel file
    file_path = '/home/jgracias/Snapshot/tempDB/spreadsheet/may2023/Jobs_Report.xlsx'
    workbook = openpyxl.load_workbook(file_path)

    # Specify the sheet name
    sheet_name = 'Jobs_Report.xls'

    # Get the sheet
    sheet = workbook[sheet_name]

    # Iterate over the columns and extract the data
    loss_column, mold_count, mold_occurrences = iterate_column_data(sheet, 9, "Mold")
    reason_closed_column, taken_count, taken_occurrences = iterate_column_data(sheet, 12, "Estimate Awarded")
    job_status, invoice_pending_count, invoice_pending_occurences = iterate_column_data(sheet, 11, "Invoice Pending")

    # manipulate the data here
    

    # Create a dictionary to store the data
    data = {
        'Type of Loss': loss_column,
        'Mold Count': mold_count,
        'Mold Occurrences': mold_occurrences,
        'Reason Closed': reason_closed_column,
        'Estimate Awarded Count': taken_count,
        'Estimate Awarded Occurrences': taken_occurrences,
        'Job Status': job_status,
        'Invoice Pending Count': invoice_pending_count,
        'Invoice Pending Occurance': invoice_pending_occurences,
    }

    # Convert the data to formatted JSON
    json_data = json.dumps(data, indent=4)

    # Save the JSON data to a file
    json_file_path = '/home/jgracias/Snapshot/tempDB/json_database/data.json'
    with open(json_file_path, 'w') as json_file:
        json_file.write(json_data)

    print("JSON data created:", json_data)

create_json_data()
