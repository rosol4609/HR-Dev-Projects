# Analiza i modulacja sygnału FHSS

## Opis
Ten skrypt w języku Python implementuje generator kodu Gold opartego na rejestrze przesuwnym z sprzężeniem zwrotnym (LFSR), modulację FSK oraz modulację FHSS. Sygnały wyjściowe są wizualizowane za pomocą biblioteki Matplotlib, pokazując zmodulowane sygnały i widmo.

## Wymagania
- Python 3.x
- numpy
- matplotlib

## Instalacja
1. Sklonuj to repozytorium lub pobierz skrypt.

2. Zainstaluj biblioteki:
pip install numpy matplotlib

# Uruchomienie
python FHSS.py

## Jak działa program
1.LFSR:
Program generuje pseudolosowe sekwencje bitowe za pomocą rejestrów przesuwanych LFSR, w których nowy bit powstaje z istniejących poprzez operację XOR. Funkcja LFSR(bits, seeds, Nc) przyjmuje początkowe bity, indeksy do generacji i liczbę cykli, zwracając wektor wyjściowy do dalszej analizy.

2.Kod Golda:
Kod Golda wykorzystuje sekwencje LFSR do tworzenia bitów używanych w modulacji FSK, co zapewnia wysoką odporność na zakłócenia.

3.Modulacja FSK:
Funkcja FSK(bit_stream, Tb, W) przekształca strumień bitów w sygnał FSK, generując sinusoidy o różnych częstotliwościach w zależności od wartości bitów.

4.Modulacja FHSS:
Funkcja FHSS(bit_stream, Tb, fs) dzieli strumień bitów na pary i przypisuje różne częstotliwości, co sprawia, że sygnał skacze po różnych częstotliwościach, zwiększając odporność na zakłócenia.
