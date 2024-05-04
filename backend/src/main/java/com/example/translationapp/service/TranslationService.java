package com.example.translationapp.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.translate.Translate;
import com.google.cloud.translate.TranslateOptions;
import com.google.cloud.translate.Translation;
import com.google.cloud.translate.Detection;
import com.example.translationapp.entity.TranslationEntity;
import com.example.translationapp.repository.TranslationRepository;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.stereotype.Service;

@Service
public class TranslationService {

    private final Translate translate;

    @Autowired
    private TranslationRepository translationRepository;

    public TranslationService() throws IOException {
        // Load the .env file
        Dotenv dotenv = Dotenv.load();

        // Load the service account key JSON file
        FileInputStream serviceAccount = new FileInputStream(dotenv.get("GOOGLE_APPLICATION_CREDENTIALS"));

        // Authenticate and create a Translate service object
        GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);
        this.translate = TranslateOptions.newBuilder().setCredentials(credentials).build().getService();
    }

    // Translate the text to the target language
    public String translateText(String text, String targetLanguage) {
        Translation translation = translate.translate(text, Translate.TranslateOption.targetLanguage(targetLanguage));
        return translation.getTranslatedText();
    }

    // Save the translation to the database
    public void saveTranslation(String originalText, String translatedText, String sourceLanguage, String targetLanguage) {
        TranslationEntity translation = new TranslationEntity(originalText, translatedText, sourceLanguage, targetLanguage);
        translationRepository.save(translation);
    }
    
    // Detect the language of the text
    public String detectLanguage(String text) {
        Detection detection = translate.detect(text);
        return detection.getLanguage();
    }
    
    // Get the translation history from the databases
    public List<TranslationEntity> getTranslationHistory() {
        Iterable<TranslationEntity> iterable = translationRepository.findAll();
        List<TranslationEntity> history = StreamSupport.stream(iterable.spliterator(), false)
                .collect(Collectors.toList());
        return history;
    }
}