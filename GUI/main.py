import sys
from PySide6.QtWidgets import QApplication, QWidget, QHBoxLayout

def main(args): 
    run_app()

class FinanceTracker(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)

def run_app():
    app = QApplication(sys.argv)

    myFinTracker = FinanceTracker()
    myFinTracker.show()

    sys.exit(app.exec())

if __name__ == "__main__":
    main(sys.argv)
