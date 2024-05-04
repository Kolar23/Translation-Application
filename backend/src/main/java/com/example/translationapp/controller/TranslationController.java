package com.example.translationapp.controller;

import com.example.translationapp.service.TranslationService;
import com.example.translationapp.controller.TranslateRequest;
import com.example.translationapp.entity.TranslationEntity;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.google.cloud.translate.Translation;

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
        String sourceLanguage = translationService.detectLanguage(text);
        String translatedText = translationService.translateText(text, targetLanguage);
        translationService.saveTranslation(text, translatedText, sourceLanguage, targetLanguage);
        return new ResponseEntity<>(translatedText, HttpStatus.OK);
    }

    @GetMapping("/history")
    public ResponseEntity<List<TranslationEntity>> getTranslationHistory() {
        List<TranslationEntity> history = translationService.getTranslationHistory();
        return new ResponseEntity<>(history, HttpStatus.OK);
    }
}