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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/arxiv")
public class ArxivController {

    private final WebClient webClient;

    public ArxivController() {
        this.webClient = WebClient.create("http://export.arxiv.org/api/query");
    }

    @GetMapping("/search")
    public Mono<List<Map<String, String>>> searchArxiv(
            @RequestParam String query,
            @RequestParam(defaultValue = "cs.AI") String category,
            @RequestParam(defaultValue = "5") int maxResults) {
        return webClient.get()
                .uri(uriBuilder -> uriBuilder
                        .queryParam("search_query", "cat:" + category + "+AND+all:" + query)
                        .queryParam("start", "0")
                        .queryParam("max_results", maxResults)
                        .build())
                .retrieve()
                .bodyToMono(String.class)
                .map(this::extractSummaries);
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
}
