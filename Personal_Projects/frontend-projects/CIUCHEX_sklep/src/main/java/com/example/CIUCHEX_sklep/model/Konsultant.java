package com.example.CIUCHEX_sklep.model;

import jakarta.persistence.*;
import jakarta.persistence.criteria.CriteriaBuilder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name="Konsultanci")
public class Konsultant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer user_ID;
    private String nazwisko;
    private String imie;
    private String email_kontaktowy;

    public Konsultant(Integer user_ID, String nazwisko, String imie, String email_kontaktowy) {
        this.user_ID = user_ID;
        this.nazwisko = nazwisko;
        this.imie = imie;
        this.email_kontaktowy = email_kontaktowy;
    }
}