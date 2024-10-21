package com.example.CIUCHEX_sklep.controller;

import com.example.CIUCHEX_sklep.model.Klient;
import com.example.CIUCHEX_sklep.model.Produkt_M;
import com.example.CIUCHEX_sklep.model.Uzytkownik;
import com.example.CIUCHEX_sklep.repository.Produkt_MRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Controller
public class HomeController
{
    private final Produkt_MRepository produktMRepository;

    @Autowired
    public HomeController(Produkt_MRepository produktMRepository)
    {
        this.produktMRepository = produktMRepository;
    }

    @GetMapping("/")
    public String home(Model model, HttpSession httpSession)
    {
        model.addAttribute("ProduktyM", produktMRepository.findAll());
        return "index";
    }

    @GetMapping("/produkt")
    public String product()
    {
        return "produkt";
    }

}
