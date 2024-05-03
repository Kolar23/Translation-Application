package com.example.translationapp.controller;

import com.example.translationapp.service.TranslationService;
import com.example.translationapp.controller.TranslateRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class TranslationController {

    private final TranslationService translationService;

    public TranslationController(TranslationService translationService) {
        this.translationService = translationService;
    }

    @PostMapping("/translate")
    public ResponseEntity<String> translateText(@RequestBody TranslateRequest request) {
        String text = request.getText();
        String targetLanguage = request.getTargetLanguage();
        if (text == null || text.isEmpty() || targetLanguage == null || targetLanguage.isEmpty()) {
            return new ResponseEntity<>("Both 'text' and 'targetLanguage' parameters are required.", HttpStatus.BAD_REQUEST);
        }
        String translatedText = translationService.translateText(text, targetLanguage);
        return new ResponseEntity<>(translatedText, HttpStatus.OK);
    }
}