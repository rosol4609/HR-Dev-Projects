# Tic-Tac-Toe Multiplayer (Kółko i Krzyżyk)

Ten projekt to implementacja gry w kółko i krzyżyk w języku C, w której dwóch graczy może grać ze sobą z użyciem mapowania pamięci między dwoma terminalami (CMD) systemu Windows.

## Wymagania

- System operacyjny: Windows
- Kompilator C: MinGW lub GCC (kompilacja w Windows)
- Użycie Windows API do tworzenia mapowania pamięci

## Instalacja (Do folderu dołączyłem już skompilowany program "XO_game.exe")

1. **Pobierz MinGW/GCC**:
    - Upewnij się, że masz zainstalowany MinGW lub GCC.
    - Możesz pobrać MinGW stąd: https://github.com/brechtsanders/winlibs_mingw/releases/download/14.2.0posix-19.1.1-12.0.0-ucrt-r2/winlibs-x86_64-posix-seh-gcc-14.2.0-llvm-19.1.1-mingw-w64ucrt-12.0.0-r2.7z

2. **Kompilacja programu**:
    - Aby skompilować program, użyj komendy:
      
      gcc TicTacToe.cpp -o program.exe
      

3. **Uruchomienie gry**:

    - Uruchom grę w dwóch terminalach:
      - W jednym terminalu jako **gracz 1**:
        
        program.exe TicTacToeGame
        
      - W drugim terminalu jako **gracz 2**:
        
        program.exe TicTacToeGame

UWAGA! Nazwa mapowania w tym przypadku "TicTacToeGame" musi być taka sama w obu terminalach, aby procesy mogły się komunikować.
        

4. **Zasady gry**:
    - Gra wykorzystuje mapowanie pamięci do synchronizacji między dwoma graczami. Gracz 1 zaczyna grę, a ruchy są synchronizowane między dwoma instancjami programu.
    - Gracze wprowadzają swoje ruchy (od 1 do 9) na planszy 3x3, a wynik gry jest automatycznie aktualizowany w obu terminalach.

## Struktura gry

- **Mapowanie pamięci**: Program wykorzystuje funkcje Windows API do tworzenia mapowania pamięci, umożliwiając współdzielenie danych między dwoma procesami w różnych terminalach.
- **Synchronizacja**: Gra jest synchronizowana poprzez wskaźniki pamięci, dzięki czemu każdy gracz widzi ruchy przeciwnika.
- **Plansza**: Graficzna plansza 3x3, na której gracze wprowadzają swoje ruchy.
- **Warunki wygranej**: Program sprawdza, czy któryś z graczy wygrał, czy jest remis, lub czy gra toczy się dalej.

## Funkcje w kodzie

1. **`printBoard()`**: Wyświetla aktualny stan planszy 3x3.
2. **`checkDraw()`**: Sprawdza, czy na planszy nie ma już wolnych miejsc (remis).
3. **`checkWin()`**: Sprawdza, czy któryś z graczy wygrał, analizując wiersze, kolumny i przekątne.
4. **`playerTurn()`**: Odpowiada za wprowadzanie ruchu przez gracza i sprawdzanie jego poprawności.
5. **`main()`**: Główna funkcja programu, w której tworzone jest mapowanie pamięci oraz synchronizacja między graczami. Obsługuje także logikę gry i końcowe wyniki.

## Licencja

Projekt jest dostępny na licencji MIT.
