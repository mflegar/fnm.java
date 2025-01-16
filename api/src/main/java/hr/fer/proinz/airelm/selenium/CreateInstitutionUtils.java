package hr.fer.proinz.airelm.selenium;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class CreateInstitutionUtils {

    public static void createOneInstitution(WebDriver driver, String institutionName, String institutionLink) throws Exception {
        // 1. Navigate to the "Create new institution" page
        driver.get("http://localhost:5780/institution/new");

        // 2. Wait for the form fields to be visible
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement nameField = wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.id("institutionName"))
        );
        WebElement linkField = driver.findElement(By.id("link"));

        // 3. Clear and type in the institution name
        nameField.clear();
        nameField.sendKeys(institutionName);

        // 4. Clear and type in the institution link
        linkField.clear();
        linkField.sendKeys(institutionLink);

        // 5. Locate and click the submit button by its text
        //    <button type="submit">Create new institution</button>
        By submitBtnLocator = By.xpath("//button[text()='Create new institution']");
        WebElement submitButton = wait.until(
                ExpectedConditions.elementToBeClickable(submitBtnLocator)
        );
        submitButton.click();

        // 6. (Optional) Wait for any success message or processing time
        Thread.sleep(2000);

        System.out.println("Institution created: " + institutionName);
    }
}
