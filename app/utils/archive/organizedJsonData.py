import json

def organized_json_data(data):
    if data and 'content' in data:
        content = json.loads(data['content'])
        key = list(content.keys())[0]  # Get the first key in the dictionary
        headers = list(content[key][0].keys())
        organized_data = {header: [] for header in headers}
        for entry in content[key]:
            for header in headers:
                value = entry.get(header, "")
                if header != "null" and value != "None" and header != "":
                    organized_data[header].append(value)

        keys_to_remove = []
        for entry in organized_data:
            if entry == "null":
                keys_to_remove.append(entry)

        for entry in keys_to_remove:
            del organized_data[entry]

        result = {key: organized_data}  # Create a dictionary with the specified key

        json_data = json.dumps(result)
        return json_data