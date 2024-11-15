# MERN Application - User Management System

## 📋 Opis projektu

Jest to aplikacja typu **User Management System** stworzona przy użyciu stosu **MERN** (MongoDB, Express.js, React.js, Node.js). Aplikacja umożliwia rejestrację użytkowników, logowanie, zarządzanie profilem użytkownika oraz dostęp do wybranych funkcji administracyjnych (takich jak usuwanie użytkowników) dostępnych tylko dla kont z rolą "admin".

Aplikacja została podzielona na dwie części:
- **Backend**: API zbudowane w oparciu o Node.js i Express.js z bazą danych MongoDB.
- **Frontend**: Interfejs użytkownika (UI) zbudowany przy użyciu React.js.

## ⚙️ Funkcjonalności

1. **Rejestracja i logowanie użytkowników**:
   - Nowi użytkownicy mogą się zarejestrować, podając wymagane informacje, takie jak imię, nazwisko, e-mail, nazwa użytkownika, hasło i numer telefonu.
   - Użytkownicy mogą zalogować się za pomocą adresu e-mail lub nazwy użytkownika.

2. **Autoryzacja i Role**:
   - Dostęp do funkcji administracyjnych mają tylko użytkownicy z rolą "admin".
   - Użytkownicy mają dostęp do swoich profili, natomiast tylko administratorzy mogą przeglądać listę wszystkich użytkowników i usuwać ich konta.

3. **Zarządzanie profilem użytkownika**:
   - Każdy użytkownik ma dostęp do swojego profilu, gdzie może przeglądać i modyfikować swoje informacje.

4. **Middleware zabezpieczający zasoby**:
   - Aplikacja posiada middleware do uwierzytelniania tokenu JWT, co zabezpiecza endpointy przed nieautoryzowanym dostępem.


## 💻 Uruchamianie projektu lokalnie

### Wymagania wstępne

- Node.js oraz npm (menedżer pakietów Node)
- MongoDB (lokalna lub w chmurze)

### Instalacja

1. **Klonowanie repozytorium**:

   ```bash
   git clone https://github.com/rosol4609/HR-Dev-Projects.git
   cd Personal_Projects/FullStack_App
   ```
2. Backend
   - Przejdż do katalogi **back-end**:
     ```bash
     cd back-end
     ```
   - Zainstaluj zależności:
     ```bash
     npm install
     ```
   - Utwórz plik **.env**:
   ```bash
   JWT_SECRET='your_jwt_secret'
   ADMIN_PASSWORD='your_admin_password'
   ```
   - Uruchom serwer backendu:
   ```bash
   node app.js
   ```
3. Frontend
  - Przejdż do katalogi **front-end**:
     ```bash
     cd front-end
     ```
   - Zainstaluj zależności:
     ```bash
     npm install
     ```
   - Uruchom aplikację front-end:
     ```bash
     npm start
     ```
🛠 Technologie użyte w projekcie:
- MongoDB – baza danych NoSQL, przechowywanie użytkowników.
- Express.js – framework Node.js do tworzenia API.
- React.js – frontendowa biblioteka JavaScript do budowy interfejsu.
- Node.js – środowisko uruchomieniowe JavaScript dla backendu.
- JWT (JSON Web Token) – do uwierzytelniania i autoryzacji.
