package hr.fer.proinz.airelm.selenium;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class expenseTest {
    public static void main(String[] args) {
        WebDriver driver = null;
        try {
            // 1. Log in
            driver = LoginUtils.login();
            System.out.println("Logged in successfully!");

            // 2. Create institution
            CreateInstitutionUtils.createOneInstitution(driver,
                    "Mojaaaa Institution1",
                    "http://www.example.com");
            System.out.println("Institution created!");

            // 3. Go to institution page
            driver.get("http://localhost:5780/institution/Mojaaaa%20Institution1");

            // 4. Create project
            CreateProjectUtils.createOneProject(driver,
                    "My ArhVix Project for Filming1",
                    "Sample attachment text...");
            System.out.println("Project created!");

            // 5. Navigate to the page that has the "Add expense" button
            //    (Update this URL if needed to match your project page)
            driver.get("http://localhost:5780/institution/Mojaaaa%20Institution1/My%20ArhVix%20Project%20for%20Filming");

            // 6. Wait for the page to load and the "Add expense" button to be clickable
            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
            By addExpenseBtnLocator = By.xpath("//button[text()='Add expense']");
            WebElement addExpenseBtn = wait.until(
                    ExpectedConditions.elementToBeClickable(addExpenseBtnLocator)
            );

            // 7. Create 5 expenses in a loop
            for (int i = 1; i <= 5; i++) {

                // Click the "Add expense" button
                addExpenseBtn.click();

                // Wait for expense form fields to appear
                // (These locators are EXAMPLES — update them to match your actual form’s IDs or other attributes)
                WebElement expenseNameField = wait.until(
                        ExpectedConditions.visibilityOfElementLocated(By.id("expenseName"))
                );
                WebElement expenseAmountField = driver.findElement(By.id("expenseAmount"));
                WebElement expenseDescriptionField = driver.findElement(By.id("expenseDescription"));

                // Fill out expense details
                expenseNameField.clear();
                expenseNameField.sendKeys("Sample Expense " + i);

                expenseAmountField.clear();
                expenseAmountField.sendKeys("100" + i); // e.g., 1001, 1002, etc.

                expenseDescriptionField.clear();
                expenseDescriptionField.sendKeys("Description for expense #" + i);

                // Click the "Create" or "Submit" button
                // (Again, adapt the locator to your actual button)
                WebElement submitExpenseBtn = wait.until(
                        ExpectedConditions.elementToBeClickable(By.xpath("//button[text()='Create expense']"))
                );
                submitExpenseBtn.click();

                // (Optional) Wait for the success message or refresh
                // Just adding a short sleep to observe
                Thread.sleep(2000);

                System.out.println("Expense " + i + " created!");
            }

            System.out.println("All 5 expenses created successfully!");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (driver != null) {
                driver.quit();
            }
        }
    }
}
