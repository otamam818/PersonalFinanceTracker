import sys
from PySide6.QtWidgets import QWidget, QHBoxLayout, QLabel, QFileDialog
from buttons.shadow_button import ShadowButton

def main():
    import utils
    utils.run_app(HeaderWidget)

class HeaderWidget(QWidget):
    def __init__(self, parent=None):
        super().__init__(parent)

        title_layout = QHBoxLayout()
        self.title_label = QLabel("FinanceTracker")
        self.open_button = ShadowButton(
            "Open", 
            "Open a file", 
            "CTRL+O",
            click_func=self.open_file
        )

        title_layout.addWidget(self.title_label)
        title_layout.addWidget(self.open_button)

        self.setLayout(title_layout)

    def open_file(self):
        location_data = QFileDialog.getOpenFileName(self, "Load file...", "", "JSON files (*.json)")
        print(location_data)

if __name__ == "__main__":
    main()

