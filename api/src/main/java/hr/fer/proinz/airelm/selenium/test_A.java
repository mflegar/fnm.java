package hr.fer.proinz.airelm.selenium;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.By;
import org.openqa.selenium.chrome.ChromeDriver;

public class test_A {

    public static void main(String[] args) {
        // Postavi putanju do ChromeDriver-a
        System.setProperty("webdriver.chrome.driver", "C:/Users/Filip/Documents/chromeDriver/chromedriver.exe"); // Prilagodi putanju

        WebDriver driver = new ChromeDriver();

        try {
            // Otvori stranicu
            driver.get("https://www.google.com");

            // Nađi polje za pretraživanje i pošalji tekst
            WebElement searchBox = driver.findElement(By.name("q"));
            searchBox.sendKeys("Selenium WebDriver");
            searchBox.submit();

            // Ispiši naslov stranice
            System.out.println("Naslov stranice: " + driver.getTitle());
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // Zatvori preglednik
            driver.quit();
        }
    }
}
