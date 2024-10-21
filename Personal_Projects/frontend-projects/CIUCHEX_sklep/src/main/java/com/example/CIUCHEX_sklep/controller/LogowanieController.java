package com.example.CIUCHEX_sklep.controller;

import com.example.CIUCHEX_sklep.dto.UzytkownikDTO;
import com.example.CIUCHEX_sklep.model.Uzytkownik;
import com.example.CIUCHEX_sklep.repository.UzytkownikRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.List;

@Controller
public class LogowanieController
{
    private final UzytkownikRepository uzytkownikRepository;

    @Autowired
    public LogowanieController(UzytkownikRepository uzytkownikRepository)
    {
        this.uzytkownikRepository = uzytkownikRepository;
    }

    private boolean isUserLoggedIn(HttpServletRequest request)
    {
        HttpSession session = request.getSession(false);
        return session != null && session.getAttribute("Uzytkownik") != null;
    }

    @GetMapping("/logowanie")
    public String showLogin(Model model, HttpServletRequest request)
    {
        if (isUserLoggedIn(request))
        {
            return "redirect:/";
        }

        model.addAttribute("Uzytkownicy", new UzytkownikDTO());
        return "logowanie";
    }

    @PostMapping("/logowanie")
    public String session(@ModelAttribute("Uzytkownik") UzytkownikDTO uzytkownikDTO, HttpSession session, RedirectAttributes redirectAttributes)
    {
        List<Uzytkownik> listaUzytkownikow = uzytkownikRepository.findByLogin(uzytkownikDTO.getLogin());

        if(listaUzytkownikow.isEmpty())
        {
            redirectAttributes.addAttribute("warning_login", true);
            return "redirect:/logowanie";
        }

        Uzytkownik uzytkownik = listaUzytkownikow.get(0);
        if(uzytkownik.getHaslo().equals(uzytkownikDTO.getHaslo()))
        {
            session.setAttribute("Uzytkownik", uzytkownik);
            return "redirect:/";
        }
        else
        {
            redirectAttributes.addAttribute("warning_password", true);
            return "redirect:/logowanie";
        }
    }

    @RequestMapping(value = "/logout", method = {RequestMethod.GET, RequestMethod.POST})
    public String logout(HttpSession session)
    {
        session.invalidate();
        return "redirect:/logowanie";
    }
}
