package com.example.CIUCHEX_sklep.service;

import com.example.CIUCHEX_sklep.dto.UzytkownikDTO;
import com.example.CIUCHEX_sklep.model.Uzytkownik;
import com.example.CIUCHEX_sklep.repository.UzytkownikRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UzytkownikServiceImp implements UzytkownikService
{
    @Autowired
    private UzytkownikRepository uzytkownikRepository;

    public Uzytkownik zapisz(UzytkownikDTO uzytkownikDTO)
    {
        Uzytkownik uzytkownik = new Uzytkownik(uzytkownikDTO.getLogin(), uzytkownikDTO.getHaslo(), uzytkownikDTO.getEmail(), uzytkownikDTO.getImie(), uzytkownikDTO.getNazwisko());
        return uzytkownikRepository.save(uzytkownik);
    }
}
