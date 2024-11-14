//
// Source code recreated from a .class file by IntelliJ IDEA
// (powered by FernFlower decompiler)
//

package hr.fer.proinz.airelm.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    public HomeController() {
    }

    @GetMapping({"/"})
    public String home() {
        return "hi";
    }

    @GetMapping({"/secured"})
    public String secured() {
        return "hi, secured";
    }

    @GetMapping({"/researcher"})
    public String researcher() {
        return "hi, researcher";
    }

    @GetMapping({"/leader"})
    public String leader() {
        return "hi, leader";
    }
}
