package com.example.CIUCHEX_sklep.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="produkty_M")
public class Produkt_M {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long product_ID;

    private String nazwa_produktu;
    private BigDecimal cena_za_sztuke;
    private Integer ilosc;
    private String rozmiar;
    private String dokladne_wymiary;
    private String opis_produktu;
    private String img_url;

    public Produkt_M(String nazwa_produktu, BigDecimal cena_za_sztuke, Integer ilosc, String rozmiar, String dokladne_wymiary, String opis_produktu, String img_url)
    {
        this.nazwa_produktu = nazwa_produktu;
        this.cena_za_sztuke = cena_za_sztuke;
        this.ilosc = ilosc;
        this.rozmiar = rozmiar;
        this.dokladne_wymiary = dokladne_wymiary;
        this.opis_produktu = opis_produktu;
        this.img_url = img_url;
    }
}
