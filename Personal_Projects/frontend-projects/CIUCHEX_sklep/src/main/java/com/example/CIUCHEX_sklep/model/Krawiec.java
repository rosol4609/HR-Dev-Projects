package com.example.CIUCHEX_sklep.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Table(name="Krawcowie")
@Entity
public class Krawiec {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer user_ID;
    private String nazwisko;
    private String imie;

    public Krawiec(String nazwisko, String imie) {
        this.nazwisko = nazwisko;
        this.imie = imie;
    }
}
