package com.example.CIUCHEX_sklep.repository;

import com.example.CIUCHEX_sklep.model.Produkt_M;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Produkt_MRepository extends JpaRepository<Produkt_M, Long> { }
