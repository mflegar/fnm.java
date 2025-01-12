package hr.fer.proinz.airelm.selenium;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class testLogin {

    public static void main(String[] args) {
        // Set the path to the ChromeDriver executable
        System.setProperty("webdriver.chrome.driver", "C:/Users/Filip/Documents/chromeDriver/chromedriver.exe");

        // Initialize the ChromeDriver
        WebDriver driver = new ChromeDriver();

        try {
            // Open the application
            driver.get("http://localhost:5780/");

            // Wait for the page to load
            Thread.sleep(2000);

            // Find the login button and click it
            WebElement loginButton = driver.findElement(By.className("login-button"));
            loginButton.click();

            // Wait for the login page to load
            Thread.sleep(3000);

            // Find the username and password fields
            WebElement usernameField = driver.findElement(By.id("login_field"));
            WebElement passwordField = driver.findElement(By.id("password"));

            // Enter username and password
            usernameField.sendKeys("AccountUsernameCHANGETHIS"); //TODO This should be changed for testing purpouses
            passwordField.sendKeys("AccountPasswordCHANGETHIS");

            // Optionally, submit the form or find the login button to click
            // Assuming the form submits when pressing ENTER in the password field
            passwordField.submit();

            // Wait to observe the result (optional)
            Thread.sleep(5000);

            System.out.println("Login process completed successfully!");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // Quit the browser
            driver.quit();
        }
    }
}
