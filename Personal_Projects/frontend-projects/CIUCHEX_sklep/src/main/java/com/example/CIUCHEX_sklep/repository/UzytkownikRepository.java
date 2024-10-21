package com.example.CIUCHEX_sklep.repository;

import com.example.CIUCHEX_sklep.model.Uzytkownik;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UzytkownikRepository extends JpaRepository<Uzytkownik, Long>
{
    List<Uzytkownik> findByLogin(String login);
}

