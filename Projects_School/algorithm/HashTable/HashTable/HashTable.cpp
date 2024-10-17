#include <iostream>  
#include <string>
#include <list>
const int ROZMIAR_TABLICY = 15;
const int MAX_ROZMIAR = 30;
using namespace std;
template<typename T>
struct HT {
    string key;
    T value;
    HT* next;
    HT(string k, T v) {
        this->key = k;
        this->value = v;
        this->next = NULL;
    }
};
template<typename T>
class HashTable {
private:
    HT<T>** tablica;
public:
    HashTable() {
        tablica = new HT<T> *[ROZMIAR_TABLICY];
        for (int i = 0; i < ROZMIAR_TABLICY; i++) tablica[i] = NULL;
    }
    int HashFunction(string key) {
        int ix = 0;
        int potega = 1;
        for (int i = key.length() - 1; i >= 0; i--) {
            ix += key[i] * potega;
            potega *= 31;
        }
		ix = ix % ROZMIAR_TABLICY;
		if (ix < 0) {
			ix += ROZMIAR_TABLICY;
		}
		return ix;
    }
    void Insert(string k, T v) {
        int hash_v = HashFunction(k);
        HT<T>* el = tablica[hash_v];
        while (el != NULL) {
            if (el->key == k) {

                el->value = v;
                return;
            }
            el = el->next;
        }

        el = new HT<T>(k, v);
        el->next = tablica[hash_v];
        tablica[hash_v] = el;

    }

    void Display_Chaining() {
        for (int i = 0; i < ROZMIAR_TABLICY; i++) {
            cout << i << ": ";
            HT<T>* el = tablica[i];
            while (el != NULL) {
                cout << el->key << "->" << el->value << " ";
                el = el->next;
            }
            cout << endl;
        }
        cout << endl;
    }
    HT<T>* SearchByKey(string k) {
        int hash_v = HashFunction(k);

        HT<T>* el = tablica[hash_v];
        if (el != NULL) {
            while (el != NULL) {
                if (el->key == k) {
                    return el;
                }
                el = el->next;
            }
        }
        return nullptr;
    }
    void ClearAll() {
        for (unsigned int i = 0; i < ROZMIAR_TABLICY; i++) {
            while (tablica[i] != NULL) {
                HT<T>* el = tablica[i];
                tablica[i] = el->next;
                delete el;
            }
			tablica[i] = nullptr;
        }
        cout << "Tablica wyczyszczona." << endl;
    }
    bool Remove(string k) {
        int hash_v = HashFunction(k);
        HT<T>* el = tablica[hash_v];
        HT<T>* prev = NULL;

        while (el != NULL) {
            if (el->key == k) {
                if (!prev) {
                    tablica[hash_v] = el->next;
                }
                else {
                    prev->next = el->next;
                }
                delete el;
				cout << "Element usuniety: " << k << endl;
                return true;
            }
            prev = el;
            el = el->next;
        }
		cout << "Nie znaleziono elementu do usunięcia: " << k << endl;
        return false;
    }
    string randoms(int number) {
		const int ROZMIAR_ALFABETU = 26;
        string randstr = "";
        char litery[ROZMIAR_ALFABETU] = { 'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z' };
        for (int i = 0; i <= number; i++) {
            randstr += litery[rand() % ROZMIAR_ALFABETU];
        }
        return randstr;
    }
    int random() {
		return rand() % 1000;
    }
    ~HashTable() {
        for (int i = 0; i < ROZMIAR_TABLICY; i++) {
			HT<T>* el = tablica[i];
			while (el != NULL) {
				HT<T>* next = el->next;
				delete el;
				el = next;
			}
		}
		delete[] tablica;
	}
};

int main() {
    srand(time(NULL));
    HashTable<int> hash;
    for (int i = 0; i < 10; i++) {
        hash.Insert(hash.randoms(6), hash.random());
    }
    cout << "Wyświetlenie: " << endl;
    hash.Display_Chaining();
    cout << "Czyszczenie: " << endl;
    hash.ClearAll();
    hash.Display_Chaining();
    cout << "Dodanie elementu: " << endl;
    hash.Insert("cdmsfs", 863546);
    hash.Insert("cdmsfs", 863546);
    hash.Display_Chaining();
    cout << "Wyszukanie: " << endl;
    hash.SearchByKey("cdmsfs");
    //hash.Remove("cdmsfs");
    hash.Display_Chaining();
    string k;
    int v;
    int c;
    while (1) {
        cout << "1.Dodaj" << endl;
        cout << "2.Wyszukaj" << endl;
        cout << "3.Usun element" << endl;
        cout << "4.Wyjdz" << endl;
        cout << "5.Wyswietl" << endl;
        cout << "6.Wyczysc" << endl;
        cout << "7. reHash" << endl;
        cout << "8. random" << endl;
        cout << "Wprowadz wybor: ";
        cin >> c;
        switch (c) {
        case 1:
            cout << "Wprowadz klucz(string): ";
            cin >> k;
            cout << "Wprowadz wartosc(int): ";
            cin >> v;
            hash.Insert(k, v);
            break;
        case 2: {
            cout << "Klucz do znalezienia: ";
            cin >> k;
            HT<int>* znaleziony = hash.SearchByKey(k);
            if (znaleziony != nullptr) {
                cout << "Znaleziono: " << znaleziony->key << " -> " << znaleziony->value << endl;
            }
            else {
                cout << "Nie znaleziono klucza: " << k << endl;
            }
            break;
        }
        case 3:
            cout << "Klucz do usuniecia: ";
            cin >> k;
            hash.Remove(k);
            break;
        case 4:
            exit(1);
            break;
        case 5:
            hash.Display_Chaining();
            break;
        case 6:
            hash.ClearAll();
            break;
        case 7:

        default:
            cout << "\nEnter correct option\n";
        }
    }
const int MAX_ORDER = 7;
     HashTable< int >* ht = new HashTable< int >();
         for (int o = 1; o <= MAX_ORDER; o++)
         {
             const int n = pow(10, o);
             clock_t t1 = clock();
                 for(int i = 0; i < n; i++)
                     ht -> Insert(hash.randoms(6), i);
             clock_t t2 = clock();
                 const int m = pow(10, 4);
             int hits = 0;
             t1 = clock();
             for (int i = 0; i < m; i++)
             {
                 HT<int>* entry = ht -> SearchByKey(hash.randoms(6)); 
                 if (entry != NULL)
                     hits++;
             }
             t2 = clock();
         
             cout << "Czas 2:" << t2 - t1 << endl;
             cout << "Trafienia: " << hits << endl;
                 ht ->Display_Chaining();
             ht -> ClearAll();
         }
     delete ht;
    return 0;
}