package com.example.CIUCHEX_sklep.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="materialy")
public class Material {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long material_ID;
    private String nazwa_materialu;
    private Integer ilosc;

    public Material(String nazwa_materialu, Integer ilosc) {
        this.nazwa_materialu = nazwa_materialu;
        this.ilosc = ilosc;
    }
}
