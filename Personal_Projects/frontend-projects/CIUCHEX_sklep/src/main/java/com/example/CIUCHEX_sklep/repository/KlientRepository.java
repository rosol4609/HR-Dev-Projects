package com.example.CIUCHEX_sklep.repository;

import com.example.CIUCHEX_sklep.model.Klient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KlientRepository extends JpaRepository<Klient, Long> { }