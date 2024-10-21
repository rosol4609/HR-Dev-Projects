package com.example.CIUCHEX_sklep.controller;

import com.example.CIUCHEX_sklep.dto.UzytkownikDTO;
import com.example.CIUCHEX_sklep.model.Uzytkownik;
import com.example.CIUCHEX_sklep.repository.TypRepository;
import com.example.CIUCHEX_sklep.repository.UzytkownikRepository;
import com.example.CIUCHEX_sklep.service.UzytkownikService;
import com.example.CIUCHEX_sklep.service.UzytkownikServiceImp;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
@RequestMapping(path = "/rejestracja")
public class RejestracjaController
{
    /*@GetMapping("/rejestracja")
    public String showRegister() {
        return "rejestracja";
    }*/

    private final UzytkownikRepository uzytkownikRepository;
    private final TypRepository typRepository;
    private UzytkownikService uzytkownikService;

    @Autowired
    public RejestracjaController(UzytkownikRepository uzytkownikRepository, TypRepository typRepository, UzytkownikService uzytkownikService)
    {
        this.uzytkownikRepository = uzytkownikRepository;
        this.typRepository = typRepository;
        this.uzytkownikService = uzytkownikService;
    }

    private boolean isUserLoggedIn(HttpServletRequest request)
    {
        HttpSession session = request.getSession(false);
        return session != null && session.getAttribute("Uzytkownik") != null;
    }

    @GetMapping
    private String stronaRejestracji(Model model, HttpServletRequest request)
    {
        if (isUserLoggedIn(request))
        {
            return "redirect:/";
        }

        model.addAttribute("Uzytkownicy", new UzytkownikDTO());
        return "rejestracja";
    }

    @PostMapping
    private String dodajKonto(@ModelAttribute("Uzytkownik")UzytkownikDTO uzytkownikDTO, RedirectAttributes redirectAttributes)
    {
        Uzytkownik uzytkownik = uzytkownikService.zapisz(uzytkownikDTO);
        return "redirect:/logowanie";
    }
}
