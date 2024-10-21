package com.example.CIUCHEX_sklep.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name="Klienci")
public class Klient {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer user_ID;
    private String nazwisko;
    private String imie;
    private String adres;
    private String kod_pocztowy;
    private String miejscowosc;
    private String kraj;

    public Klient(Integer user_ID, String nazwisko, String imie, String adres, String kod_pocztowy, String miejscowosc, String kraj)
    {
        this.user_ID = user_ID;
        this.nazwisko = nazwisko;
        this.imie = imie;
        this.adres = adres;
        this.kod_pocztowy = kod_pocztowy;
        this.miejscowosc = miejscowosc;
        this.kraj = kraj;
    }
}

