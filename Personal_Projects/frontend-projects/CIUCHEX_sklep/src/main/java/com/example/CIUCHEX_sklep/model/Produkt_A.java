package com.example.CIUCHEX_sklep.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "Produkty_A")
public class Produkt_A {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer produkt_ID;
    private String nazwa;
    private String materialy;
    private String dokladne_wymiary;

    public Produkt_A(String nazwa, String materialy, String dokladne_wymiary) {
        this.nazwa = nazwa;
        this.materialy = materialy;
        this.dokladne_wymiary = dokladne_wymiary;
    }
}
