#include <stdio.h>
#include <string.h>
#include <windows.h>

#define ROW 3
#define COL 3

typedef struct {
    int turn;
    int gameOver;
    int board[ROW][COL];
}GameData;

void printBoard(int board[ROW][COL]) {
    char symbol[3] = { ' ', 'X', 'O' };
    printf(" %c | %c | %c\n", symbol[board[0][0]], symbol[board[0][1]], symbol[board[0][2]]);
    printf("---+---+---\n");
    printf(" %c | %c | %c\n", symbol[board[1][0]], symbol[board[1][1]], symbol[board[1][2]]);
    printf("---+---+---\n");
    printf(" %c | %c | %c\n", symbol[board[2][0]], symbol[board[2][1]], symbol[board[2][2]]);
}

int checkDraw(int board[ROW][COL]) {
    for (int i = 0; i < ROW; i++) {
        for (int j = 0; j < COL; j++) {
            if (board[i][j] == 0) {
                return 0;
            }
        }
    }
    return 1;
}

int checkWin(int board[ROW][COL]) {

    for (int i = 0; i < ROW; i++) {
        if (board[i][0] == board[i][1] && board[i][1] == board[i][2] && board[i][0] != 0) {
            return 1;
        }
    }

    for (int i = 0; i < COL; i++) {
        if (board[0][i] == board[1][i] && board[1][i] == board[2][i] && board[0][i] != 0) {
            return 1;
        }
    }

    if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] != 0) {
        return 1;
    }
    if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] != 0) {
        return 1;
    }
    return 0;
}

void playerTurn(int board[ROW][COL], int player) {
    int move;
    printf("Ruch dla gracza nr. %d. Podaj ruch od (1-9): ", player);
    scanf_s("%d", &move);
    int row = (move - 1) / ROW;
    int col = (move - 1) % COL;
    while (board[row][col] != 0) {
        printf("Nieprawidłowy ruch, wprowadz ponownie: ");
        scanf_s("%d", &move);
        row = (move - 1) / ROW;
        col = (move - 1) % COL;
    }
    board[row][col] = player;
}

int main(int argc, char* argv[]) {
    if (argc != 2) {
        printf("Użycie: %s <nazwa_mapy_pliku>\n", argv[0]);
        return 1;
    }
    LPCWSTR arg = (LPCWSTR)argv[1];

    int player;
    HANDLE hMapFile;
    hMapFile = CreateFileMappingW(INVALID_HANDLE_VALUE, NULL, PAGE_READWRITE, 0, sizeof(GameData), arg);

    if (hMapFile == NULL) {
        printf("Nie udało się utworzyć mapowania pliku: %d\n", GetLastError());
        return 1;
    }

    GameData* game = (GameData*)MapViewOfFile(hMapFile, FILE_MAP_ALL_ACCESS, 0, 0, sizeof(GameData));
    if (game == NULL) {
        printf("Nie udało się zmapować widoku pliku: %d\n", GetLastError());
        CloseHandle(hMapFile);
        return 1;
    }

    if (GetLastError() == ERROR_ALREADY_EXISTS) {
        player = 2;
        printf("Dołączanie do gry jako gracz nr. 2\n");
    }
    else {
        printf("Zaczynanie jako gracz 1\n");
        memset(game, 0, sizeof(GameData));
        game->turn = 1;
        player = 1;
    }

    while (!game->gameOver) {
        system("cls");
        printBoard(game->board);

        if (game->turn == player) {
            playerTurn(game->board, player);

            if (checkWin(game->board)) {
                system("cls");
                printBoard(game->board);
                printf("Gracz nr.%d wygrywa!\n", player);
                game->gameOver = 1;
            }
            else if (checkDraw(game->board)) {
                system("cls");
                printBoard(game->board);
                printf("Remis.\n");
                game->gameOver = 1;
            }
            else {
                game->turn = player == 1 ? 2 : 1;
            }
        }
        else {
            printf("Oczekiwanie na ruch przeciwnika...\n");
        }

        Sleep(1000);
    }

    UnmapViewOfFile(game);
    CloseHandle(hMapFile);
    return 0;
}
