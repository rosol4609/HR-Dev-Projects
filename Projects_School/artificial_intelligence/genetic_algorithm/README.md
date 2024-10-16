# Genetic Algorytm

## Opis
Ten skrypt implementuje algorytm genetyczny (GA) w Pythonie, który maksymalizuje liczbę "jedynek" w chromosomach binarnych. Algorytm symuluje proces ewolucji poprzez selekcję, krzyżowanie i mutacje, aby znaleźć najlepsze rozwiązanie.


## Parametry

(Program najlepiej testować eksperymentując różnego rodzaju parametrami)

- n: Długość chromosomu 
- pop_size: Liczba osobników w populacji
- generations: Liczba generacji
- cross_prob: Prawdopodobieństwo krzyżowania
- mut_prob: Prawdopodobieństwo mutacji
- selection_type: 'roulette' lub 'ranking'
- crossover_type: 'single-point' lub 'two-point'

## Wymagania

- Python 3.x
- matplotlib
- numpy

## Instalacja zależności

pip install numpy matplotlib

## Uruchomienie programu

python GeneticAlgoritm.py
