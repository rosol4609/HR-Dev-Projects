import numpy as np
import matplotlib.pyplot as plt

class GeneticAlgorithm:
    def __init__(self, n, fitness_function, fitness_args=(), pop_size=1000, generations=100, cross_prob=0.9, mut_prob=0.001, selection_type='roulette', crossover_type='single-point'):
        self.n = n
        self.fitness_function = fitness_function
        self.fitness_args = fitness_args
        self.population_size = pop_size
        self.generations = generations
        self.cross_prob = cross_prob
        self.mut_prob = mut_prob
        self.selection_type = selection_type
        self.crossover_type = crossover_type
        self.population = np.random.randint(2, size=(self.population_size, self.n))

    def run(self):
        fitness_history = []
        for generation in range(self.generations):
            fitness_values = self.evaluate_fitness()
            fitness_history.append(np.max(fitness_values))
            
            if self.selection_type == 'roulette':
                selected = self.roulette_selection(fitness_values)
            elif self.selection_type == 'ranking':
                selected = self.ranking_selection(fitness_values)
            
            offspring = self.crossover(selected)
            self.population = self.mutation(offspring)
        return fitness_history

    def evaluate_fitness(self):
        return np.array([self.fitness_function(individual, *self.fitness_args) for individual in self.population])

    def roulette_selection(self, fitness_values):
        total_fitness = np.sum(fitness_values)
        probs = fitness_values / total_fitness
        selected_indices = np.random.choice(self.population_size, size=self.population_size, p=probs)
        return self.population[selected_indices]

    def ranking_selection(self, fitness_values):
        ranks = np.argsort(np.argsort(fitness_values))
        total_ranks = np.sum(ranks)
        probs = ranks / total_ranks
        selected_indices = np.random.choice(self.population_size, size=self.population_size, p=probs)
        return self.population[selected_indices]

    def crossover(self, selected):
        offspring = []
        for i in range(0, self.population_size, 2):
            parent1, parent2 = selected[i], selected[i+1]
            if np.random.rand() < self.cross_prob:
                if self.crossover_type == 'single-point':
                    cross_point = np.random.randint(1, self.n)
                elif self.crossover_type == 'two-point':
                    cross_point1, cross_point2 = sorted(np.random.randint(1, self.n, 2))
                    child1 = np.concatenate([parent1[:cross_point1], parent2[cross_point1:cross_point2], parent1[cross_point2:]])
                    child2 = np.concatenate([parent2[:cross_point1], parent1[cross_point1:cross_point2], parent2[cross_point2:]])
                    offspring.extend([child1, child2])
                    continue
                child1 = np.concatenate([parent1[:cross_point], parent2[cross_point:]])
                child2 = np.concatenate([parent2[:cross_point], parent1[cross_point:]])
                offspring.extend([child1, child2])
            else:
                offspring.extend([parent1, parent2])
        return np.array(offspring)

    def mutation(self, offspring):
        for i in range(self.population_size):
            if np.random.rand() < self.mut_prob:
                mutation_point = np.random.randint(self.n)
                offspring[i, mutation_point] = 1 - offspring[i, mutation_point]
        return offspring
    
def fitness_function(individual):
    return np.sum(individual)

ga = GeneticAlgorithm(
    n=20, 
    fitness_function=fitness_function, 
    pop_size=100, 
    generations=100,
    cross_prob=0.9, 
    mut_prob=0.001, 
    selection_type='roulette',
    crossover_type='single-point'
)
fitness_history = ga.run()

print(fitness_history)
plt.plot(fitness_history)
plt.title(f"Maksymalne przystosowanie w kolejnych generacjach (n={ga.n})")
plt.xlabel("Generacja")
plt.ylabel("Maksymalne przystosowanie")
plt.show()
