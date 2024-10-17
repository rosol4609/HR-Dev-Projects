//rh51088 ALGO2 222A
//Hubert Rosiński
#include <iostream>
#include <stdio.h>
#include <algorithm>
#include <functional>

using namespace std;

template <typename T>
class Heap {
private:
    T* array;
    int size;
    int capacity;

    void heapifyTopDown(T i) {
        int left = 2 * i + 1;
        int right = 2 * i + 2;
        T h = i;
        if (left < size && array[left] > array[h])
            h = left;
        if (right < size && array[right] > array[h])
            h = right;
        if (h != i) {
            swap(array[i], array[h]);
            heapifyTopDown(h);
        }
    }
    void heapifyBottomUp(T i) {
        while (i > 0 && array[(i - 1) / 2] < array[i]) {
            swap(array[i], array[(i - 1) / 2]);
            i = (i - 1) / 2;
        }
    }
public:
    Heap() {
        size = 0;
        array = new T[capacity];
    }
    Heap(int capacity) {
        this->capacity = capacity;
        size = 0;
    }
    ~Heap() {
        delete[] array;
    }
    T getSize() {
        return size;
    }
    bool isEmpty() {
        return size == 0;
    }
    void insert(T element) {
        int i = size;
        int parent = (i - 1) / 2;
        array[i] = element;
        while (0 < i && 0 <= parent) {
            if (array[parent] < array[i]) {
                int temp = array[i];
                array[i] = array[parent];
                array[parent] = temp;
            }
            i = parent;
            parent = (i - 1) / 2;
        }
        size++;
        heapifyTopDown(0);
    }
    T removeTop() {
        if (isEmpty()) {
            cout << "Empty!" << endl;
        }
        else {
            T top = array[0];
            array[0] = array[--size];
            heapifyTopDown(0);
            return top;
        }
    }
    T Get_And_Remove_Max() {
        T el;
        el = array[0];
        array[0] = array[size - 1];
        size--;
        heapifyTopDown(0);
        return el;
    }
    void counting_sort(int array[], int rozmiar) {
        int wyjscie[10];
        int bucket[10];
        int max = array[0];
        for (int i = 1; i < rozmiar; i++) {
            if (array[i] > max) {
                max = array[i];
            }
        }
        for (int i = 0; i <= max; i++) {
            bucket[i] = 0;
        }
        for (int i = 0; i < rozmiar; i++) {
            bucket[array[i]] = bucket[array[i]] + 1;
        }
        for (int i = 1; i <= max; i++) {
            bucket[i] += bucket[i - 1];
        }
        int r = rozmiar - 1;
        for (int i = r; i >= 0; i--)
        {
            wyjscie[bucket[array[i]] - 1] = array[i];
            bucket[array[i]] = bucket[array[i]] - 1;
        }
        for (int i = 0; i < rozmiar; i++) {
            array[i] = wyjscie[i];
        }
    }
    void display(int array[], int size) {
        for (int i = 0; i < size; i++) {
            cout << array[i] << " ";
        }
    }
    void heapsort() {
        for (int i = size / 2 - 1; i >= 0; i--)
            heapifyTopDown(i);
        while (size > 0) {
            swap(array[0], array[size - 1]);
            size--;
            heapifyBottomUp(0);
        }
    }
    int getMax(int array[], int rozmiar) {
        int top = array[0];
        for (int i = 1; i < rozmiar; i++) {
            if (array[i] > top) {
                top = array[i];
            }
        }
        return top;
    }
    void bucket_sort(int array[], int rozmiar, int m) {
        int bucket[10];
        for (int x = 0; x <= m; x++) {
            bucket[x] = 0;
        }
        for (int y = 0; y < rozmiar; y++) {
            bucket[array[y]]++;
        }
        for (int z = 0, q = 0; z <= m; z++) {
            while (bucket[z] > 0) {
                array[q++] = z;
                bucket[z]--;
            }
        }
    }
    /* void bucket_sort(int array[], int rozmiar) {
         int top = getMax(array, rozmiar);
         int bucket[10];
         for (int x = 0; x <= top; x++) {
             bucket[x] = 0;
         }
         for (int y = 0; y < rozmiar; y++) {
             bucket[array[y]]++;
         }
         for (int z = 0, q = 0; z <= top; z++) {
             while (bucket[z] > 0) {
                 array[q++] = z;
                 bucket[z]--;
             }
         }
     }*/
};
int main() {
    Heap<int> sort;
    int array[] = { 8,5,4,1,3,6,9 };
    //int array[] = { 0.35, 0.50, 0.21, 0.1, 0.49, 0.60 };
    int x = sizeof(array) / sizeof(array[0]);
    //sort.display(array, x);
    //sort.counting_sort(array, x);
    cout << "Before Bucket sort: " << endl;
    sort.display(array, x);
    cout << endl;
    sort.bucket_sort(array, x, 9);
    cout << "After Bucket sort: " << endl;
    sort.display(array, x);
    cout << endl << endl;
    int array1[] = { 6,4,2,3,5,8,7 };
    cout << "Before Counting sort: " << endl;
    sort.display(array1, x);
    cout << endl;
    sort.counting_sort(array1, x);
    cout << "After Counting sort: " << endl;
    sort.display(array1, x);
    cout << endl;
    //cout << "Top element: " << sort.getMax(array, x);
}