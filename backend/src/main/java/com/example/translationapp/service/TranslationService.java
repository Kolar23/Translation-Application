package com.example.translationapp.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.translate.Translate;
import com.google.cloud.translate.TranslateOptions;
import com.google.cloud.translate.Translation;

import io.github.cdimascio.dotenv.Dotenv;

import java.io.FileInputStream;
import java.io.IOException;

import org.springframework.stereotype.Service;

@Service
public class TranslationService {

    private final Translate translate;

    public TranslationService() throws IOException {
        // Load the .env file
        Dotenv dotenv = Dotenv.load();

        // Load the service account key JSON file
        FileInputStream serviceAccount = new FileInputStream(dotenv.get("GOOGLE_APPLICATION_CREDENTIALS"));

        // Authenticate and create a Translate service object
        GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);
        this.translate = TranslateOptions.newBuilder().setCredentials(credentials).build().getService();
    }

    public String translateText(String text, String targetLanguage) {
        Translation translation = translate.translate(text, Translate.TranslateOption.targetLanguage(targetLanguage));
        return translation.getTranslatedText();
    }
}