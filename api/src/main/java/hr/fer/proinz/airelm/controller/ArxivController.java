package hr.fer.proinz.airelm.controller;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/arxiv")
public class ArxivController {

    private final WebClient webClient;
    private final ArrayBlockingQueue<RequestTask> requestQueue;
    private volatile boolean isProcessing = false;

    public ArxivController() {
        this.webClient = WebClient.create("http://export.arxiv.org/api/query");
        this.requestQueue = new ArrayBlockingQueue<>(10); // Red čekanja s maksimalno 10 zahtjeva
        startQueueProcessor();
    }

    private void startQueueProcessor() {
        Thread queueProcessor = new Thread(() -> {
            while (true) {
                try {
                    // Uzmi zahtjev iz reda
                    RequestTask task = requestQueue.poll(3, TimeUnit.SECONDS);
                    if (task != null) {
                        isProcessing = true;
                        processRequest(task);
                        Thread.sleep(3000); // Pauza od 3 sekunde između zahtjeva
                        isProcessing = false;
                    }
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    e.printStackTrace();
                }
            }
        });
        queueProcessor.setDaemon(true);
        queueProcessor.start();
    }

    @GetMapping("/search")
    public Mono<List<Map<String, String>>> searchArxiv(
            @RequestParam String query,
            @RequestParam(defaultValue = "cs.AI") String category,
            @RequestParam(defaultValue = "5") int maxResults) {
        CompletableFuture<List<Map<String, String>>> future = new CompletableFuture<>();

        // Stvori zadatak i dodaj ga u red
        RequestTask task = new RequestTask(query, category, maxResults, future);
        try {
            requestQueue.put(task); // Stavlja zadatak u red čekanja
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            future.completeExceptionally(e);
        }

        return Mono.fromFuture(future);
    }

    private void processRequest(RequestTask task) {
        try {
            String response = webClient.get()
                    .uri(uriBuilder -> uriBuilder
                            .queryParam("search_query", "cat:" + task.category + "+AND+all:" + task.query)
                            .queryParam("start", "0")
                            .queryParam("max_results", task.maxResults)
                            .build())
                    .retrieve()
                    .bodyToMono(String.class)
                    .block(); // Blokira dok se odgovor ne dobije

            // Parsiraj rezultate i završi zadatak
            List<Map<String, String>> results = extractSummaries(response);
            task.future.complete(results);
        } catch (Exception e) {
            task.future.completeExceptionally(e);
        }
    }

    private List<Map<String, String>> extractSummaries(String response) {
        List<Map<String, String>> results = new ArrayList<>();
        try {
            Document document = Jsoup.parse(response, "", org.jsoup.parser.Parser.xmlParser());
            Elements entries = document.getElementsByTag("entry");
            for (Element entry : entries) {
                String title = entry.getElementsByTag("title").text();
                String summary = entry.getElementsByTag("summary").text();
                String link = entry.getElementsByTag("id").text();
                results.add(Map.of(
                        "title", title,
                        "summary", summary,
                        "link", link
                ));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return results;
    }

    // Klasa za pohranu zadataka
    static class RequestTask {
        String query;
        String category;
        int maxResults;
        CompletableFuture<List<Map<String, String>>> future;

        public RequestTask(String query, String category, int maxResults, CompletableFuture<List<Map<String, String>>> future) {
            this.query = query;
            this.category = category;
            this.maxResults = maxResults;
            this.future = future;
        }
    }
}
