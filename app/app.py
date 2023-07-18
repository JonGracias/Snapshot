from flask import Flask, render_template, request,redirect,jsonify
from flask_pymongo import PyMongo
from operator import itemgetter
from flask_caching import Cache
from datetime import datetime
from flask import Markup
import pandas as pd
import openpyxl
import dotenv
import flask
import json
import os
import re

dotenv.load_dotenv()
app = Flask(__name__)
app.config.update(
    TESTING=True,
    TEMPLATES_AUTO_RELOAD=True,
    DEBUG=True,
    MONGO_URI=os.getenv("DATABASE_URL"),
    SECRET_KEY=os.getenv("SECRET_KEY"),
    CACHE_TYPE = 'simple'
)

mongo = PyMongo(app)
cache = Cache(app)
current_user = "user"  
collection_name = f"{current_user}" 

#--------------------------------------Routes-----------------------------------------------------#
@app.route('/save', methods=['GET'])
def save():
    return render_template('save.html')

@app.route('/navigation', methods=['GET', 'POST'])
def navigation():
    if request.method == 'POST':
        clicked_items = request.form.get('clickedItems')
        clicked_items = json.loads(clicked_items)
        titles, table_htmls, dates, number_of_tables, positions = format_for_html(clicked_items)
        return render_template('navigation.html',
                                titles=titles,
                                table_htmls=table_htmls,
                                dates=dates,
                                number_of_tables=number_of_tables,
                                positions=positions)

    elif request.method == 'GET':
        date = datetime.now()
        formatted_date = date.strftime("%m / %d / %Y")
        titles = [' Welcome']
        table_htmls = ['Message to users']
        dates = [formatted_date]
        number_of_tables = 0
        positions = ['0']

        return render_template('navigation.html',
                                titles=titles,
                                table_htmls=table_htmls,
                                dates=dates,
                                number_of_tables=number_of_tables,
                                positions=positions,)

@app.route('/browseDB', methods=['GET'])
@cache.cached(timeout=300)
def browse():
    query = ''
    results_html = format_for_browse(query)
    return render_template('load.html', results_html=results_html)

@app.route('/search', methods=['POST'])
def search_results():
    query = request.form['query']
    results_html = format_for_browse(query)
    return render_template('load.html', results_html=results_html)

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

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.html')


#---------------------------------Functions and Classes----------------------#
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
    def get(clicked_items=None):
        if clicked_items:
            # Retrieve MongoDB documents based on clicked_items
            documents = list(
                mongo.db[collection_name].find({'name': {'$in': clicked_items}})
            )
        else:
            documents = list(mongo.db[collection_name].find())

        if documents and 'content' in documents[0]:
            return documents
        else:
            print("No documents found or missing 'content' field")
            return [
                {
                    '_id': 'None',
                    'name': 'No Data Found',
                    'position_number': 0,
                    'date': '00/0000',
                    'content': '{\n    "Sheet1": [{\n"Load": "To Get",\n"Data": "Started"\n}]}',
                }
            ]

def format_for_browse(query):
    if query:
        regex_query = re.compile(f'.*{query}.*', re.IGNORECASE)
        documents = mongo.db[collection_name].find({'name': regex_query})
    else:
        documents = mongo.db[collection_name].find({}, {"name": 1, "_id": 0})
    
    data = [doc["name"] for doc in documents]
    titles = set(data)
    
    unique_titles = list(titles)

    if unique_titles:
        job_list_html = '<ul>'
        for index, title in enumerate(unique_titles):
            job_name = title
            job_list_html += f'<button class="job-button">{job_name}</button>'
        job_list_html += '</ul>'

        if query:
            results_html = Markup(f'<p>Search Results for "{query}":</p>{job_list_html}')
        else:
            results_html = Markup(f"{job_list_html}")
    else:
        results_html = Markup('Nothing in Database.' if not query else f'No results found for "{query}".')

    return results_html




def format_for_html(clicked_items=None):
    data = Spreadsheet.get(clicked_items)
    sorted_data = sorted(data, key=itemgetter('position_number', 'date'), reverse=True)
    if clicked_items:
        number_of_tables = len(clicked_items)
    else:
        number_of_tables = 1

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
        if isinstance(content_dict[content_key], str):
            transformed_content = [{k: v.replace('\n', '')} for k, v in json.loads(content_dict[content_key]).items()]
        else:
            transformed_content = [
                {k: v.replace('\n', '') for k, v in entry.items()} for entry in content_dict[content_key]
            ]
        contents.append(transformed_content)

    dfs = []
    for content in contents:
        if isinstance(content, str):
            df = pd.DataFrame()
        else:
            df = pd.DataFrame(content)
        dfs.append(df)

    table_htmls = [df.to_html(index=False) for df in dfs]

    return titles, table_htmls, dates, number_of_tables, positions

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

if __name__ == '__main__':
    app.run(host='localhost', port=5000)
