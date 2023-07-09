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