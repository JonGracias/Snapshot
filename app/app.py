from flask import Flask, render_template, request,redirect, url_for
from flask_pymongo import PyMongo
from operator import itemgetter
from datetime import datetime
from flask import Markup
import pandas as pd
import openpyxl
import dotenv
import flask
import json
import os

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
    def save(content, name, date, position_number):
        id = f"{name}-{date}"
        timestamp = datetime.now()
        filter_query = {"_id":id}
        existing_document = mongo.db[collection_name].find_one(filter_query)

        if existing_document:
            update_operation = {"$set": {"content": content}}
            mongo.db[collection_name].update_one(filter_query, update_operation)
        else:
            data = {"_id":id, "name": name, "position_number": position_number, "date":date, "timestamp": timestamp, "content": content}
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

    sorted_data = sorted(data, key=itemgetter('position_number', 'date'), reverse=True)
    number_of_tables = largest_position_number()

    titles = []
    contents = []
    dates = []
    positions = []


    for document in sorted_data:
        title = document.pop('name')
        titles.append(title)

        date = document.pop('date')
        dates.append(date)

        position = document.pop('position_number')
        positions.append(position)

        content = document.pop('content')
        content_dict = json.loads(content)

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

    table_htmls =[df.to_html(index=False) for df in dfs] 
    print(positions)



    return titles, table_htmls, dates, number_of_tables, positions

@app.route('/file_upload', methods=['GET'])
def file_upload():
    return render_template('upload.html')

@app.route('/upload', methods=['POST'])
def upload():
    file = request.files['file']
    date = request.form['dateInput']

    workbook = openpyxl.load_workbook(file, data_only=True)
    json_data = format_workbook(workbook)

    for sheet_name, sheet_data in json_data.items():
        position_number = generate_position_number(sheet_name)
        name = sheet_name
        formatted_data = json.dumps({sheet_name: sheet_data}, indent=4)
        Spreadsheet.save(formatted_data, name, date, position_number)
    return flask.redirect(flask.url_for('index'))

def generate_position_number(sheet_name):
    result = mongo.db[collection_name].find_one({'name': sheet_name})

    if result:
        print(result['name']) 
        position_number = result['position_number']
    else:
        print('else')
        position_number = largest_position_number()

    return position_number

        

def largest_position_number():
    pipeline = [
        {"$group": {"_id": None, "max_number": {"$max": "$position_number"}}},
        {"$limit": 1}
    ]

    aggregation_result = mongo.db[collection_name].aggregate(pipeline)
    newest_document = next(aggregation_result, None)

    max_number = newest_document['max_number']+1 if newest_document else 0
    return max_number

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    spreadsheet_data = Spreadsheet.get()
    titles, table_htmls, dates, number_of_tables, positions = format_for_html(spreadsheet_data)
    print(number_of_tables)
    return render_template('index.html',
                            titles=titles,
                            table_htmls=table_htmls,
                            dates=dates,
                            number_of_tables = number_of_tables,
                            positions = positions)


@app.route('/search', methods=['POST'])
def search_results():
    query = request.form['query']
    results_html = generate_search_results(query)
    return render_template('search.html', results_html=results_html)

def generate_search_results(query):
    results = mongo.db[collection_name].find({'name': query})
    first_result = next(results, None)
    if first_result and 'content' in first_result:
        job_list_html = '<ul>'
        for result in results:
            job_name = result.get('name', '')
            job_date = result.get('date', '')
            job_list_html += f'<li>Name: {job_name}, Date: {job_date}</li>'
        job_list_html += '</ul>'

        results_html = Markup(f'<h1>Search Results for "{query}":</h1>{job_list_html}')
    else:
        results_html = Markup(f'No results found for "{query}".')
    
    
    return results_html

if __name__ == '__main__':
    app.run(host='localhost', port=5000)
