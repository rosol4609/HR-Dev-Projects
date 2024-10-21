package com.example.CIUCHEX_sklep.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.format.DateTimeFormatter;
import java.util.Date;

@Entity
@Getter
@Setter
@Table(name="Zamowienia")
@NoArgsConstructor
public class Zamowienie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer order_ID;
    private Integer user_ID;
    private Integer product_ID;

    private Date data_zamowienia;
    private Date data_przewidywana;
    private Date data_dostarczenia;

    private String status;
    private String notatka;

    public Zamowienie(Integer user_ID, Integer product_ID, Date data_zamowienia, Date data_przewidywana, Date data_dostarczenia, String status, String notatka) {
        this.user_ID = user_ID;
        this.product_ID = product_ID;
        this.data_zamowienia = data_zamowienia;
        this.data_przewidywana = data_przewidywana;
        this.data_dostarczenia = data_dostarczenia;
        this.status = status;
        this.notatka = notatka;
    }
}
