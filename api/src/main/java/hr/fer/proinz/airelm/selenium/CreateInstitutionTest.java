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

        // Five institutions in a 2D array: { [name, link], ... }
        String[][] institutions = {
                {"Moj novi Institution #1", "http://some-url-1.com"},
                {"Moj novi Institution #2", "http://some-url-2.com"},
                {"Moj novi Institution #3", "http://some-url-3.com"},
                {"Moj novi Institution #4", "http://some-url-4.com"},
                {"Moj novi Institution #5", "http://some-url-5.com"}
        };

        try {
            // 1. Login (reuse your existing LoginUtils code)
            driver = LoginUtils.login();
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

            // 2. Loop over each institution
            for (int i = 0; i < institutions.length; i++) {
                String instName = institutions[i][0];
                String instLink = institutions[i][1];

                // 3. Navigate to the "Create new institution" page
                //    If you need to click a button from the dashboard, do that
                //    Here, we directly navigate to the form URL:
                driver.get("http://localhost:5780/institution/new");

                // 4. Fill out the Institution Name
                WebElement nameField = wait.until(
                        ExpectedConditions.visibilityOfElementLocated(By.id("institutionName"))
                );
                nameField.clear();
                nameField.sendKeys(instName);

                // 5. Fill out the Institution Link
                WebElement linkField = driver.findElement(By.id("link"));
                linkField.clear();
                linkField.sendKeys(instLink);

                // 6. Click the "Create new institution" button by text
                By submitBtnLocator = By.xpath("//button[text()='Create new institution']");
                WebElement submitButton = wait.until(
                        ExpectedConditions.elementToBeClickable(submitBtnLocator)
                );
                submitButton.click();

                // 7. Optional: Wait or verify success
                Thread.sleep(2000);

                System.out.println("Created institution: " + instName + " (" + instLink + ")");
            }

            System.out.println("All institutions have been created successfully!");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // 8. Quit the browser
            if (driver != null) {
                driver.quit();
            }
        }
    }
}
