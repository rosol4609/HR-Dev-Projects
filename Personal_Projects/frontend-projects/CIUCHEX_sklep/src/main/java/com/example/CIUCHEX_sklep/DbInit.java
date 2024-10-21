package com.example.CIUCHEX_sklep;

import com.example.CIUCHEX_sklep.model.Klient;
import com.example.CIUCHEX_sklep.model.Produkt_M;
import com.example.CIUCHEX_sklep.model.Typ;
import com.example.CIUCHEX_sklep.model.Uzytkownik;
import com.example.CIUCHEX_sklep.repository.KlientRepository;
import com.example.CIUCHEX_sklep.repository.Produkt_MRepository;
import com.example.CIUCHEX_sklep.repository.TypRepository;
import com.example.CIUCHEX_sklep.repository.UzytkownikRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.List;

@Configuration
public class DbInit implements CommandLineRunner {
    private final UzytkownikRepository uzytkownikRepository;
    private final KlientRepository klientRepository;
    private final TypRepository typRepository;
    private final Produkt_MRepository produktMRepository;

    @Autowired
    public DbInit(UzytkownikRepository uzytkownikRepository, KlientRepository klientRepository, TypRepository typRepository, Produkt_MRepository produktMRepository)
    {
        this.uzytkownikRepository = uzytkownikRepository;
        this.klientRepository = klientRepository;
        this.typRepository = typRepository;
        this.produktMRepository = produktMRepository;
    }

    @Override
    public void run(String... args) throws Exception
    {
        typRepository.saveAll(List.of(
                new Typ("Klient"),
                new Typ("Konsultant"),
                new Typ("Magazynier"),
                new Typ("Krawiec"),
                new Typ("Administrator")
        ));

        /*Typ klientTyp = typRepository.findByName("Klient");
        Typ konsultantTyp = typRepository.findByName("Konsultant");
        Typ magazynierTyp = typRepository.findByName("Magazynier");
        Typ krawiecTyp = typRepository.findByName("Krawiec");
        Typ administratorTyp = typRepository.findByName("Administrator");*/

        produktMRepository.saveAll(List.of(
                new Produkt_M("Koszulka Nike Football", new BigDecimal(349.99), 1547, "M", "", "Lekka i przewiewna", "https://trenujzkrzychem.pl/environment/cache/images/500_500_productGfx_81ce3216cea6f2cc690c6ce0f48071ed.jpg"),
                new Produkt_M("Koszulka Nike Paul George", new BigDecimal(499.99), 200, "L", "", "Edycja limitowana", "https://sklepkoszykarski.pl/environment/cache/images/500_500_productGfx_4564/Koszulka-Nike-Paul-George-PG.jpg"),
                new Produkt_M("Koszulka Nike NBA", new BigDecimal(379.99), 1000, "XL", "", "Los Angeles Clippers", "https://a.allegroimg.com/original/1e1e38/cd881638468fa01b3db44097c043"),
                new Produkt_M("Koszulka Nike Fly By Air", new BigDecimal(249.99), 170, "L", "", "Wyjątkowy materiał", "https://i3.mediaport.pl/images/products/22/78/97/nike-822648100-fly_by-1.jpg"),
                new Produkt_M("Koszulka Nike Barcelona Neon", new BigDecimal(379.99), 450, "M", "", "Treningowa", "https://www.soccerunlimitedusa.com/wp-content/uploads/2018/11/nike-barcelona-training-jersey-mens-neon-greenroyal-blue.png"),
        new Produkt_M("Koszulka Nike Baseball", new BigDecimal(199.99), 67, "XL", "", "Na codzien", "https://i.ebayimg.com/images/g/~I4AAOSwaepb2yXf/s-l500.jpg")
        ));

        uzytkownikRepository.saveAll(List.of(
                new Uzytkownik("login1", "haslo1", "login1@xyz.com", "Jan", "Kowalski"),
                new Uzytkownik("login2", "haslo2", "psy@film.pl", "Władysław", "Pasikowski"),
                new Uzytkownik("login3", "haslo3", "awiec@gmail.com", "Dominik", "Bos"),
                new Uzytkownik("hrosinski", "haslo4", "hrosinski@gmail.com", "Hubert", "Rosiński"),
                new Uzytkownik("wojtuch566", "afera566", "dromawojciech@gmail.com", "Wojciech", "Droma")
        ));

        klientRepository.saveAll(List.of(
                new Klient(1, "Rosinski", "Hubert", "Winogronowa 17B", "70-771", "Szczecin", "Polska"),
                new Klient(2, "Droma", "Wojciech", "Kaszubska 32", "73-340", "Szczecin", "Polska")
        ));
    }
}
