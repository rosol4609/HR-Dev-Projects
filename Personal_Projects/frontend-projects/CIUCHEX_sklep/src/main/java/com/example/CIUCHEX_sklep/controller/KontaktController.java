package com.example.CIUCHEX_sklep.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class KontaktController {
    @GetMapping("/kontakt")
    public String kontakt(){
        return "kontakt";
    }
}
