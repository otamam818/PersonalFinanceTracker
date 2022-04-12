import sys
from PySide6.QtWidgets import QApplication, QWidget, QVBoxLayout, QLabel
from header_gui import HeaderWidget
from body_gui import BodyWidget

def main(args): 
    import utils
    utils.run_app(FinanceTracker)

class FinanceTracker(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)

        layout = QVBoxLayout()
        self.header_widget = HeaderWidget()
        self.body_widget = BodyWidget(parent=self)

        layout.addWidget(self.header_widget)
        layout.addWidget(self.body_widget)

        self.setLayout(layout)

if __name__ == "__main__":
    main(sys.argv)

