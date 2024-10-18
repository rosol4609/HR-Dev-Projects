# Non-Linear Perceptron with Gaussian Kernel

## Opis
Ten skrypt implementuje nieliniowy perceptron z wykorzystaniem jądra gaussowskiego, używany do klasyfikacji punktów danych w przestrzeni dwuwymiarowej. Program uczy model perceptronu na sztucznie wygenerowanych danych, a następnie wizualizuje granicę decyzyjną, powierzchnię decyzyjną oraz warstwice modelu.

## Opis funkcjonalności programu

1.Generowanie danych: Tworzenie losowych punktów i klas, które mają być klasyfikowane przez perceptron.
2.Gaussian Kernel: Funkcja jądra gaussowskiego przekształca dane na wyższy wymiar, umożliwiając nieliniową separację danych.
3.Nieliniowy Perceptron: Klasa perceptronu uczy model, aktualizując wagi w zależności od błędnych klasyfikacji.
4.Wizualizacja: Program rysuje:
- Granicę decyzyjną perceptronu.
- Powierzchnię decyzyjną w 3D.
- Warstwice (contour plot) funkcji decyzyjnej.

# Wymagania

- Python 3.x
- time
- matplotlib
- numpy

# Instalacja zależności

pip install numpy matplotlib

## Uruchomienie programu

python perceptron.py
