
from PySide6.QtWidgets import QWidget, QHBoxLayout, QVBoxLayout, QMenuBar, QLabel

class RecordWidget(QWidget):
    def __init__(
        self, 
        mode: str, 
        date: str, 
        currency: str, 
        shops: str,
        parent=None 
    ):
        super().__init__(parent)
        fin_layout = QHBoxLayout()
        data = ("Date", "Currency", "Shops")
        for i in data:
            title = QLabel(i)
            menu_bar = QMenuBar()
            menu_bar.addMenu("")

            temp_layout = QVBoxLayout()
            temp_layout.addWidget(title)
            temp_layout.addWidget(menu_bar)

            fin_layout.addLayout(temp_layout)

        self.setLayout(fin_layout)

