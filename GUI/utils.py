import sys
from PySide6.QtWidgets import QApplication
from custom_widgets.RecordWidget import RecordWidget

def main():
    j = get_file_as_text("GUI/sample_return.txt").split('\n')
    app = QApplication(sys.argv)

    my_widget = RecordWidget(j[0], j[1], j[2], j[3])
    my_widget.show()

    sys.exit(app.exec())


def run_app(widget_class):
    app = QApplication(sys.argv)

    my_widget = widget_class()
    my_widget.show()

    sys.exit(app.exec())

def get_file_as_text(path: str) -> str:
    with open(path, 'r') as myFile:
        data = myFile.read()
    return data

if __name__ == "__main__":
    main()

