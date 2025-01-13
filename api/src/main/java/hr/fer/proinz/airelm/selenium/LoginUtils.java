package hr.fer.proinz.airelm.selenium;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class LoginUtils {

    public static WebDriver login() {
        // Path to ChromeDriver
        System.setProperty("webdriver.chrome.driver", "C:/Users/Filip/Documents/chromeDriver/chromedriver.exe");

        // Initialize WebDriver
        WebDriver driver = new ChromeDriver();

        try {
            // 1. Open Your Localhost
            driver.get("http://localhost:5780/");
            Thread.sleep(2000);

            // 2. Click the login button
            WebElement loginButton = driver.findElement(By.className("login-button"));
            loginButton.click();
            Thread.sleep(6000);

            // 3. Enter username and password
            WebElement usernameField = driver.findElement(By.id("login_field"));
            WebElement passwordField = driver.findElement(By.id("password"));

            usernameField.sendKeys(" ");
            passwordField.sendKeys(" ");
            passwordField.submit();

            // 4. Wait for login to complete
            Thread.sleep(5000);

            System.out.println("Logged in successfully!");
        } catch (Exception e) {
            e.printStackTrace();
        }

        // Return the same WebDriver instance
        return driver;
    }
}
