import sys
from PySide6.QtWidgets import QApplication, QWidget, QHBoxLayout, QLabel
from buttons.shadow_button import ShadowButton

def main(args): 
    run_app()

class FinanceTracker(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)

        title_layout = QHBoxLayout()
        self.title_label = QLabel("FinanceTracker")
        self.open_button = ShadowButton("Open", "Open a file", "CTRL+O")

        title_layout.addWidget(self.title_label)
        title_layout.addWidget(self.open_button)

        self.setLayout(title_layout)

def run_app():
    app = QApplication(sys.argv)

    myFinTracker = FinanceTracker()
    myFinTracker.show()

    sys.exit(app.exec())

if __name__ == "__main__":
    main(sys.argv)

