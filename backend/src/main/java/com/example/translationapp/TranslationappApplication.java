package com.example.translationapp;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.translate.Translate;
import com.google.cloud.translate.TranslateOptions;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.FileInputStream;
import java.io.IOException;

@SpringBootApplication
public class TranslationappApplication {

    public static void main(String[] args) {
        SpringApplication.run(TranslationappApplication.class, args);

        try {
            // Load the service account key JSON file
            FileInputStream serviceAccount = new FileInputStream(System.getenv("GOOGLE_APPLICATION_CREDENTIALS"));

            // Authenticate and create a Translate service object
            GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);
            Translate translate = TranslateOptions.newBuilder().setCredentials(credentials).build().getService();


        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}