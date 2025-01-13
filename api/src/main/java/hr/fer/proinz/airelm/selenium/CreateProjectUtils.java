package hr.fer.proinz.airelm.selenium;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class CreateProjectUtils {

    public static void createOneProject(WebDriver driver, String projectName, String projectAttachment) throws Exception {
        // 1. Wait for and click the "New project" button
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        WebElement newProjectButton = wait.until(
                ExpectedConditions.elementToBeClickable(By.xpath("//button[text()='New project']"))
        );
        newProjectButton.click();

        // 2. Fill out the project form
        WebElement nameField = wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.id("name"))
        );
        nameField.clear();
        nameField.sendKeys(projectName);

        WebElement attachmentField = driver.findElement(By.id("attachment"));
        attachmentField.clear();
        attachmentField.sendKeys(projectAttachment);

        // 3. Submit the project
        WebElement submitProjectButton = wait.until(
                ExpectedConditions.elementToBeClickable(By.xpath("//button[text()='Submit project']"))
        );
        submitProjectButton.click();

        // 4. Optional: wait or verify success
        Thread.sleep(2000);

        System.out.println("Created project: " + projectName);
    }
}
