package hr.fer.proinz.airelm.selenium;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

public class testDashboardUI {

    public static void main(String[] args) {
        WebDriver driver = null;
        try {
            // 1. Call the reusable login method
            driver = LoginUtils.login();  // You are now logged in

            // 2. Continue with your dashboard test
            //    Because it's the same driver session, you're still authenticated.
            driver.get("http://localhost:5780/dashboard");
            Thread.sleep(3000);



            System.out.println("Test Dashboard UI steps completed!");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // 3. Close the browser
            if (driver != null) {
                driver.quit();
            }
        }
    }
}
