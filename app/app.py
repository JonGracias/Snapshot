import openpyxl
from flask import Flask, render_template, request,redirect, url_for
from flask_pymongo import PyMongo
import flask
import os
import dotenv
import json
import pandas as pd
from datetime import datetime
import bleach



dotenv.load_dotenv()
app = Flask(__name__)
app.config.update(
    TESTING=True,
    TEMPLATES_AUTO_RELOAD=True,
    DEBUG=True,
    MONGO_URI=os.getenv("DATABASE_URL"),
    SECRET_KEY=os.getenv("SECRET_KEY")
)

mongo = PyMongo(app)


mongo = PyMongo(app)
current_user = "user"  # Replace with your dynamic user value / session based /users
collection_name = f"{current_user}"  # Create the dynamic collection namemongo.db[collection_name].create_index([("timestamp", pymongo.ASCENDING)], expireAfterSeconds=3600, metaField="ts")


def format_date(date):
    month_names = {
        2: "January",
        3: "February",
        4: "March",
        5: "April",
        6: "May",
        7: "June",
        8: "July",
        9: "August",
        10: "September",
        12: "October",
        12: "November",
        1: "December"
    }

    month = date.strftime("%m")  # Get the month number as a string
    year = date.strftime("%Y")  # Get the year as a string

    # Format the date as "MonthYear"
    formatted_date = month_names[int(month)] + year

    return formatted_date

class Spreadsheet:
    @staticmethod
    def save(content, name, date):
        id = f"{name}-{date}"
        timestamp = datetime.now()
        filter_query = {"_id":id}
        existing_document = mongo.db[collection_name].find_one(filter_query)

        if existing_document:
            update_operation = {"$set": {"content": content}}
            mongo.db[collection_name].update_one(filter_query, update_operation)
        else:
            data = {"_id":id, "name": name, "date":date, "timestamp": timestamp, "content": content}
            mongo.db[collection_name].insert_one(data)



    @staticmethod
    def get():
        documents = list(mongo.db[collection_name].find())
        if documents and 'content' in documents[0]:
            print("returning docs")
            return documents
        else:
            print("No documents found or missing 'content' field")
            return {}


def format_workbook(workbook):
    data = {}
    for sheet_name in workbook.sheetnames:
        sheet = workbook[sheet_name]
        sheet_data = []
        headers = [cell.value for cell in sheet[1]]
        for row in sheet.iter_rows(min_row=2, values_only=True):
            row_data = {header: str(cell) for header, cell in zip(headers, row)}
            filtered_row_data = {k: v for k, v in row_data.items() if v is not None and k is not None}
            if filtered_row_data:
                sheet_data.append(filtered_row_data)
        data[sheet_name] = sheet_data
    return data

def format_for_html(data):
    upload = '''
    <div class='fileUploader'>
        <h1>File Upload</h1>
        <div id="dragContainer" ondragover="dragOverHandler(event)" ondragleave="dragLeaveHandler(event)" ondrop="dropHandler(event); setCurrentItem(0);">
            <p>Drag and drop a file here</p>
        </div>
        <form id="uploadForm" action="/upload" method="POST" enctype="multipart/form-data">
            <input id="fileInput" type="file" name="file">
            <label for="dateInput">Date (MM/YYYY):</label>
            <input type="text" id="dateInput" name="dateInput" pattern="\d{2}/\d{4}" required>
            <input type="submit" value="Upload">
        </form>
    </div>
    ''' 

    titles = [' ']
    contents = []
    dates = [' ']

    for document in data:
        title = document.pop('name')
        titles.append(title)

        content = document.pop('content')
        content_dict = json.loads(content)

        date = document.pop('date')
        dates.append(date)

        content_key = next(iter(content_dict.keys()))

        transformed_content = [{k: v.replace('\n', '') for k, v in entry.items()} for entry in content_dict[content_key]]
        
        contents.append(transformed_content)

    dfs = []
    for content in contents:
        if isinstance(content, str):
            df = pd.DataFrame()
        else:
            df = pd.DataFrame(content)
        dfs.append(df)
    table_htmls = [upload] + [df.to_html(index=False) for df in dfs]  # Add upload at index 0

    return titles, table_htmls, dates


@app.route('/')
def index():
    spreadsheet_data = Spreadsheet.get()
    titles, table_htmls, dates = format_for_html(spreadsheet_data)
    return render_template('index.html',
                            titles=titles,
                            table_htmls=table_htmls,
                            dates=dates)

        
@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['file']
    date = request.form['dateInput']

    workbook = openpyxl.load_workbook(file, data_only=True)
    json_data = format_workbook(workbook)

    for sheet_name, sheet_data in json_data.items():
        name = sheet_name
        formatted_data = json.dumps({sheet_name: sheet_data}, indent=4)
        Spreadsheet.save(formatted_data, name, date)
    return flask.redirect(flask.url_for('index'))


@app.route('/search', methods=['POST'])
def search_results():
    query = request.form['query']
    results_html = generate_search_results(query)
    return render_template('search_results.html', results_html=results_html)

def generate_search_results(query):
    results = mongo.db.snapshot.find_one({'Referred By': query})  
    if results:
        job_titles = [result['title'] for result in results['jobs']]
        job_list_html = '<ul>'
        for title in job_titles:
            job_list_html += f'<li>{title}</li>'
        job_list_html += '</ul>'

        results_html = f'<h1>Search Results for "{query}":</h1>{job_list_html}'
    else:
        results_html = f'<p>No results found for "{query}".</p>'
    
    
    return results_html

if __name__ == '__main__':
    app.run(host='localhost', port=5000)
