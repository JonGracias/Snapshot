from flask import Flask, render_template, request,redirect,jsonify
from collections import defaultdict 
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

@app.route('/navigation', methods=['POST'])
def navigation():
    clicked_items = request.form.get('clickedItems')
    if clicked_items:
        clicked_items = json.loads(clicked_items)
    else:
        clicked_items = ''
    result = format_for_html(clicked_items)
    return render_template('navigation.html', result=result)


@app.route('/browseDB', methods=['GET'])
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
        position = generate_position_number(sheet_name)
        title = sheet_name
        formatted_data = json.dumps({sheet_name: sheet_data}, indent=4)
        Spreadsheet.save(formatted_data, title, date, position)
    return flask.redirect(flask.url_for('index'))

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    return render_template('index.html')


#---------------------------------Functions and Classes----------------------#
class Spreadsheet:
    @staticmethod
    def save(table, title, date, position):
        id = f"{title}-{date}"
        timestamp = datetime.now()
        filter_query = {"_id":id}
        existing_document = mongo.db[collection_name].find_one(filter_query)

        if existing_document:
            update_operation = {"$set": {"table": table}}
            mongo.db[collection_name].update_one(filter_query, update_operation)
        else:
            data = {"_id":id, "title": title, "position": position, "date":date, "timestamp": timestamp, "table": table}
            mongo.db[collection_name].insert_one(data)

    @staticmethod
    def get(clicked_items=None):
        print('clicked Items: ' + str(clicked_items))
        if clicked_items:
            # Retrieve MongoDB documents based on clicked_items
            documents = list(
                mongo.db[collection_name].find({'title': {'$in': clicked_items}})
            )
        else:
            documents = list(mongo.db[collection_name].find())

        # Create a defaultdict to store the occurrence count of each unique title
        doc = sorted(documents, key=itemgetter('position'), reverse=True)
        title_counts = 0
        isNewTitle = []

        for document in doc:
            title = document['title']
            # Increment the count only on the first occurrence of the title
            print('title: ' + title)
            print(isNewTitle)

            if title not in isNewTitle:
                title_counts += 1
                print('After If title: ' + title)
            # Add the index number to the document dictionary
            document['index'] = title_counts-1
            isNewTitle.append(title)

        if documents and 'table' in documents[0]:
            return documents
        else:
            print("No documents found or missing 'table' field")
            return [
                {
                    '_id': 'None',
                    'title': 'No Data Found',
                    'position': 0,
                    'date': '00/0000',
                    'table': '{\n    "Sheet1": [{\n"Load": "To Get",\n"Data": "Started"\n}]}',
                }
            ]


def format_for_browse(query):
    if query:
        regex_query = re.compile(f'.*{query}.*', re.IGNORECASE)
        documents = mongo.db[collection_name].find({'title': regex_query})
    else:
        documents = mongo.db[collection_name].find({}, {"title": 1, "_id": 0})
    
    data = [doc["title"] for doc in documents]
    titles = set(data)
    
    unique_titles = sorted(list(titles))

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


def format_for_html(clicked_items):
    # Initialize title_counts as an empty defaultdict for each request
    title_counts = defaultdict(int)

    if clicked_items:
        data = Spreadsheet.get(clicked_items)
        doc = sorted(data, key=itemgetter('position', 'date'), reverse=True)


        for document in doc:
            title = document['title']
            
            # Increment the count only on the first occurrence of the title
            if title not in title_counts:
                title_counts[title] += 1

            # Add the index number to the document dictionary
            document['bindex'] = title_counts[title] - 1


            table = document.pop('table')
            content_dict = json.loads(table)

            content_key = next(iter(content_dict.keys()))
            if isinstance(content_dict[content_key], str):
                transformed_content = [{k: v.replace('\n', '')} for k, v in json.loads(content_dict[content_key]).items()]
            else:
                transformed_content = [
                    {k: v.replace('\n', '') for k, v in entry.items()} for entry in content_dict[content_key]
                ]

            if isinstance(transformed_content, str):
                df = pd.DataFrame()
            else:
                df = pd.DataFrame(transformed_content)

            document['table'] = df.to_html(index=False)

    else:
        date = datetime.now()
        formatted_date = date.strftime("%m / %d / %Y")
        doc = [{'title': 'Welcome', 'date': formatted_date, 'position': 'Greeting', 'table': 'table','index': 0}]

    return doc


def generate_position_number(sheet_name):
    result = mongo.db[collection_name].find_one({'title': sheet_name})

    if result:
        print(result['title']) 
        position = result['position']
    else:
        print('else')
        position = largest_position_number()

    return position

def largest_position_number():
    pipeline = [
        {"$group": {"_id": None, "max_number": {"$max": "$position"}}},
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
