package com.example.CIUCHEX_sklep.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="Uzytkownicy")
public class Uzytkownik
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long user_ID;
    private String login;
    private String haslo;
    private String email;
    private String imie;
    private String nazwisko;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinTable(
            name = "uzytkownik_ma_typ",
            joinColumns = @JoinColumn(name = "user_ID", referencedColumnName = "user_ID"),
            inverseJoinColumns = @JoinColumn(name = "role_ID", referencedColumnName = "role_ID")
    )
    private List<Typ> typ;

    public Uzytkownik(String login, String haslo, String email, String imie, String nazwisko)
    {
        this.login = login;
        this.haslo = haslo;
        this.email = email;
        this.imie = imie;
        this.nazwisko = nazwisko;
    }
}
