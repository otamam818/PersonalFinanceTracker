import sqlite3

def main():
    # Initialize the connection
    con: sqlite3.Connection = sqlite3.connect("finances.db")
    cur: sqlite3.Cursor = con.cursor()
    
    # get the data from create_table.sql
    create_file: str
    with open("./create_table.sql", 'r') as my_file:
        create_file = my_file.read();

    # Remove consecutive statements
    create_list: list[str] = [
        i for i in create_file.split('\n\n')
        # remove empty strings
        if len(i) > 0
        # remove comments
        and not(i.strip().startswith("--"))
    ]

    # Execute every individual statement
    for statement in create_list:
        cur.execute(statement)

if __name__ == "__main__":
    main()

