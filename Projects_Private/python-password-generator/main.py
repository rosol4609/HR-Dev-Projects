import random
import string
from PyQt5 import QtWidgets, QtGui, QtCore

class PasswordGenerator(QtWidgets.QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowIcon(QtGui.QIcon('images/padlock_logo.png'))
        self.setWindowTitle("Password Generator")

        self.main_title = QtWidgets.QLabel("PASSWORD GENERATOR")
        self.main_title.setStyleSheet("font-family: 'Press Start 2P'; color: #4339ad; font-size: 21px; float: left;")
        self.length_label = QtWidgets.QLabel("Password length  --->")
        self.length_label.setStyleSheet("font-size: 15px; color: white;")
        self.length_spinbox = QtWidgets.QSpinBox()
        self.length_spinbox.setStyleSheet("background-color: #4339ad; color: white;")
        self.length_spinbox.setRange(8, 48)

        self.uppercase_checkbox = QtWidgets.QCheckBox("Big letters")
        self.uppercase_checkbox.setStyleSheet("font-size: 15px; color: white;")
        self.lowercase_checkbox = QtWidgets.QCheckBox("Small letters")
        self.lowercase_checkbox.setStyleSheet("font-size: 15px; color: white;")
        self.special_char_checkbox = QtWidgets.QCheckBox("Special chars")
        self.special_char_checkbox.setStyleSheet("font-size: 15px; color: white;")

        self.generate_button = QtWidgets.QPushButton("GENERATE!")
        self.generate_button.setStyleSheet("background-color: #282270; color: white; font-size: 17px; font-family: 'Press Start 2P', cursive;")
        self.generate_button.clicked.connect(self.generate_password)
        self.show_details = QtWidgets.QPushButton("Show details")
        self.show_details.setStyleSheet("background-color: #4339ad; color: white;")
        self.show_details.clicked.connect(self.count_characters)
        self.copy_button = QtWidgets.QPushButton("Copy password")
        self.copy_button.setStyleSheet("background-color: #4339ad; color: white;")
        self.copy_button.clicked.connect(self.copy_password)

        self.password_label = QtWidgets.QLabel("")
        self.password_label.setStyleSheet("font-size: 30px; color: #4339ad;")
        self.show1 = QtWidgets.QLabel("")
        self.show1.setStyleSheet("color: white;")
        self.show2 = QtWidgets.QLabel("")
        self.show2.setStyleSheet("color: white;")
        self.show3 = QtWidgets.QLabel("")
        self.show3.setStyleSheet("color: white;")
        self.znaki = QtWidgets.QLabel("Special chars: ")
        self.znaki.setStyleSheet("color: white;")
        self.duze = QtWidgets.QLabel("Big letters: ")
        self.duze.setStyleSheet("color: white;")
        self.male = QtWidgets.QLabel("Small letters: ")
        self.male.setStyleSheet("color: white;")

        layout = QtWidgets.QGridLayout()
        layout.addWidget(self.main_title, 0, 0, 1, 5)
        layout.addWidget(self.length_label, 1, 0, 1, 1)
        layout.addWidget(self.length_spinbox, 1, 2, 1, 3)
        layout.addWidget(self.uppercase_checkbox, 2, 0, 1, 1)
        layout.addWidget(self.lowercase_checkbox, 3, 0, 1, 1)
        layout.addWidget(self.special_char_checkbox, 4, 0, 1, 1)
        layout.addWidget(self.show_details, 5, 0, 1, 2)
        layout.addWidget(self.copy_button, 5, 2, 1, 3)
        layout.addWidget(self.generate_button, 6, 0, 1, 5)
        layout.addWidget(self.password_label, 7, 0, 1, 5)
        layout.addWidget(self.znaki, 8, 0)
        layout.addWidget(self.male, 9, 0)
        layout.addWidget(self.duze, 10, 0)
        layout.addWidget(self.show1, 8, 1)
        layout.addWidget(self.show2, 9, 1)
        layout.addWidget(self.show3, 10, 1)

        self.setLayout(layout)

    def generate_password(self):
        length = self.length_spinbox.value()
        password_chars = ""

        if self.uppercase_checkbox.isChecked():
            password_chars += string.ascii_uppercase
        if self.lowercase_checkbox.isChecked():
            password_chars += string.ascii_lowercase
        if self.special_char_checkbox.isChecked():
            password_chars += string.punctuation

        if not password_chars:
            self.password_label.setText("Select options!")
            self.password_label.setStyleSheet("color: red;")
            return

        password = "".join(random.choice(password_chars) for _ in range(length))
        self.password_label.setText(password)
        self.password_label.setStyleSheet("font-size: 30px; color: #4339ad;")

        self.copy_button.setText("Copy password")

    def copy_password(self):
        password = self.password_label.text()
        if password == "" or password == "Select options!":
            return
        clipboard = QtWidgets.QApplication.clipboard()
        clipboard.setText(password)
        self.copy_button.setText("Copied!")

    def count_characters(self):
        password = self.password_label.text()
        if not password or password == "Select options!":
            return

        special_characters = sum(1 for char in password if not char.isalnum())
        lowercase_letters = sum(1 for char in password if char.islower())
        uppercase_letters = sum(1 for char in password if char.isupper())

        self.show1.setText(str(special_characters))
        self.show2.setText(str(lowercase_letters))
        self.show3.setText(str(uppercase_letters))

app = QtWidgets.QApplication([])
window = PasswordGenerator()
window.setStyleSheet("background-color: #010c1c")
window.setFixedSize(400, 400)
window.show()
app.exec_()
