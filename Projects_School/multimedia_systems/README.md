# Kompresja bezstratna obrazów przy użyciu RLE i Byterun Encoding

## Opis projektu

Ten projekt implementuje i porównuje dwie metody kompresji danych: **RLE (Run-Length Encoding)** oraz **Byterun Encoding**. Program działa na obrazach oraz tablicach NumPy, dokonując ich kompresji i dekompresji, a następnie mierząc efektywność każdej z metod. Program może przetwarzać obrazy o różnych formatach oraz inne dane, takie jak macierze.

## Funkcjonalności

- Wczytywanie i przetwarzanie obrazów w formie tablic NumPy.
- Kompresja danych za pomocą algorytmu **RLE**.
- Kompresja danych za pomocą algorytmu **Byterun**.
- Dekompresja danych zakodowanych metodami RLE i Byterun.
- Obliczanie i porównanie efektywności kompresji:
  - **CR (Compression Ratio)** – Współczynnik kompresji.
  - **PR (Percentage Reduction)** – Procentowa redukcja rozmiaru danych.

## Wymagania

Aby uruchomić ten projekt, musisz zainstalować następujące biblioteki:

- **NumPy** – do obsługi operacji na tablicach.
- **TQDM** – do wyświetlania paska postępu podczas kompresji i dekompresji.
- **Matplotlib** – do wczytywania obrazów (używane `plt.imread`).
  
Możesz zainstalować te biblioteki używając poniższej komendy:

```bash
pip install numpy tqdm matplotlib
```

## Struktura plików
- **main.py** – główny plik projektu, który implementuje wszystkie funkcje kompresji i dekompresji oraz testuje ich efektywność.
- **images/** – folder z obrazami, które są używane do testowania kompresji:
  - rysunek_techniczny.jpg
  - wzor_dokumentu.png
  - kolorowe_zdjecie.jpg

## Sposób użycia
1. Skopiuj kod projektu do swojego środowiska.

2. Umieść obrazy testowe w folderze images/.

3. Uruchom program, aby zobaczyć wyniki kompresji dla różnych obrazów i tablic NumPy.

Aby uruchomić program, wykonaj poniższą komendę w terminalu:
```bash
python main.py
```

Program przetestuje metody RLE i Byterun dla wczytanych obrazów i danych, porównując ich efektywność kompresji i dekompresji.
