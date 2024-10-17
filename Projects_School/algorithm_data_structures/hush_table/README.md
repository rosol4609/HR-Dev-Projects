# Hash Table w C++

## Opis
Hash Table w C++ to aplikacja konsolowa, która implementuje strukturę danych tablicy haszującej. Program został opracowany w środowisku **Visual Studio 2022**. Umożliwia efektywne przechowywanie danych w formacie klucz-wartość oraz ich wyszukiwanie, dodawanie i usuwanie.

## Funkcjonalności
- Dodawanie elementów do tablicy haszującej z kluczem (typ `string`) i wartością (typ `int`).
- Wyszukiwanie elementów na podstawie klucza.
- Usuwanie elementów na podstawie klucza.
- Wyświetlanie całej zawartości tablicy haszującej z obsługą kolizji.
- Czyszczenie całej tablicy.
- Generowanie losowych kluczy i wartości.
- Pomiar czasu operacji dodawania i wyszukiwania dla dużych zbiorów danych.

## Wymagania
- C++11 lub nowszy
- Visual Studio 2022 lub inne środowisko wspierające C++

## Sposób użycia
1. Uruchom program w konsoli.
2. Wybierz opcję z interaktywnego menu:
   - **Dodaj** – Dodaj element do tablicy.
   - **Wyszukaj** – Wyszukaj element na podstawie klucza.
   - **Usuń element** – Usuń element na podstawie klucza.
   - **Wyjdź** – Zakończ program.
   - **Wyświetl** – Wyświetl zawartość tablicy.
   - **Wyczyść** – Wyczyść tablicę.

## Przykład użycia
Program generuje losowe klucze i wartości, które są następnie dodawane do tablicy haszującej. Przykładowe wyjście z programu może wyglądać następująco (Wyświetlanie):
- 0:
- 1: abcdef->123 xyzabc->456
- 2: bioskr->827
- 3: ...

## Instalacja
Aby skompilować i uruchomić projekt w **Visual Studio 2022**:
1. Utwórz nowy projekt C++ typu **Console Application**.
2. Skopiuj kod do pliku źródłowego `.cpp`.
3. Uruchom projekt.

