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

            // 5. Now navigate to the page with the ArXiv-like search
            //    Based on your snippet, it might be:
            driver.get("http://localhost:5780/institution/My%20Institution/My%20ArhVix%20Project%20for%20filming1");

            // 6. Perform ArhVix search
            ArhVixSearchUtils.doSearch(driver, "machine learning", 10);
            System.out.println("1. ArhVix search completed!");
            Thread.sleep(5000);
            ArhVixSearchUtils.doSearch(driver, "stem cells", 5);
            System.out.println("2. ArhVix search completed!");
            Thread.sleep(5000);
            ArhVixSearchUtils.doSearch(driver, "science", 15);
            System.out.println("3. ArhVix search completed!");
            Thread.sleep(5000);
            ArhVixSearchUtils.doSearch(driver, "thunder", 40);
            System.out.println("4. ArhVix search completed!");
            Thread.sleep(5000);
            ArhVixSearchUtils.doSearch(driver, "storm", 3);
            System.out.println("5. ArhVix search completed!");
            Thread.sleep(5000);


        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            if (driver != null) {
                driver.quit();
            }
        }
    }
}
