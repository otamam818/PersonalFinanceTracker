import sys
from PySide6.QtGui import QKeySequence, QShortcut
from PySide6.QtCore import Qt
from PySide6.QtWidgets import (
        QApplication, QGraphicsDropShadowEffect, QPushButton
)

class ShadowButton(QPushButton):
    def __init__(self, label, tooltip, shortcut = None, parent = None,
                 click_func=None):
        super(ShadowButton, self).__init__(label)
        self.setToolTip(tooltip)
        self.setGraphicsEffect(self.add_shadow())
        self.shortcut_key = shortcut
        self.setParent(parent)
        self.add_func_if_exists(click_func)

    def add_shadow(self, blurRadius=3, offX=1, offY=1, color=None):
        shadow_effect = QGraphicsDropShadowEffect(self)
        if color == None:
            shadow_effect.setColor(Qt.black)
        else:
            shadow_effect.setColor(color)
        shadow_effect.setBlurRadius(blurRadius)
        shadow_effect.setOffset(offX, offY)
        return shadow_effect

    def add_func_if_exists(self, click_func): 
        function_exists = bool(click_func)
        if function_exists:
            self.connect_method(click_func)

    def connect_method(self, function):
        self.clicked.connect(function)
        
        shortcut_exists = bool(self.shortcut_key)
        keyboard_sequence = QKeySequence(self.shortcut_key)
        parent = self.parentWidget()
        
        if shortcut_exists:
            shortcut = QShortcut(keyboard_sequence, parent)
            shortcut.activated.connect(function)

if __name__ == "__main__":
    app = QApplication()
    shadow_button = ShadowButton('*', "Edit")
    shadow_button.show()

    sys.exit(app.exec())

