package com.example.CIUCHEX_sklep.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name="Magazynierzy")
public class Magazynier {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer user_ID;
    private String nazwisko;
    private String imie;

    public Magazynier(String nazwisko, String imie) {
        this.nazwisko = nazwisko;
        this.imie = imie;
    }
}

