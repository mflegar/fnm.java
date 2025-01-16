package hr.fer.proinz.airelm.selenium;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class ArhVixSearchUtils {

    /**
     * Perform a search on the ArXiv-like page.
     *
     * @param driver A logged-in, navigated WebDriver (already on the correct page).
     * @param keywords The text to enter into the "Enter keywords" field.
     * @param maxResults The number to put in the "number" input.
     * @throws Exception If anything goes wrong (timeouts, etc.)
     */
    public static void doSearch(WebDriver driver, String keywords, int maxResults) throws Exception {
        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        // 1. Locate the "Enter keywords" input by placeholder or other attribute
        //    Using the placeholder text to find the input:
        WebElement keywordsInput = wait.until(
                ExpectedConditions.visibilityOfElementLocated(By.xpath("//input[@placeholder='Enter keywords']"))
        );
        keywordsInput.clear();
        keywordsInput.sendKeys(keywords);

        // 2. (Optional) Locate the number input (type="number") and set max results
        //    If you want to skip changing it, comment out these lines
        WebElement numberInput = driver.findElement(By.xpath("//input[@type='number']"));
        numberInput.clear();
        numberInput.sendKeys(String.valueOf(maxResults));

        // 3. Locate the "Search" button by its text
        //    The HTML indicates a <button> with the visible text "Search"
        WebElement searchButton = wait.until(
                ExpectedConditions.elementToBeClickable(By.xpath("//button[text()='Search']"))
        );

        // 4. Click the "Search" button
        searchButton.click();

        // 5. (Optional) Wait or verify results
        Thread.sleep(2000); // or use a more robust explicit wait for some result element

        System.out.println("ArhVix search performed with keywords: " + keywords + " and maxResults: " + maxResults);
    }
}
