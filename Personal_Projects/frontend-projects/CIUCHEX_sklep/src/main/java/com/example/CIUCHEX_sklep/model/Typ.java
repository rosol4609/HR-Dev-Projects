package com.example.CIUCHEX_sklep.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Typy_uzytkownikow")
public class Typ
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer role_ID;
    private String nazwa_typu;

    public Typ(String nazwa_typu) { this.nazwa_typu = nazwa_typu; }
}
