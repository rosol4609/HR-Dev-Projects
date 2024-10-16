# Flask Chat WebApp

## Opis

Jest to prosta aplikacja webowa napisana w Pythonie przy użyciu frameworka Flask oraz lekkiej bazy danych SQLite. Aplikacja umożliwia rejestrację użytkowników, logowanie, wysyłanie wiadomości oraz zarządzanie użytkownikami przez panel administratora. Oprócz tego, aplikacja posiada system weryfikacji e-mailowej.

## Funkcjonalności

- Rejestracja użytkownika z weryfikacją e-mailową.
- Logowanie i wylogowanie użytkownika.
- Wysyłanie i odbieranie wiadomości w czasie rzeczywistym.
- Panel administratora do zarządzania użytkownikami (usuwanie, tworzenie nowych użytkowników).
- Wysyłanie maili weryfikacyjnych przez SMTP.

## Wymagania

- Python 3.x
- Flask
- Flask-SQLAlchemy
- Flask-Login
- Flask-WTF
- Flask-Migrate
- Flask-Mail

## Instalacja

### 1. Klonowanie repozytorium

Najpierw sklonuj repozytorium na swój lokalny komputer:

git clone https://github.com/twoje-repozytorium/chat-webapp-flask.git
cd chat-webapp-flask

### 2. Instalacja zależności

Zainstaluj wszystkie wymagane pakiety z pliku 'requirements.txt' za pomocą komendy:

pip install -r requirements.txt

### 3. Zainicjalizuj bazę danych 

Przed uruchomieniem aplikacji wykonaj tę komendę:

flask db upgrade

### 5. Uruchom aplikację 

Domyślnie aplikacja działa pod adresem http://127.0.0.1:5000

flask run lub python app.py 

## Panel administratora

Aby uzyskać dostęp do panelu administratora, musisz utworzyć konto admina poprzez polecenie CLI (domyślne hasło to: "admin123"):

flask create-admin

## Ustawienia serwera pocztowego

W pliku app.py zmienna MAIL_USERNAME i MAIL_PASSWORD powinna być ustawiona na dane autoryzacyjne konta gmail, z którego będą wysyłane e-maile z kodem weryfikacyjnym

## Licencja

Projekt jest dostępny na licencji MIT.
