package com.example.CIUCHEX_sklep.repository;

import com.example.CIUCHEX_sklep.model.Typ;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TypRepository extends JpaRepository<Typ, Integer>
{
    /*@Query("SELECT t FROM typ t WHERE t.nazwa_typu = :roleName")
    Typ findByName(@Param("roleName") String roleName);*/
}
