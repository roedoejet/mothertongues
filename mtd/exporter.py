import os
from pandas import ExcelWriter

def returnProcessedDFAs(df, export_path, export_type="json"):
    """Use pandas export functions with some sensible defaults
    to export raw data to xlsx/json/csv/psv/tsv/html
    """
    if os.path.isdir(export_path):
        export_path = os.path.join(export_path, f"output.{export_type}")
    if not export_path.endswith(export_type):
        raise TypeError(f"Export type of {export_type} does not match file at {export_path}")
    if export_type == "xlsx":
        writer = ExcelWriter(export_path)
        df.to_excel(writer, 'sheet1', index=False, merge_cells=False)
        writer.save()
    else:
        with open(export_path, 'w', encoding='utf8') as f:
            if export_type == "json":
                df.to_json(f, orient='records', force_ascii=False)
            elif export_type == "csv":
                df.to_csv(f, encoding='utf-8', index=False)
            elif export_type == "psv":
                df.to_csv(f, sep='|', encoding='utf-8', index=False)
            elif export_type == "tsv":
                df.to_csv(f, sep='\t', encoding='utf-8', index=False)
            elif export_type == "html":
                utf8 = "<head><meta charset=\"UTF-8\"></head>"
                f.write(utf8)
                df.to_html(f)