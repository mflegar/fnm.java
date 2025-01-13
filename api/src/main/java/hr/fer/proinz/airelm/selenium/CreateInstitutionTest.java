package hr.fer.proinz.airelm.selenium;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class CreateInstitutionTest {
    public static void main(String[] args) {
        WebDriver driver = null;
        try {
            // 1. Login (reuse your existing code)
            driver = LoginUtils.login();

            // 2. Navigate to the "Create new institution" page
            //    If it doesn't auto-redirect after login:
            driver.get("http://localhost:5780/institution/new");

            // 3. Fill the "Institution name" field (id="institutionName")
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            WebElement nameField = wait.until(
                    ExpectedConditions.visibilityOfElementLocated(By.id("institutionName"))
            );
            nameField.sendKeys("My New Institution");

            // 4. Fill the "Institution link" field (id="link")
            WebElement linkField = driver.findElement(By.id("link"));
            linkField.sendKeys("http://some-url-whatever.com");

            // 5. Locate and click the submit button by its text
            //    <button type="submit">Create new institution</button>
            By submitBtnLocator = By.xpath("//button[text()='Create new institution']");
            WebElement submitButton = wait.until(
                    ExpectedConditions.elementToBeClickable(submitBtnLocator)
            );
            submitButton.click();

            // 6. (Optional) Wait or verify success
            Thread.sleep(2000);
            System.out.println("Institution creation process completed successfully!");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // 7. Close the browser
            if (driver != null) {
                driver.quit();
            }
        }
    }
}
