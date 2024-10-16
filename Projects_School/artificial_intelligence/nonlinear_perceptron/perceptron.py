import time

import numpy as np
import matplotlib.pyplot as plt

# Ustawienia początkowe
np.random.seed(0)
N = 1000  # liczba punktów danych
M = 48    # liczba losowych centrów
sigma = 0.25  # standardowe odchylenie dla jądra gaussowskiego
k_max = 3000 # liczba literacji

# generowanie danych
x1 = np.random.uniform(0, 2 * np.pi, N)
x2 = np.random.uniform(-1, 1, N)
X = np.column_stack((x1, x2))
y = np.where(np.abs(np.sin(X[:, 0])) >= np.abs(X[:, 1]), -1, 1)

# normalizacja x1 do zakresu [-1, 1]
X[:, 0] = 2 * (X[:, 0] / (2 * np.pi)) - 1

# wybór losowych centrów z danych wejściowych
indices = np.random.choice(N, M, replace=False)
centers = X[indices]


# jądrowa f. gaussowska
def gaussian_kernel(x, centers, sigma):
    return np.exp(-np.linalg.norm(x - centers, axis=1) ** 2 / (2 * sigma ** 2))


# transformacja danych
X_transformed = np.array([gaussian_kernel(x, centers, sigma) for x in X])


class NonLinearPerceptron:
    def __init__(self, learning_rate=1.0, sigma=1.0, k_max=1000):
        self.learning_rate = learning_rate
        self.sigma = sigma
        self.k_max = k_max
        self.weights = None

    def fit(self, X, y):
        # inicjalizacja wag i licznika iteracji
        self.weights = np.zeros(X.shape[1] + 1)
        k = 0

        while k < self.k_max:
            errors = 0

            for i, x in enumerate(X):
                # obliczanie wyjścia perceptronu
                output = np.dot(x, self.weights[1:]) + self.weights[0]
                if np.sign(output) != y[i]:
                    # aktualizacja wag jeśli punkt jest błędnie sklasyfikowany
                    self.weights[1:] += self.learning_rate * y[i] * x
                    self.weights[0] += self.learning_rate * y[i]
                    errors += 1

            # warunek stopu - jeśli nie było błędów, przerwij pętlę
            if errors == 0:
                print(f"Algorytm zakończył działanie po {k} iteracjach.")
                break

            # inkrementacja licznika iteracji
            k += 1

        if k == self.k_max:
            print(f"Osiągnięto maksymalną liczbę iteracji: {self.k_max}")

    def predict(self, X):
        # obliczenie wyjścia perceptronu dla przekształconych danych
        outputs = np.dot(X, self.weights[1:]) + self.weights[0]
        # zwrócenie etykiet na podstawie wyjścia
        return np.sign(outputs)

    def decision_function(self, X):
        # zwraca wartości sumy ważonej
        return np.dot(X, self.weights[1:]) + self.weights[0]


# uzycie perceptronu do nauki na przekształconych danych
clf = NonLinearPerceptron(learning_rate=1.0, sigma=sigma, k_max=k_max)

start_time = time.time()
clf.fit(X_transformed, y)
end_time = time.time()
elapsed_time = end_time - start_time

y_pred = clf.predict(X_transformed)

acc = np.mean(y == y_pred)
print("ACC: " + str(acc))

print("--- %s seconds ---" % elapsed_time)


# funkcja do wizualizacji granicy decyzyjnej
def plot_decision_border(X, y, model, resolution=100):
    # Ustawienie zakresu wykresu
    x_min, x_max = -1, 1
    y_min, y_max = -1, 1

    # tworzenie siatki do wizualizacji
    xx1, xx2 = np.meshgrid(np.linspace(x_min, x_max, resolution),
                           np.linspace(y_min, y_max, resolution))

    # przeprowadzenie przekształcenia na siatce
    grid = np.c_[xx1.ravel(), xx2.ravel()]
    grid_transformed = np.array([gaussian_kernel(x, centers, sigma) for x in grid])

    # predykcja na siatce
    Z = model.predict(grid_transformed)
    Z = Z.reshape(xx1.shape)

    # rysowanie wykresu konturowego i punktów
    plt.contourf(xx1, xx2, Z, alpha=0.5, levels=[-1, 0, 1], colors=['blue', 'red', 'green'])
    plt.scatter(X[y == -1, 0], X[y == -1, 1], c='blue')
    plt.scatter(X[y == 1, 0], X[y == 1, 1], c='green')
    plt.scatter(centers[:, 0], centers[:, 1], c='black', marker='x')
    plt.xlim(xx1.min(), xx1.max())
    plt.ylim(xx2.min(), xx2.max())
    plt.xlabel('x1')
    plt.ylabel('x2')
    plt.title('Granica decyzyjna perceptronu')
    plt.grid(True)
    plt.show()


def plot_decision_surface(X, y, model, centers, sigma, resolution=100):
    # ustawienie zakresu wykresu
    x_min, x_max = -1, 1
    y_min, y_max = -1, 1

    # tworzenie siatki do wizualizacji
    xx1, xx2 = np.meshgrid(np.linspace(x_min, x_max, resolution),
                           np.linspace(y_min, y_max, resolution))

    # przeprowadzenie przekształcenia na siatce
    grid = np.c_[xx1.ravel(), xx2.ravel()]
    grid_transformed = np.array([gaussian_kernel(x, centers, sigma) for x in grid])

    # obliczanie wartości sumy ważonej na siatce
    Z = model.decision_function(grid_transformed)
    Z = Z.reshape(xx1.shape)

    # tworzenie wykresu powierzchniowego
    fig = plt.figure(figsize=(10, 8))
    ax = fig.add_subplot(111, projection='3d')
    surf = ax.plot_surface(xx1, xx2, Z, cmap='coolwarm', alpha=0.7)
    plt.title('Wykres powierzchniowy sumy ważonej perceptronu')
    fig.colorbar(surf, shrink=0.5, aspect=5)
    plt.show()


def plot_decision_layers(X, y, model, centers, sigma, resolution=100):
    # ustawienie zakresu wykresu
    x_min, x_max = X[:, 0].min() - 0.1, X[:, 0].max() + 0.1
    y_min, y_max = X[:, 1].min() - 0.1, X[:, 1].max() + 0.1

    # tworzenie siatki do wizualizacji
    xx1, xx2 = np.meshgrid(np.linspace(x_min, x_max, resolution),
                           np.linspace(y_min, y_max, resolution))

    # przeprowadzenie przekształcenia na siatce
    grid = np.c_[xx1.ravel(), xx2.ravel()]
    grid_transformed = np.array([gaussian_kernel(x, centers, sigma) for x in grid])

    # obliczanie wartości sumy ważonej na siatce
    Z = model.decision_function(grid_transformed)
    Z = Z.reshape(xx1.shape)

    # rysowanie wykresu konturowego
    plt.figure(figsize=(8, 6))
    contour = plt.contour(xx1, xx2, Z, levels=np.linspace(Z.min(), Z.max(), 50), cmap='hot')
    plt.clabel(contour, inline=1, fontsize=10)
    plt.scatter(X[y == -1, 0], X[y == -1, 1], c='blue', label='Klasa -1')
    plt.scatter(X[y == 1, 0], X[y == 1, 1], c='green', label='Klasa 1')
    plt.scatter(centers[:, 0], centers[:, 1], c='red', label='Centra', marker='x')
    plt.xlabel('x1')
    plt.ylabel('x2')
    plt.title('Wykres warstwicowy sumy ważonej perceptronu')
    plt.legend()
    plt.grid(True)
    plt.show()


plot_decision_border(X, y, clf)

plot_decision_surface(X, y, clf, centers, sigma)

plot_decision_layers(X, y, clf, centers, sigma)
