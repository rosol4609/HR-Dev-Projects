package com.example.CIUCHEX_sklep.dto;

import com.example.CIUCHEX_sklep.model.Typ;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UzytkownikDTO
{
    private String login;
    private String haslo;
    private String email;
    private String imie;
    private String nazwisko;

    public UzytkownikDTO(){}

    public UzytkownikDTO(String login, String haslo, String email, String imie, String nazwisko)
    {
        this.login = login;
        this.haslo = haslo;
        this.email = email;
        this.imie = imie;
        this.nazwisko = nazwisko;
    }
}
