# Kopiec i Sortowanie w C++
## Opis
Kopiec i Sortowanie w C++ to aplikacja konsolowa, która implementuje strukturę danych kopca oraz oferuje dwa algorytmy sortowania: Bucket Sort i Counting Sort. Program umożliwia efektywne zarządzanie danymi poprzez wstawianie i usuwanie elementów w kopcu oraz sortowanie tablic liczb całkowitych. Projekt został napisany w środowisku Visual Studio 2022.

## Funkcjonalności
- Tworzenie i zarządzanie kopcem (max-heap) o zmiennej pojemności.
- Wstawianie elementów do kopca.
- Usuwanie największego elementu z kopca.
- Wyświetlanie elementów tablicy przed i po sortowaniu.
- Sortowanie za pomocą algorytmów:
- Bucket Sort (sortowanie kubełkowe).
- Counting Sort (sortowanie przez zliczanie).
- Implementacja algorytmu HeapSort (sortowanie przez kopcowanie).
## Wymagania
- C++11 lub nowszy
- Visual Studio 2022 lub inne środowisko wspierające C++
## Sposób użycia
 1.Uruchom program w konsoli.
 
 2.Tablica zostanie posortowana przy użyciu algorytmu Bucket Sort oraz Counting Sort.
 
 3.Wyniki sortowania są wyświetlane przed i po zastosowaniu algorytmu.

## Instalacja
Aby skompilować i uruchomić projekt w Visual Studio 2022:

1.Utwórz nowy projekt C++ typu Console Application.

2.Skopiuj kod do pliku źródłowego .cpp.

3.Uruchom projekt.

Alternatywnie, można skompilować kod za pomocą kompilatora g++ w terminalu:
```bush
g++ -o heap_sort main.cpp
```
```bush
./heap_sort
```
## Struktura kodu
- Konstruktor Kopca: Inicjuje kopiec o zadanej pojemności.
- Operacje na Kopcu: Metody do wstawiania elementów, usuwania szczytu kopca oraz sprawdzania, czy kopiec jest pusty.
- Algorytmy Sortowania: Implementacje algorytmów sortowania kubełkowego, sortowania przez zliczanie i HeapSort.
