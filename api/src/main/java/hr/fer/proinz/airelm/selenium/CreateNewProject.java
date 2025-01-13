package hr.fer.proinz.airelm.selenium;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class CreateNewProject {
    public static void main(String[] args) {
        WebDriver driver = null;
        try {
            // 1. Log in
            driver = LoginUtils.login();

            // 2. Create one institution (example)
            CreateInstitutionUtils.createOneInstitution(driver,
                    "My Institution Testovi",
                    "http://www.example.com");

            System.out.println("Done creating institution!");

            // 3. Navigate to the institution page
            driver.get("http://localhost:5780/institution/My%20Institution%20Testovi");

            // 4. Prepare project data
            String[][] projects = {
                    {"Project 1", "Attachment for project 6..."},
                    {"Project 2", "Attachment for project 7..."},
                    {"Project 3", "Attachment for project 8..."},
                    {"Project 4", "Attachment for project 9..."},
                    {"Project 5", "Attachment for project 10..."}
            };

            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

            for (int i = 0; i < projects.length; i++) {
                // 5. Click "New project"
                WebElement newProjectButton = wait.until(
                        ExpectedConditions.elementToBeClickable(By.xpath("//button[text()='New project']"))
                );
                newProjectButton.click();

                // 6. Fill in the form
                String projectName = projects[i][0];
                String projectAttachment = projects[i][1];

                WebElement nameField = wait.until(
                        ExpectedConditions.visibilityOfElementLocated(By.id("name"))
                );
                nameField.clear();
                nameField.sendKeys(projectName);

                WebElement attachmentField = driver.findElement(By.id("attachment"));
                attachmentField.clear();
                attachmentField.sendKeys(projectAttachment);

                // 7. Submit the project
                WebElement submitProjectButton = wait.until(
                        ExpectedConditions.elementToBeClickable(By.xpath("//button[text()='Submit project']"))
                );
                submitProjectButton.click();

                // (Optional) Wait a bit or verify success
                Thread.sleep(2000);

                System.out.println("Created project: " + projectName);

                // 8. Navigate back to the institution page (so you can click "New project" again)
                //    If your app auto-redirects to the institution page after each submission,
                //    you may skip this. Otherwise:
                driver.get("http://localhost:5780/institution/My%20Institution%20Testovi");
                Thread.sleep(1000);
            }

            System.out.println("All 5 projects created successfully!");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (driver != null) {
                driver.quit();
            }
        }
    }
}
