package hr.fer.proinz.airelm.selenium;

import org.openqa.selenium.WebDriver;

public class SearchArhVix {

    public static void main(String[] args) {
        WebDriver driver = null;

        try {
            // 1. Log in
            driver = LoginUtils.login();
            System.out.println("Logged in successfully!");

            // 2. Create institution
            CreateInstitutionUtils.createOneInstitution(driver,
                    "My Institution",
                    "http://www.example.com");
            System.out.println("Institution created!");

            // 3. Go to institution page
            driver.get("http://localhost:5780/institution/My%20Institution");

            // 4. Create project
            CreateProjectUtils.createOneProject(driver,
                    "My ArhVix Project",
                    "Sample attachment text...");
            System.out.println("Project created!");

            // 5. Now navigate to the page with the ArXiv-like search
            //    Based on your snippet, it might be:
            driver.get("http://localhost:5780/institution/My%20Institution/My%20ArhVix%20Project");

            // 6. Perform ArhVix search
            ArhVixSearchUtils.doSearch(driver, "machine learning", 10);
            System.out.println("ArhVix search completed!");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (driver != null) {
                driver.quit();
            }
        }
    }
}
